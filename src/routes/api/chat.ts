import { createFileRoute } from "@tanstack/react-router";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { convertToModelMessages, streamText, type UIMessage, tool } from "ai";
import { semanticSearch } from "@/lib/rag.server";
import { z } from "zod";
import "@tanstack/react-start";

const SYSTEM_PROMPT = `You are Kyro, the friendly AI customer support assistant for Kyro AI itself. Kyro AI is a premium platform that lets businesses deploy AI chat support bots trained on their own data (FAQs, docs, product info, websites, etc.).

Your job:
- Demo what a great Kyro-powered support bot feels like to website visitors.
- Answer questions about Kyro AI: features, pricing, integrations, use cases, setup.
- Be warm, concise, and confident. Use short paragraphs and the occasional bullet list.
- If asked something off-topic, gently steer back to how Kyro could help their business.
- When relevant, suggest the visitor "Book a Demo" or visit Pricing.

Key facts about Kyro AI:
- Train your bot in minutes by uploading docs, FAQs, or pointing it at your website.
- 24/7 instant responses in 50+ languages.
- Integrations: WhatsApp, Slack, Instagram, Shopify, WordPress, Zapier, custom website widget, REST API.
- Use cases: e-commerce support, SaaS onboarding, healthcare appointment FAQs, real estate inquiries, education student support.
- Pricing: Starter ₹999/mo (1k chats), Growth ₹4,999/mo (10k chats + integrations), Enterprise (custom).
- Built on cutting-edge LLMs with retrieval-augmented generation for accurate, hallucination-resistant answers.
- Full conversation analytics dashboard, lead capture, human handoff.

Never make up features that don't exist. If unsure, suggest they contact the team.`;

const LUXE_SYSTEM_PROMPT = `You are Kyro, a highly sophisticated and elegant AI sales and support concierge for Luxe Attire — a premier luxury boutique specializing in premium designer wedding and formal wear collections.

Your personality:
- You are classy, polite, premium, and extremely helpful.
- You speak with an upscale and elite tone, matching a high-society luxury boutique.
- Answer questions about Luxe Attire's formal shirts, fits, tailoring, alterations, sizing, pricing, accessories, and shipping policies.
- Keep answers structured with gorgeous bullet points or clean spacing.
- Always quote pricing (e.g. ₹3,499, ₹2,999, ₹3,999) exactly when discussing products.
- If asked, warmly guide the customer to choose the best wedding shirt based on details like summer/evening styling, fabrics (Royal Satin Silk vs Egyptian Giza Cotton vs Breathable Linen), and matching accessories.

Luxe Attire Facts & Guidelines:
- Royal Satin Silk Shirt (₹3,499) - Available in royal white and midnight black. Perfect for evening weddings/formal receptions. Pairs beautifully with a velvet blazer.
- Egyptian Giza Cotton Shirt (₹2,999) - Breathable double-ply soft texture, matches beautifully with classic bandhgala jackets and wedding blazers.
- Classic French Cuff Tuxedo Shirt (₹3,999) - Pleated front bib with double cuffs for cufflinks, the absolute premier choice for grooms.
- Premium Breathable Linen Shirt (₹2,499) - In beige, ivory, or pastel mint. Great for summer or daytime weddings.
- Accessories: Silk Bowties (₹999), Mother-of-Pearl Cufflinks (₹1,499), Tailored Waistcoats (₹3,999).
- Size Chart: Ranges from S (38) to XXL (46) with standard Slim and Classic regular fits.
- Bespoke shoulder and sleeve alterations are provided completely free on all wedding orders.
- Order tracking: Shopify tracking tool is fully integrated. If an order ID is given (like #10243), use the tracking tool to lookup status.
- Domestic orders are delivered next-day express. 30-day tag-attached returns.`;

const CUSTOM_SYSTEM_PROMPT = `You are Kyro, a friendly, intelligent customer support AI assistant integrated on the client's website. 

Your job:
- Be a flawless assistant for this specific business and website.
- Answer any customer questions concisely and accurately using *only* the context scraped and retrieved from this website's pages.
- If the retrieved context does not contain the answer, politely say that you cannot find that specific detail on the website, and suggest they contact the team or try rephrasing.
- Do not make up facts or mention Kyro AI unless asked about your technology platform.`;

