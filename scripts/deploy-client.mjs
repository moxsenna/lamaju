import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ROOT, parseArgs, requireSlug, ensureClient, readConfig, readJson, writeJson, contextDir } from "./lib.mjs";

function run(command, argv) {
  const result = spawnSync(command, argv, { stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) throw new Error(`${command} ${argv.join(" ")} gagal.`);
}

try {
  const args = parseArgs();
  const slug = requireSlug(args);
  ensureClient(slug);
  const config = readConfig(slug);
  const project = config.cloudflare?.project_name;
  const branch = String(args.branch || config.cloudflare?.production_branch || "main");
  if (!project) throw new Error("cloudflare.project_name kosong.");

  run("node", ["scripts/validate-brief.mjs", `--slug=${slug}`]);
  run("node", ["scripts/build-client.mjs", `--slug=${slug}`]);
  run("node", ["scripts/qa-static.mjs", `--slug=${slug}`]);

  const outDir = path.join(config.output_dir || "dist", slug);
  run("npx", ["wrangler", "pages", "deploy", outDir, `--project-name=${project}`, `--branch=${branch}`]);

  const now = new Date().toISOString();
  const statusFile = path.join(contextDir(slug), "status.json");
  const status = readJson(statusFile);
  status.status = "DEPLOYED";
  status.deployed_at = now;
  status.updated_at = now;
  status.history ||= [];
  status.history.push({ status: "DEPLOYED", at: now, note: `Deployed ke Pages project ${project}, branch ${branch}.` });
  writeJson(statusFile, status);

  const resultFile = path.join(ROOT, "clients", slug, "deployment-result.json");
  writeJson(resultFile, { slug, project, branch, deployed_at: now, output_dir: outDir });
  console.log(`✓ Deployment selesai. Catat URL aktual pada context/delivery-report.md.`);
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}
