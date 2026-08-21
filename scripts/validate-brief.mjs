import path from "node:path";
import { parseArgs, requireSlug, ensureClient, readBrief } from "./lib.mjs";

export function validateBrief(brief, { readyGate = false } = {}) {
  const errors = [];
  const warnings = [];
  const requiredText = (value, label) => {
    if (!String(value ?? "").trim()) errors.push(`${label} wajib diisi.`);
  };
  const requiredArray = (value, label, min = 1) => {
    if (!Array.isArray(value) || value.filter(Boolean).length < min) errors.push(`${label} wajib memiliki minimal ${min} item.`);
  };

  requiredText(brief?.project?.project_id, "project.project_id");
  requiredText(brief?.project?.client_name, "project.client_name");
  requiredText(brief?.project?.brand_name, "project.brand_name");
  requiredText(brief?.project?.page_slug, "project.page_slug");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(brief?.project?.page_slug || ""))) {
    errors.push("project.page_slug harus kebab-case.");
  }
  if (brief?.project?.timezone !== "Asia/Jakarta") errors.push("project.timezone harus Asia/Jakarta.");

  requiredText(brief?.offer?.offer_name, "offer.offer_name");
  requiredText(brief?.offer?.category, "offer.category");
  requiredText(brief?.offer?.description, "offer.description");
  requiredText(brief?.offer?.primary_goal, "offer.primary_goal");
  requiredText(brief?.audience?.primary_audience, "audience.primary_audience");
  requiredArray(brief?.audience?.pain_points, "audience.pain_points");
  requiredArray(brief?.audience?.desired_outcomes, "audience.desired_outcomes");
  requiredArray(brief?.audience?.objections, "audience.objections");
  requiredArray(brief?.product?.benefits, "product.benefits");
  requiredText(brief?.cta?.whatsapp_number_e164, "cta.whatsapp_number_e164");
  if (!/^[1-9][0-9]{7,14}$/.test(String(brief?.cta?.whatsapp_number_e164 || ""))) {
    errors.push("cta.whatsapp_number_e164 harus digit-only, kode negara + nomor, 8–15 digit.");
  }
  requiredText(brief?.cta?.prefilled_message, "cta.prefilled_message");
  requiredText(brief?.cta?.primary_label, "cta.primary_label");

  const ga = String(brief?.tracking?.ga4_measurement_id || "");
  if (ga && !/^G-[A-Z0-9]+$/.test(ga)) errors.push("GA4 Measurement ID tidak valid.");
  const meta = String(brief?.tracking?.meta_pixel_id || "");
  if (meta && !/^\d{5,30}$/.test(meta)) errors.push("Meta Pixel ID tidak valid.");

  if (!brief?.assets?.usage_rights_confirmed) warnings.push("Hak penggunaan aset belum dikonfirmasi.");
  if (!Array.isArray(brief?.assets?.files) || brief.assets.files.length === 0) warnings.push("Daftar aset masih kosong.");
  if (!brief?.proof?.testimonials?.length && !brief?.proof?.case_studies?.length && !brief?.proof?.credentials?.length && !brief?.proof?.risk_reversal) {
    warnings.push("Belum ada bukti kuat/risk reversal; strategi harus menyesuaikan dan tidak mengarang trust element.");
  }

  if (readyGate) {
    const approvals = [
      [brief?.approval?.payment_received, "approval.payment_received"],
      [brief?.approval?.scope_approved, "approval.scope_approved"],
      [brief?.approval?.claims_approved, "approval.claims_approved"],
      [brief?.approval?.whatsapp_tested, "approval.whatsapp_tested"],
      [brief?.assets?.usage_rights_confirmed, "assets.usage_rights_confirmed"],
    ];
    for (const [value, label] of approvals) if (!value) errors.push(`${label} harus true untuk memulai SLA.`);
    requiredText(brief?.approval?.brief_approved_at, "approval.brief_approved_at");
    requiredText(brief?.approval?.approved_by, "approval.approved_by");
    if (!Array.isArray(brief?.assets?.files) || brief.assets.files.length === 0) errors.push("Minimal satu aset wajib tersedia untuk memulai SLA.");
  }

  return { errors, warnings };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const args = parseArgs();
    const slug = requireSlug(args);
    ensureClient(slug);
    const brief = readBrief(slug);
    const result = validateBrief(brief, { readyGate: Boolean(args.ready) });

    for (const warning of result.warnings) console.warn(`⚠ ${warning}`);
    for (const error of result.errors) console.error(`✗ ${error}`);
    if (result.errors.length) process.exit(1);
    console.log(`✓ Brief '${slug}' valid${args.ready ? " dan lolos ready gate" : ""}.`);
  } catch (error) {
    console.error(`✗ ${error.message}`);
    process.exit(1);
  }
}
