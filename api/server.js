// Vercel serverless function wrapper for TanStack Start SSR
// This file wraps the built server (dist/server/server.js) for Vercel's Node.js runtime

import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { Readable } from "node:stream";

// Path to the built server
const DIST_SERVER = resolve(process.cwd(), "dist/server/server.js");
const DIST_CLIENT = resolve(process.cwd(), "dist/client");

let serverHandler = null;

async function getHandler() {
  if (!serverHandler) {
    try {
      const mod = await import(DIST_SERVER);
      serverHandler = mod.default;
    } catch (e) {
      console.error("Failed to load server:", e);
      throw e;
    }
  }
  return serverHandler;
}

function buildRequestFromVercel(req) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const url = `${protocol}://${host}${req.url}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        for (const v of value) headers.append(key, v);
      } else {
        headers.set(key, value);
      }
    }
  }

  const method = req.method || "GET";
  const hasBody = method !== "GET" && method !== "HEAD";

  if (hasBody) {
    return new Request(url, {
      method,
      headers,
      body: Readable.toWeb(req),
      duplex: "half",
    });
  }

  return new Request(url, { method, headers });
}

export default async function handler(req, res) {
  try {
    const server = await getHandler();
    const request = buildRequestFromVercel(req);
    const response = await server.fetch(request, {}, {});

    res.statusCode = response.status;

    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }

    res.end();
  } catch (err) {
    console.error("Vercel handler error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Server Error</h1><p>${err.message}</p>`);
  }
}
