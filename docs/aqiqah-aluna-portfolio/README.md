# Aqiqah Aluna — Portfolio Landing Page

Contoh landing page HTML statis untuk portfolio jasa pembuatan landing page. Brand **Aqiqah Aluna**, harga, area layanan, paket, dan seluruh data komersial di dalamnya bersifat fiktif.

## Fitur

- Desain custom tanpa framework dan tanpa template eksternal
- Responsive 320px hingga desktop lebar
- Ilustrasi kambing, nasi box, dan menu dibuat dengan SVG/CSS
- Selector paket putri/putra
- CTA WhatsApp dengan pesan paket otomatis
- Mobile sticky CTA
- FAQ accordion
- GA4 dan Meta Pixel opsional
- SEO dasar, Open Graph, sitemap, favicon, dan halaman 404
- Tanpa dependency dan tanpa aset eksternal

## Atur WhatsApp

Edit `config.js`:

```js
window.AQIQAH_CONFIG = {
  whatsappNumber: "6281234567890",
  whatsappDisplay: "+62 812-3456-7890",
  whatsappMessage: "Halo Aqiqah Aluna, saya ingin konsultasi paket aqiqah. Bisa dibantu?",
  ga4Id: "",
  metaPixelId: ""
};
```

Nomor harus menggunakan format internasional, hanya angka, tanpa tanda `+`, spasi, atau tanda hubung.

## Preview lokal

```bash
python -m http.server 4173
```

Buka `http://localhost:4173`.

## Deploy ke Cloudflare Pages

```bash
npx wrangler pages deploy . --project-name=aqiqah-aluna-demo
```

Sebelum deploy, ganti `https://contoh-domain-anda.com/` pada `index.html`, `robots.txt`, dan `sitemap.xml`.
