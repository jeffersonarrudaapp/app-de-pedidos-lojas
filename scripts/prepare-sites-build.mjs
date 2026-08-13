import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const worker = `const HTML_FALLBACK = "/index.html";

function acceptsHtml(request) {
  return (request.headers.get("accept") || "").includes("text/html");
}

function requestForPath(request, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  url.search = "";
  return new Request(url, request);
}

const worker = {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || request.method !== "GET" || !acceptsHtml(request)) {
      return response;
    }

    return env.ASSETS.fetch(requestForPath(request, HTML_FALLBACK));
  },
};

export default worker;
`;

const serverDir = resolve("dist", "server");
await mkdir(serverDir, { recursive: true });
await writeFile(resolve(serverDir, "index.js"), worker);
