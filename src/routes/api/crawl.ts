import { createFileRoute } from "@tanstack/react-router";
import { scrapeExternalWebsite, ingestDocumentChunk, clearClientChunks } from "@/lib/rag.server";

export const Route = createFileRoute("/api/crawl")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { url, clientId } = (await request.json()) as { url?: string; clientId?: string };
          
          if (!url || !clientId) {
            return new Response("Missing url or clientId", { status: 400 });
          }

          // Clear old chunks for this client to avoid overlap
          clearClientChunks(clientId);

          // Scrape site
          const chunks = await scrapeExternalWebsite(url);
          if (!chunks || chunks.length === 0) {
            return new Response(JSON.stringify({ 
              success: false, 
              error: "Failed to scrape the website. It may have blocked crawler requests, or contains no readable textual content." 
            }), {
              status: 200,
              headers: { "Content-Type": "application/json" }
            });
          }

          // Ingest chunks in-memory
          let ingestedCount = 0;
          for (const chunk of chunks) {
            const res = await ingestDocumentChunk(clientId, chunk);
            if (res.success) {
              ingestedCount++;
            }
          }

          return new Response(JSON.stringify({ success: true, count: ingestedCount, chunks }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } catch (err: any) {
          console.error("Crawl error:", err);
          return new Response(JSON.stringify({ success: false, error: err.message || "Failed to process crawl request." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }
      }
    }
  }
});
