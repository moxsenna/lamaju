import path from "node:path";
import { parseArgs, requireSlug, ensureClient, readBrief, writeJson, contextDir, pushStatus, readJson } from "./lib.mjs";
import { validateBrief } from "./validate-brief.mjs";

try {
  const args = parseArgs();
  const slug = requireSlug(args);
  ensureClient(slug);
  const brief = readBrief(slug);
  const result = validateBrief(brief, { readyGate: true });
  for (const warning of result.warnings) console.warn(`⚠ ${warning}`);
  if (result.errors.length) {
    for (const error of result.errors) console.error(`✗ ${error}`);
    throw new Error("Ready gate gagal. SLA belum dimulai.");
  }

  const now = new Date();
  const deadline = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  brief.project.status = "READY_FOR_PRODUCTION";
  brief.project.ready_for_production_at = now.toISOString();
  brief.project.sla_deadline_at = deadline.toISOString();
  writeJson(path.join(contextDir(slug), "client-brief.json"), brief);

  const status = pushStatus(slug, "READY_FOR_PRODUCTION", "Brief dikunci dan SLA 48 jam dimulai.");
  status.started_at = now.toISOString();
  status.sla_deadline_at = deadline.toISOString();
  writeJson(path.join(contextDir(slug), "status.json"), status);

  console.log(`✓ SLA dimulai: ${now.toISOString()}`);
  console.log(`✓ Deadline: ${deadline.toISOString()} (48 jam)`);
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}
