import { spawnSync } from "node:child_process";
import { parseArgs, requireSlug, ensureClient, readConfig } from "./lib.mjs";

try {
  const args = parseArgs();
  const slug = requireSlug(args);
  ensureClient(slug);
  const config = readConfig(slug);
  const project = config.cloudflare?.project_name;
  const branch = config.cloudflare?.production_branch || "main";
  if (!project) throw new Error("cloudflare.project_name kosong.");
  console.log(`Membuat Pages project '${project}'...`);
  const result = spawnSync("npx", ["wrangler", "pages", "project", "create", project, `--production-branch=${branch}`], { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) throw new Error("Provision gagal. Pastikan Wrangler terautentikasi dan project belum ada.");
  console.log("✓ Pages project tersedia.");
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}
