import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Cache for in-memory chunks and their embeddings
let localChunksCached: { content: string; embedding?: number[]; client_id?: string }[] = [
  // Kyro AI Standard Context
  {
    content: "Kyro AI is a premium customer support platform that allows businesses to deploy AI chat support agents trained in minutes on their own business data (including FAQs, documents, product sheets, PDFs, and website URLs). It provides 24/7 instant replies in 50+ languages, SOC 2 compliance, custom branding, and smart human handoff escalation.",
    client_id: "00000000-0000-0000-0000-000000000000",
  },
  {
    content: "Kyro AI Features include: 1. Train on your data (PDFs, FAQs, web URLs); 2. Real-time streaming responses that look like a human typing; 3. Multilingual native support for 50+ languages; 4. Omnichannel deployment (web widget, WhatsApp, Instagram, Slack, Shopify, WordPress); 5. Enterprise-grade security (AES-256, TLS, SOC 2 ready); 6. Conversation analytics (resolution rate, CSAT, gaps); 7. Smart human handoff; 8. Qualify leads inline and sync to CRMs; 9. Custom brand personas.",
    client_id: "00000000-0000-0000-0000-000000000000",
  },
  {
    content: "Kyro AI Pricing Plans: 1. Starter Plan: ₹999/mo (or ₹9,990/year) includes 1,000 conversations/mo, 1 trained agent, website widget, email support, basic analytics, 10 data sources. 2. Growth Plan: ₹4,999/mo (or ₹49,990/year) includes 10,000 conversations/mo, 3 trained agents, all integrations, priority support, advanced analytics, unlimited data sources, lead capture, human handoff, custom branding. 3. Enterprise Plan: Custom pricing, unlimited conversations and agents, dedicated success manager, SLA & 24/7 priority support, custom model fine-tuning.",
    client_id: "00000000-0000-0000-0000-000000000000",
  },
  {
    content: "Every Kyro AI pricing plan begins with a 14-day free trial. No credit card is required to sign up. You can switch, upgrade, or downgrade plans at any time directly from the account dashboard.",
    client_id: "00000000-0000-0000-0000-000000000000",
  },
  {
    content: "Kyro AI Integrations: Connects with Shopify, WooCommerce, WordPress, Webflow, WhatsApp, Slack, Instagram, Facebook Messenger, Telegram, Notion, Google Sheets, HubSpot, Salesforce, Stripe, Zendesk, Freshdesk, Calendly, and Zapier. It also offers a full developer REST API and customizable Webhooks.",
    client_id: "00000000-0000-0000-0000-000000000000",
  },
  {
    content: "Kyro AI E-commerce Use Case: Perfect for product recommendations,Returns & refunds handling, size/specification questions, discount eligibility, and real-time shipping/order status tracking with active Shopify or Amazon Seller integrations.",
    client_id: "00000000-0000-0000-0000-000000000000",
  },
  {
    content: "Kyro AI SaaS & Software Use Case: Instantly helps users with onboarding and product setup, feature walkthroughs, billing, plan subscriptions, bug triage, and API/developer documentation Q&A.",
    client_id: "00000000-0000-0000-0000-000000000000",
  },
  {
    content: "Kyro AI Security: Built with enterprise-grade standards including AES-256 encryption at rest, TLS in transit, and SOC 2 ready infrastructure. Client data is private, isolated, and is never used to train external or public models.",
    client_id: "00000000-0000-0000-0000-000000000000",
  },
  {
    content: "A Kyro conversation is defined as a unique chat session with a customer. Multiple messages exchanged back and forth in one single session count as exactly one conversation, which helps keep pricing predictable and simple.",
    client_id: "00000000-0000-0000-0000-000000000000",
  },

  // Luxe Attire Clothing Store Context (E-commerce client simulation)
  {
    content: "Luxe Attire premium Wedding and Formal Wear Collection includes three main designer shirts: 1. Royal Satin Silk Shirt (₹3,499) - Ultra-smooth premium finish, structured spreads, available in royal white and midnight black, perfect for high-society wedding receptions and tuxedos. 2. Egyptian Giza Cotton Shirt (₹2,999) - Breathable double-ply weave, premium soft texture, matches beautifully with classic bandhgala jackets and wedding blazers. 3. Classic French Cuff Tuxedo Shirt (₹3,999) - Exquisite pleated front bib with double cuffs for cufflinks, the absolute premier choice for grooms.",
    client_id: "clothing-store-client-id",
  },
  {
    content: "Luxe Attire wedding matching recommendation: For hot summer/day weddings, select the Premium Breathable Linen Shirt (₹2,499) in soft beige, ivory, or pastel mint. For elegant evening weddings or formal receptions, the Royal Satin Silk Shirt in midnight black or pristine white paired with a velvet blazer provides a gorgeous, high-end sheen.",
    client_id: "clothing-store-client-id",
  },
  {
    content: "Luxe Attire premium accessories for grooms and guests: Premium Handcrafted Silk Bowties (₹999), Mother-of-Pearl Cufflinks (₹1,499), and Tailored Woolen Waistcoats (₹3,999) to add unmatched sophistication to your wedding suit.",
    client_id: "clothing-store-client-id",
  },
  {
    content: "Luxe Attire shirts sizing, fits, and custom alterations: Offered in standard Slim Fit (tapered waist, modern silhouette) and Classic Regular Fit (traditional style, roomy chest cut). Size chart ranges from S (38), M (40), L (42), XL (44) to XXL (46). Luxe Attire provides free bespoke shoulder and sleeve alterations on all wedding collection orders.",
    client_id: "clothing-store-client-id",
  },
  {
    content: "Luxe Attire shipping, order tracking, and returns: All domestic orders ship next-day with express delivery via Delhivery or BlueDart. Easy 30-day return or exchange policy on all unworn items with tags. Order status can be tracked live in chat using your order ID (e.g. #10243).",
    client_id: "clothing-store-client-id",
  },
];

