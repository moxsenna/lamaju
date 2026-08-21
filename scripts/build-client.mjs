import fs from "node:fs";
import path from "node:path";
import {
  ROOT, parseArgs, requireSlug, ensureClient, readBrief, readConfig, copyDir, htmlEscapeScriptJson,
} from "./lib.mjs";
import { validateBrief } from "./validate-brief.mjs";

function trackingMarkup(brief) {
  const ga = String(brief.tracking?.ga4_measurement_id || "");
  const meta = String(brief.tracking?.meta_pixel_id || "");
  const parts = [];

  if (ga) {
    parts.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${ga}"></script>\n<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');</script>`);
  }

  if (meta) {
    parts.push(`<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${meta}');fbq('track','PageView');</script>`);
  }

  return parts.join("\n");
}

try {
  const args = parseArgs();
  const slug = requireSlug(args);
  const client = ensureClient(slug);
  const brief = readBrief(slug);
  const config = readConfig(slug);
  const validation = validateBrief(brief);
  if (validation.errors.length) {
    for (const error of validation.errors) console.error(`✗ ${error}`);
    throw new Error("Build dibatalkan karena brief tidak valid.");
  }

  const sourceDir = path.join(client, config.source_dir || "src");
  const outDir = path.join(ROOT, config.output_dir || "dist", slug);
  if (!fs.existsSync(path.join(sourceDir, "index.html"))) throw new Error("src/index.html tidak ditemukan.");
  fs.rmSync(outDir, { recursive: true, force: true });
  copyDir(sourceDir, outDir);

  const indexFile = path.join(outDir, "index.html");
  let html = fs.readFileSync(indexFile, "utf8");
  if (!html.includes("<!-- LP_TRACKING_HEAD -->")) {
    throw new Error("Marker <!-- LP_TRACKING_HEAD --> hilang dari index.html.");
  }
  html = html.replace("<!-- LP_TRACKING_HEAD -->", trackingMarkup(brief));
  fs.writeFileSync(indexFile, html, "utf8");

  const runtime = {
    pageSlug: brief.project.page_slug,
    offerName: brief.offer.offer_name,
    whatsappNumber: brief.cta.whatsapp_number_e164,
    whatsappMessage: brief.cta.prefilled_message,
    ga4MeasurementId: brief.tracking?.ga4_measurement_id || "",
    metaPixelId: brief.tracking?.meta_pixel_id || "",
  };
  fs.writeFileSync(
    path.join(outDir, "runtime-config.js"),
    `window.LP_RUNTIME_CONFIG = ${htmlEscapeScriptJson(runtime)};\n`,
    "utf8",
  );

  fs.writeFileSync(path.join(outDir, "_headers"), `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n\n/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`, "utf8");

  console.log(`✓ Build selesai: ${path.relative(ROOT, outDir)}`);
} catch (error) {
  console.error(`✗ ${error.message}`);
  process.exit(1);
}
