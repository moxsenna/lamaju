# LajuPage — Portfolio Landing Page 48 Jam

Landing page statis untuk memasarkan jasa pembuatan landing page custom Rp299.000 dengan garansi selesai maksimal 48 jam.

## Isi proyek

- `index.html` — struktur dan seluruh copy halaman.
- `styles.css` — desain, responsive, animasi, dan komponen visual.
- `app.js` — CTA WhatsApp, tracking, mobile menu, demo switcher, dan interaksi.
- `config.js` — nomor WhatsApp serta ID analytics.
- `assets/favicon.svg` — favicon.
- `assets/og-image.png` — gambar ketika link dibagikan.
- `robots.txt`, `sitemap.xml`, dan `404.html`.

## Wajib diubah sebelum dipublikasikan

### 1. Nomor WhatsApp

Buka `config.js`:

```js
window.LAJUPAGE_CONFIG = {
  whatsappNumber: "6281234567890",
  whatsappDisplay: "+62 812-3456-7890",
  whatsappMessage: "Halo LajuPage, saya tertarik membuat landing page Rp299.000. Bisa bantu jelaskan prosesnya?",
  ga4Id: "",
  metaPixelId: ""
};
```

Nomor harus memakai format internasional dan hanya berisi digit, tanpa tanda `+`, spasi, atau tanda hubung.

### 2. Domain dan metadata

Cari teks `https://contoh-domain-anda.com/` pada:

- `index.html`
- `robots.txt`
- `sitemap.xml`

Ganti dengan domain final.

### 3. Nama brand

Brand contoh menggunakan **LajuPage**. Cari `LajuPage` pada `index.html`, `app.js`, dan metadata bila ingin menggantinya.

### 4. Analytics opsional

- GA4: isi `ga4Id` dengan format `G-XXXXXXXXXX`.
- Meta Pixel: isi `metaPixelId` dengan angka Pixel ID.

Klik WhatsApp akan mengirim:

- GA4 event: `whatsapp_click`
- Meta Pixel event: `Contact`

Tracking gagal tidak akan menghambat pengunjung menuju WhatsApp.

## Preview lokal

Tidak membutuhkan instalasi package.

```bash
python -m http.server 4173
```

Buka `http://localhost:4173`.

## Deploy ke Cloudflare Pages

### Dashboard

1. Buat project Pages baru.
2. Pilih Direct Upload.
3. Unggah seluruh isi folder ini.
4. Hubungkan custom domain bila diperlukan.

### Wrangler

```bash
npx wrangler pages deploy . --project-name=lajupage
```

## Scope yang dikomunikasikan halaman

- Satu produk atau satu penawaran.
- Maksimal 10 section.
- Riset kompetitor ringan dan penentuan angle.
- Copywriting dari brief.
- Desain custom berbantuan AI.
- Responsive desktop dan mobile.
- CTA WhatsApp.
- Subdomain dan hosting tanpa biaya bulanan.
- Satu putaran revisi minor.
- Garansi versi pertama selesai maksimal 48 jam setelah Definition of Ready terpenuhi.

## Catatan

Area showcase Beauty, F&B, dan Jasa menggunakan brand fiktif serta diberi label sebagai demonstrasi. Tidak ada testimonial, rating, atau klaim hasil palsu pada halaman.
