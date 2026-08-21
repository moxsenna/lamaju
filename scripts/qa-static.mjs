import fs from "node:fs";
import path from "node:path";
import { ROOT, parseArgs, requireSlug, ensureClient, readBrief, readConfig, listFilesRecursive, writeJson } from "./lib.mjs";
import "./build-client.mjs";

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, "i"));
  return match ? match[2] : "";
}

function stripTags(value) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function localAssetCandidates(html) {
  const refs = [];
  const re = /\b(?:src|href)\s*=\s*(["'])(.*?)\1/gi;
  let match;
  while ((match = re.exec(html))) {
    const value = match[2].trim();
    if (!value || value.startsWith("#") || value.startsWith("mailto:") || value.startsWith("tel:") || value.startsWith("data:") || /^https?:\/\//i.test(value)) continue;
    refs.push(value.split(/[?#]/)[0]);
  }
  return refs;
}

try {
  const args = parseArgs();
  const slug = requireSlug(args);
  ensureClient(slug);
  const brief = readBrief(slug);
  const config = readConfig(slug);
  const outDir = path.join(ROOT, config.output_dir || "dist", slug);
  const indexFile = path.join(outDir, "index.html");
  const html = fs.readFileSync(indexFile, "utf8");
  const allTextFiles = listFilesRecursive(outDir).filter((f) => /\.(html|css|js|json|txt)$/i.test(f));
  const combined = allTextFiles.map((f) => fs.readFileSync(f, "utf8")).join("\n");
  const blockers = [];
  const warnings = [];
  const pass = [];

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "";
  if (!stripTags(title)) blockers.push("Title kosong."); else pass.push("Title tersedia.");
  const descriptionTag = html.match(/<meta\b[^>]*name=["']description["'][^>]*>/i)?.[0] || html.match(/<meta\b[^>]*content=["'][^"']+["'][^>]*name=["']description["'][^>]*>/i)?.[0] || "";
  if (!attr(descriptionTag, "content")) blockers.push("Meta description kosong."); else pass.push("Meta description tersedia.");

  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) blockers.push(`Jumlah H1 harus 1, ditemukan ${h1Count}.`); else pass.push("Satu H1 ditemukan.");

  const placeholderPatterns = [/\bTODO\b/i, /lorem ipsum/i, /\{\{[^}]+\}\}/, /CODING AGENT:/i];
  for (const pattern of placeholderPatterns) if (pattern.test(combined)) blockers.push(`Placeholder/instruksi produksi masih ada: ${pattern}`);

  const ctaTags = html.match(/<(?:a|button)\b[^>]*data-cta=["']whatsapp["'][^>]*>/gi) || [];
  if (!ctaTags.length) blockers.push("Tidak ada CTA WhatsApp.");
  for (const tag of ctaTags) {
    if (!attr(tag, "data-cta-location")) blockers.push(`CTA tanpa data-cta-location: ${tag.slice(0, 160)}`);
    if (/^<button/i.test(tag)) blockers.push("CTA WhatsApp sebaiknya berupa link <a>, bukan button tanpa fallback href.");
  }
  if (ctaTags.length) pass.push(`${ctaTags.length} CTA WhatsApp ditemukan.`);

  const runtime = fs.readFileSync(path.join(outDir, "runtime-config.js"), "utf8");
  if (!runtime.includes(brief.cta.whatsapp_number_e164)) blockers.push("Runtime WhatsApp number tidak sama dengan brief.");
  else pass.push("Runtime WhatsApp number cocok dengan brief.");

  const images = html.match(/<img\b[^>]*>/gi) || [];
  for (const image of images) {
    if (!/\balt\s*=/.test(image)) blockers.push(`Image tanpa alt: ${image.slice(0, 180)}`);
    if (!/\bwidth\s*=/.test(image) || !/\bheight\s*=/.test(image)) warnings.push(`Image tanpa width/height eksplisit: ${image.slice(0, 180)}`);
  }

  const blankLinks = html.match(/<a\b[^>]*target=["']_blank["'][^>]*>/gi) || [];
  for (const link of blankLinks) {
    const rel = attr(link, "rel");
    if (!/noopener/i.test(rel)) blockers.push(`target=_blank tanpa noopener: ${link.slice(0, 180)}`);
  }

  const formEnabled = Boolean(brief.tracking?.event_spec?.form_success?.enabled);
  if (/<form\b/i.test(html) && !formEnabled) blockers.push("Form ditemukan tetapi brief menggunakan WhatsApp-only/form_success disabled.");

  for (const claim of brief.claims?.prohibited_claims || []) {
    if (claim && combined.toLocaleLowerCase("id-ID").includes(String(claim).toLocaleLowerCase("id-ID"))) {
      blockers.push(`Prohibited claim ditemukan: '${claim}'`);
    }
  }

  const ga = String(brief.tracking?.ga4_measurement_id || "");
  if (ga && !html.includes(ga)) blockers.push("GA4 ID tersedia di brief tetapi tidak terinjeksi.");
  if (!ga && /googletagmanager\.com\/gtag\/js/i.test(html)) blockers.push("GA4 terpasang meski ID kosong di brief.");
  const meta = String(brief.tracking?.meta_pixel_id || "");
  if (meta && !html.includes(meta)) blockers.push("Meta Pixel ID tersedia di brief tetapi tidak terinjeksi.");
  if (!meta && /connect\.facebook\.net/i.test(html)) blockers.push("Meta Pixel terpasang meski ID kosong di brief.");

  const appJs = fs.readFileSync(path.join(outDir, "app.js"), "utf8");
  if (!appJs.includes('"whatsapp_click"') || !appJs.includes('"Contact"')) blockers.push("Kontrak event WhatsApp tidak ditemukan di app.js.");
  if (/generate_lead|["']Lead["']/i.test(appJs) && !formEnabled) warnings.push("Lead event ditemukan; pastikan tidak dipanggil pada klik WhatsApp.");

  for (const ref of localAssetCandidates(html)) {
    const normalized = ref.startsWith("/") ? ref.slice(1) : ref.replace(/^\.\//, "");
    const full = path.join(outDir, normalized);
    if (!fs.existsSync(full)) blockers.push(`Asset lokal tidak ditemukan: ${ref}`);
  }

  if (!/<link\b[^>]*rel=["']canonical["']/i.test(html)) warnings.push("Canonical tidak ditemukan.");
  if (!/<meta\b[^>]*property=["']og:title["']/i.test(html)) warnings.push("Open Graph title tidak ditemukan.");
  if (!/<html\b[^>]*lang=["'][^"']+["']/i.test(html)) blockers.push("Atribut lang pada html tidak ditemukan.");

  const report = {
    slug,
    generated_at: new Date().toISOString(),
    result: blockers.length ? "FAIL" : "PASS",
    blockers,
    warnings,
    passed_checks: pass,
    manual_qa_required: [
      "copy/fact review", "visual concept", "responsive viewports", "console/network",
      "WhatsApp click on mobile and desktop", "GA4/Meta debug verification", "public URL smoke test",
    ],
  };
  writeJson(path.join(ROOT, "clients", slug, "qa-report.json"), report);

  for (const item of pass) console.log(`✓ ${item}`);
  for (const item of warnings) console.warn(`⚠ ${item}`);
  for (const item of blockers) console.error(`✗ ${item}`);
  console.log(`Report: clients/${slug}/qa-report.json`);
  if (blockers.length) process.exit(1);
  console.log("✓ QA statis lulus. QA browser/manual tetap wajib.");
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}
