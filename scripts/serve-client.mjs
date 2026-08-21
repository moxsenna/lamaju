import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { ROOT, parseArgs, requireSlug, readConfig } from "./lib.mjs";
import "./build-client.mjs";

const mime = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".avif": "image/avif", ".ico": "image/x-icon",
};

try {
  const args = parseArgs();
  const slug = requireSlug(args);
  const config = readConfig(slug);
  const root = path.join(ROOT, config.output_dir || "dist", slug);
  const port = Number(args.port || 4173);
  const server = http.createServer((req, res) => {
    const requested = decodeURIComponent((req.url || "/").split("?")[0]);
    const relative = requested === "/" ? "index.html" : requested.replace(/^\//, "");
    let file = path.resolve(root, relative);
    if (!file.startsWith(path.resolve(root))) {
      res.writeHead(403); res.end("Forbidden"); return;
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
    if (!fs.existsSync(file)) {
      res.writeHead(404); res.end("Not found"); return;
    }
    res.setHeader("Content-Type", mime[path.extname(file).toLowerCase()] || "application/octet-stream");
    fs.createReadStream(file).pipe(res);
  });
  server.listen(port, "127.0.0.1", () => console.log(`Preview: http://127.0.0.1:${port}`));
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}