type ChatRequestBody = { 
  messages?: unknown;
  activeBot?: "kyro" | "luxe" | "custom";
};

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const body = (await request.json()) as ChatRequestBody;
        console.log("API/CHAT RECEIVED BODY:", JSON.stringify(body, null, 2));
        const { messages, activeBot } = body;
        if (!Array.isArray(messages) || messages.length === 0) {
          // No user messages yet – return a friendly greeting
          const greeting = { role: "assistant" as const, content: "Hello! I’m Kyro, your AI support assistant. How can I help you today?" };
          return new Response(JSON.stringify([greeting]), { status: 200, headers: { "Content-Type": "application/json" } });
        }

        const nvidiaApiKey = process.env.NVIDIA_API_KEY;

        let model;

        if (nvidiaApiKey) {
          const gateway = createOpenAICompatible({
            name: "nvidia",
            baseURL: "https://integrate.api.nvidia.com/v1",
            headers: {
              Authorization: `Bearer ${nvidiaApiKey}`,
            },
          });
          // Using a standard, highly performant Llama 3.1 70B Instruct NIM
          model = gateway("meta/llama-3.1-70b-instruct");
        } else {
          // No NVIDIA API key configured – return a simple mock answer for demo purposes
          const mockMessage = {
            role: "assistant" as const,
            content: "Hello! I’m Kyro, your AI support assistant. (Demo Mode: Please set NVIDIA_API_KEY environment variable to enable live AI responses)."
          };
          return new Response(JSON.stringify([mockMessage]), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }

        let clientId = "00000000-0000-0000-0000-000000000000"; // default Kyro demo ID
        let activeSystemPrompt = SYSTEM_PROMPT;

        if (activeBot === "luxe") {
          clientId = "clothing-store-client-id";
          activeSystemPrompt = LUXE_SYSTEM_PROMPT;
        } else if (activeBot === "custom") {
          clientId = "custom-client-id";
          activeSystemPrompt = CUSTOM_SYSTEM_PROMPT;
        }

        // Retrieve vector database matches for RAG if using NVIDIA
        let customContext = "";
        if (nvidiaApiKey && messages.length > 0) {
          const lastMessage = messages[messages.length - 1] as UIMessage;
          if (lastMessage && lastMessage.role === "user") {
            try {
              const textContent = typeof lastMessage.content === "string"
                ? lastMessage.content
                : lastMessage.parts?.map((p: any) => p.type === "text" ? p.text : "").join("") || "";
              
              if (textContent.trim()) {
                const matches = await semanticSearch(textContent, clientId, 3);
                if (matches && matches.length > 0) {
                  customContext = "\n\n[CRITICAL CONTEXT FROM KNOWLEDGE BASE]\n" +
                    matches.map((m: any) => `- ${m.content}`).join("\n");
                }
              }
            } catch (err) {
              console.error("Vector search retrieval failed:", err);
            }
          }
        }

        try {
          const result = streamText({
            model,
            system: activeSystemPrompt + customContext + "\n\nIf the user asks to track a Shopify or Amazon order, you must call the corresponding tracking tool to retrieve real-time status details before answering.",
            messages: await convertToModelMessages(messages as UIMessage[]),
            tools: {
              trackShopifyOrder: tool({
                description: "Tracks the shipping status of a Shopify order using the Order ID.",
                parameters: z.object({
                  orderId: z.string().describe("The Shopify order ID, e.g. #10243"),
                }),
                execute: async ({ orderId }) => {
                  return {
                    orderId,
                    platform: "Shopify Store Integration",
                    status: "Shipped",
                    carrier: "Delhivery Express",
                    trackingId: "DEL99283011IND",
                    estimatedDelivery: "Friday, May 24 (In 2 days)",
                    lastLocation: "Delhi Gateway Sort Facility",
                    notes: "Package left the hub and is in transit. (Live simulated API response)",
                  };
                },
              }),
              trackAmazonOrder: tool({
                description: "Tracks the shipping status of an Amazon seller order using the 17-digit Amazon Order ID.",
                parameters: z.object({
                  amazonOrderId: z.string().describe("The standard 17-digit Amazon Order ID format (e.g. 403-1234567-1234567)"),
                }),
                execute: async ({ amazonOrderId }) => {
                  return {
                    amazonOrderId,
                    platform: "Amazon Seller Central (FBA)",
                    status: "In Transit",
                    carrier: "Amazon Logistics Express",
                    trackingId: "AMZN-IND-9840219",
                    estimatedDelivery: "Tomorrow by 8:00 PM",
                    lastLocation: "Mumbai FBA Fulfillment Center",
                    notes: "Dispatched from warehouse, out for delivery soon. (Live simulated API response)",
                  };
                },
              }),
            },
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
          });
        } catch (err) {
          console.error("Chat error:", err);
          // Return a friendly fallback for any error
          const fallback = {
            role: "assistant" as const,
            content: "I’m sorry, I couldn’t generate a response right now. Please try again later."
          };
          return new Response(JSON.stringify([fallback]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
