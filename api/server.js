// Vercel serverless function wrapper for TanStack Start SSR
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { Readable } from "node:stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// dist/server is one level up from api/
const DIST_SERVER = resolve(__dirname, "../dist/server/server.js");

let serverHandler = null;

async function getHandler() {
  if (!serverHandler) {
    const mod = await import(DIST_SERVER);
    serverHandler = mod.default;
  }
  return serverHandler;
}

function buildRequest(req) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === undefined) continue;
    Array.isArray(value)
      ? value.forEach((v) => headers.append(key, v))
      : headers.set(key, value);
  }

  const method = req.method || "GET";
  const hasBody = method !== "GET" && method !== "HEAD";

  return new Request(url, {
    method,
    headers,
    ...(hasBody ? { body: Readable.toWeb(req), duplex: "half" } : {}),
  });
}

export default async function handler(req, res) {
  try {
    const server = await getHandler();
    const request = buildRequest(req);

    const response = await server.fetch(request, process.env, {});

    res.statusCode = response.status;

    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
    }

    res.end();
  } catch (err) {
    console.error("Vercel handler error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(`<!doctype html><html><body><h1>Server Error</h1><pre>${err.message}</pre></body></html>`);
  }
}