/**
 * Scrapes and cleans visible text from any raw external webpage HTML
 */
export async function scrapeExternalWebsite(url: string): Promise<string[]> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    if (!response.ok) return [];
    
    const html = await response.text();
    
    // Extract main text content, ignoring scripts/styles/tags
    const cleanedText = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!cleanedText) return [];

    // Simple chunking (e.g., divide clean text into 500 character logical blocks)
    const chunks: string[] = [];
    const chunkSize = 600;
    for (let i = 0; i < cleanedText.length; i += chunkSize) {
      chunks.push(cleanedText.substring(i, i + chunkSize));
    }
    return chunks.slice(0, 10); // Limit to top 10 chunks to prevent API flooding
  } catch (err) {
    console.error("Dynamic web scraper failed for URL:", url, err);
    return [];
  }
}

/**
 * Calculates cosine similarity between two vectors
 */
function cosineSimilarity(vecA: number[], vecB: number[]): number {
  let dotProduct = 0.0;
  let normA = 0.0;
  let normB = 0.0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Generates vector embeddings for a given text using NVIDIA NIM Embeddings API
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const nvidiaApiKey = process.env.NVIDIA_API_KEY;
  if (!nvidiaApiKey) {
    throw new Error("Missing NVIDIA_API_KEY. Cannot generate embeddings.");
  }

  try {
    const response = await fetch("https://integrate.api.nvidia.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${nvidiaApiKey}`,
      },
      body: JSON.stringify({
        input: [text],
        model: "nvidia/embeddings-nv-embed-qa-4",
        encoding_format: "float",
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      throw new Error(`NVIDIA API error: ${response.status} - ${errBody}`);
    }

    const result = await response.json();
    if (!result.data || result.data.length === 0) {
      throw new Error("NVIDIA API returned empty embeddings data.");
    }

    return result.data[0].embedding;
  } catch (err) {
    console.error("Error generating embedding:", err);
    throw err;
  }
}

/**
 * In-memory fallback semantic search using cosine similarity
 */
async function localSemanticSearch(queryEmbedding: number[], clientId: string, limit: number) {
  try {
    // Generate embeddings for cached local chunks if they aren't generated yet
    for (const chunk of localChunksCached) {
      if (!chunk.embedding) {
        try {
          chunk.embedding = await generateEmbedding(chunk.content);
        } catch (e) {
          console.error("Failed to generate local chunk embedding:", e);
        }
      }
    }

    const matches = localChunksCached
      .filter((chunk) => chunk.embedding !== undefined && chunk.client_id === clientId)
      .map((chunk) => ({
        content: chunk.content,
        similarity: cosineSimilarity(queryEmbedding, chunk.embedding!),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);

    return matches;
  } catch (e) {
    console.error("Local semantic search failed:", e);
    return [];
  }
}

/**
 * Queries the database using semantic cosine distance to retrieve context relevant to user query
 */
export async function semanticSearch(queryText: string, clientId: string, limit = 4) {
  try {
    const embedding = await generateEmbedding(queryText);

    // Try calling Supabase RPC match_document_chunks first
    try {
      const { data, error } = await supabaseAdmin.rpc("match_document_chunks", {
        query_embedding: embedding,
        match_threshold: 0.3,
        match_count: limit,
        filter_client_id: clientId,
      });

      if (!error && data && data.length > 0) {
        return data;
      }
      
      if (error) {
        console.warn("Supabase RPC failed or table missing. Falling back to robust in-memory RAG.");
      }
    } catch (dbErr) {
      console.warn("Database unavailable. Falling back to robust in-memory RAG:", dbErr);
    }

    // High performance in-memory semantic search fallback
    return await localSemanticSearch(embedding, clientId, limit);
  } catch (err) {
    console.error("Semantic search failed, returning empty matches:", err);
    return [];
  }
}

/**
 * Ingests a new document chunk by generating its vector embedding and storing it
 */
export async function ingestDocumentChunk(clientId: string, content: string) {
  try {
    const embedding = await generateEmbedding(content);

    // Update local cache
    localChunksCached.push({ content, embedding, client_id: clientId });

    // Attempt database ingestion
    try {
      const { data, error } = await supabaseAdmin.from("document_chunks" as any).insert({
        client_id: clientId,
        content,
        embedding,
      });

      if (!error) {
        return { success: true, data };
      }
      console.warn("Could not insert chunk in database table. Successfully updated in-memory storage.");
    } catch (dbErr) {
      console.warn("Database insert failed. Saved chunk in-memory:", dbErr);
    }

    return { success: true, message: "Saved successfully to local memory store." };
  } catch (err) {
    console.error("Failed to ingest document chunk:", err);
    return { success: false, error: err };
  }
}

/**
 * Clears all cached in-memory chunks for a specific client ID
 */
export function clearClientChunks(clientId: string) {
  localChunksCached = localChunksCached.filter((chunk) => chunk.client_id !== clientId);
}

