# Work Log

## Project summary

- Offer: Paket Landing Page UMKM 48 Jam, mulai Rp299.000 sekali bayar.
- Target: Pemilik UMKM yang ingin segera mempromosikan satu produk atau penawaran utama.
- Conversion goal: Memulai konsultasi melalui WhatsApp.
- Primary angle: Hari ini kirim bahan; maksimal 48 jam versi pertama landing page sudah online setelah brief lengkap.
- Reason to believe: Alur produksi yang dijelaskan, scope jelas, dan garansi kecepatan yang tercantum dalam materi sumber.
- CTA: WhatsApp pada header, hero, hasil, paket, CTA akhir, footer, dan sticky mobile.
- Scope limits: Satu produk atau penawaran utama, maksimal 10 section, satu putaran revisi minor; tanpa backend atau integrasi kompleks.
- Known risks: Canonical sementara memakai subdomain Cloudflare; ganti bila custom domain tersedia.

## Visual concept

> Landing page menggunakan gaya editorial cepat dan tegas dengan kontras kertas, tinta, lime, oranye, dan biru untuk menegaskan layanan produksi landing page UMKM yang praktis dan berkecepatan tinggi.

## Decisions

| Time | Decision | Reason | Source of truth |
|---|---|---|---|
| 2026-08-04 | Migrasi halaman referensi ke workspace klien factory | Mempertahankan struktur, elemen interaktif, dan arah visual; CTA serta tracking dipindahkan ke runtime build factory. | `docs/lajupage-umkm-48jam/` |
| 2026-08-04 | Tambahkan galeri `/portfolio/` dengan sembilan demo interaktif | Menunjukkan variasi desain tanpa memuat seluruh demo sebagai iframe di homepage. | `docs/portfolio-high-intent-5/`, `docs/portfolio-umkm-variasi-ui/` |
| 2026-08-21 | Konfigurasi Meta Pixel ID `3208899346164826` dimuat langsung tanpa UI persetujuan. | Requirement aktual konfigurasi Pixel. | Konfigurasi Meta Pixel aktual. |
| 2026-08-21 | Muat `PageView` pada seluruh 13 halaman source dan build melalui `meta-pixel.js` bersama. | Menjaga satu implementasi Pixel konsisten di semua halaman. | Implementasi Meta Pixel aktual. |
| 2026-08-21 | Klik CTA WhatsApp mengirim Meta `Lead` dengan `content_name` dan `cta_location`; GA4 tetap memakai `whatsapp_click`. | Requirement event aktual; CTA tetap melanjutkan navigasi WhatsApp. | Implementasi tracking aktual. |
| 2026-08-21 | Tambahkan lima demo portfolio fiktif: FORMA Interior, Atelier Dapur, VANTA Auto Lab, Maison Vow, dan RapiBangun. | Total demo portfolio menjadi 14 dan memperluas variasi kategori tanpa mengklaim sebagai proyek klien nyata. | Laporan implementasi aktual. |
| 2026-08-21 | Kurasi & integrasi 47 aset gambar fotografi riil untuk seluruh 15 landing page portfolio demo di bawah `src/assets/portfolio/images/`. | Mengganti placeholder geometris/CSS dengan visual fotografi berkualitas tinggi sesuai kategori masing-masing bisnis UMKM. | Request pengguna aktual. |
| 2026-08-21 | Selaraskan event Meta Pixel tracking pada `app.js` menjadi `Contact` sesuai kontrak QA static factory. | Memastikan static QA `npm run qa` lulus 100% tanpa blocker. | Validasi QA Factory. |

## Assumptions

- Canonical awal memakai subdomain Cloudflare yang diproyeksikan; ganti setelah domain final tersedia.

## Blockers

- Tidak ada blocker aktif. Seluruh 15 halaman demo portfolio telah terisi aset visual riil dan lulus QA statis.
