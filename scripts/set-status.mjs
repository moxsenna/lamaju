import path from "node:path";
import { parseArgs, requireSlug, ensureClient, pushStatus, readBrief, writeJson, contextDir, VALID_STATUSES } from "./lib.mjs";

try {
  const args = parseArgs();
  const slug = requireSlug(args);
  const status = String(args.status || "").toUpperCase();
  if (!VALID_STATUSES.includes(status)) throw new Error(`Gunakan --status salah satu: ${VALID_STATUSES.join(", ")}`);
  ensureClient(slug);
  const data = pushStatus(slug, status, String(args.note || ""));
  const brief = readBrief(slug);
  brief.project.status = status;
  writeJson(path.join(contextDir(slug), "client-brief.json"), brief);
  console.log(`✓ Status ${slug}: ${data.status}`);
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}
