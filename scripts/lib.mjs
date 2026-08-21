import fs from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(import.meta.dirname, "..");
export const VALID_STATUSES = [
  "DRAFT", "INTAKE", "READY_FOR_PRODUCTION", "RESEARCH", "STRATEGY",
  "BUILDING", "QA", "DEPLOYED", "REVISION", "DONE", "BLOCKED",
];

export function parseArgs(argv = process.argv.slice(2)) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const [rawKey, inline] = token.slice(2).split("=", 2);
    if (inline !== undefined) {
      args[rawKey] = inline;
    } else if (argv[i + 1] && !argv[i + 1].startsWith("--")) {
      args[rawKey] = argv[i + 1];
      i += 1;
    } else {
      args[rawKey] = true;
    }
  }
  return args;
}

export function requireSlug(args) {
  const slug = String(args.slug || "").trim();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error("Gunakan --slug dengan format kebab-case, contoh: kopi-senja");
  }
  return slug;
}

export function clientDir(slug) {
  return path.join(ROOT, "clients", slug);
}

export function contextDir(slug) {
  return path.join(clientDir(slug), "context");
}

export function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    throw new Error(`Gagal membaca JSON ${file}: ${error.message}`);
  }
}

export function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export function readBrief(slug) {
  return readJson(path.join(contextDir(slug), "client-brief.json"));
}

export function readConfig(slug) {
  return readJson(path.join(clientDir(slug), "project.config.json"));
}

export function ensureClient(slug) {
  const dir = clientDir(slug);
  if (!fs.existsSync(dir)) {
    throw new Error(`Client '${slug}' tidak ditemukan. Jalankan npm run new:client terlebih dahulu.`);
  }
  return dir;
}

export function copyDir(source, target) {
  fs.mkdirSync(target, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const from = path.join(source, entry.name);
    const to = path.join(target, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

export function listFilesRecursive(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFilesRecursive(full));
    else out.push(full);
  }
  return out;
}

export function formatJakarta(iso) {
  if (!iso) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date(iso));
}

export function pushStatus(slug, status, note = "") {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error(`Status tidak valid: ${status}`);
  }
  const file = path.join(contextDir(slug), "status.json");
  const data = readJson(file);
  const now = new Date().toISOString();
  data.status = status;
  data.updated_at = now;
  data.history ||= [];
  data.history.push({ status, at: now, note });
  writeJson(file, data);
  return data;
}

export function safeProjectName(slug) {
  return `lp-${slug}`.slice(0, 58).replace(/-+$/g, "");
}

export function htmlEscapeScriptJson(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
