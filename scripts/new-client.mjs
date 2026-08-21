import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import {
  ROOT, parseArgs, requireSlug, clientDir, copyDir, readJson, writeJson, safeProjectName,
} from "./lib.mjs";

try {
  const args = parseArgs();
  const slug = requireSlug(args);
  const target = clientDir(slug);
  if (fs.existsSync(target)) throw new Error(`Client '${slug}' sudah ada.`);

  copyDir(path.join(ROOT, "starter"), target);

  const briefFile = path.join(target, "context", "client-brief.json");
  const brief = readJson(briefFile);
  brief.project.project_id = crypto.randomUUID();
  brief.project.client_name = String(args.client || "").trim();
  brief.project.brand_name = String(args.brand || args.client || "").trim();
  brief.project.page_slug = slug;
  brief.project.status = "INTAKE";
  brief.project.owner = String(args.owner || "").trim();
  brief.domain.provider_subdomain = `${safeProjectName(slug)}.pages.dev`;
  writeJson(briefFile, brief);

  const configFile = path.join(target, "project.config.json");
  const config = readJson(configFile);
  config.client_slug = slug;
  config.cloudflare.project_name = safeProjectName(slug);
  writeJson(configFile, config);

  const statusFile = path.join(target, "context", "status.json");
  const status = readJson(statusFile);
  status.status = "INTAKE";
  status.updated_at = new Date().toISOString();
  status.history.push({ status: "INTAKE", at: status.updated_at, note: "Workspace klien dibuat." });
  writeJson(statusFile, status);

  console.log(`✓ Client dibuat: clients/${slug}`);
  console.log(`✓ Cloudflare project name: ${config.cloudflare.project_name}`);
  console.log(`Berikutnya: isi context/client-brief.json lalu jalankan npm run validate -- --slug=${slug}`);
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}
