import path from "node:path";
import { parseArgs, requireSlug, ensureClient, readJson, contextDir, formatJakarta } from "./lib.mjs";

try {
  const args = parseArgs();
  const slug = requireSlug(args);
  ensureClient(slug);
  const status = readJson(path.join(contextDir(slug), "status.json"));
  console.log(`Project: ${slug}`);
  console.log(`Status: ${status.status}`);
  console.log(`Mulai SLA: ${formatJakarta(status.started_at)}`);
  console.log(`Deadline: ${formatJakarta(status.sla_deadline_at)}`);
  if (status.sla_deadline_at && !status.deployed_at) {
    const remaining = new Date(status.sla_deadline_at).getTime() - Date.now();
    const sign = remaining >= 0 ? "tersisa" : "terlambat";
    const absolute = Math.abs(remaining);
    const hours = Math.floor(absolute / 3_600_000);
    const minutes = Math.floor((absolute % 3_600_000) / 60_000);
    console.log(`SLA: ${sign} ${hours} jam ${minutes} menit`);
  }
  if (status.deployed_at) console.log(`Deployed: ${formatJakarta(status.deployed_at)}`);
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}
