# LajuPage — Landing Page UMKM 48 Jam

Landing page untuk memasarkan jasa pembuatan landing page cepat bagi UMKM: mulai Rp299.000, versi pertama online maksimal 48 jam setelah brief lengkap, dan CTA utama langsung ke WhatsApp.

## Arah positioning

Halaman difokuskan pada tiga pesan utama:

1. **Kecepatan:** hari ini kirim bahan, maksimal 48 jam versi pertama sudah online.
2. **Kemudahan untuk UMKM:** cukup chat CS serta kirim foto, harga, dan informasi usaha.
3. **Harga yang mudah diputuskan:** Rp299.000 sekali bayar, tanpa biaya hosting bulanan selama memakai subdomain dan infrastruktur layanan.

## Isi proyek

- `index.html` — struktur dan seluruh copy halaman.
- `styles.css` — desain, responsive, animasi, serta komponen visual.
- `app.js` — CTA WhatsApp, tracking, mobile menu, showcase interaktif, dan interaksi halaman.
- `config.js` — nomor WhatsApp serta ID analytics.
- `standalone-preview.html` — preview satu file dengan CSS dan JavaScript inline.
- `desktop-preview.png` dan `mobile-preview.png` — tangkapan layar hasil akhir.
- `assets/favicon.svg` — favicon.
- `assets/og-image.png` — gambar ketika link dibagikan.
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `_headers`, dan `404.html`.

## Wajib diubah sebelum dipublikasikan

### 1. Nomor WhatsApp

Buka `config.js`:

```js
window.LAJUPAGE_CONFIG = {
  whatsappNumber: "6281234567890",
  whatsappDisplay: "+62 812-3456-7890",
  whatsappMessage:
    "Halo LajuPage, saya pemilik UMKM dan tertarik Paket Landing Page 48 Jam Rp299.000. Bisa cek apakah usaha saya cocok?",
  ga4Id: "",
  metaPixelId: ""
};
```

Nomor harus memakai format internasional dan hanya berisi digit, tanpa tanda `+`, spasi, atau tanda hubung.

### 2. Domain dan metadata

Cari `https://contoh-domain-anda.com/` pada:

- `index.html`
- `robots.txt`
- `sitemap.xml`

Ganti dengan domain final.

### 3. Nama brand

Brand contoh menggunakan **LajuPage**. Cari `LajuPage` pada `index.html`, `app.js`, metadata, dan file konfigurasi bila ingin menggantinya.

### 4. Analytics opsional

- GA4: isi `ga4Id` dengan format `G-XXXXXXXXXX`.
- Meta Pixel: isi `metaPixelId` dengan angka Pixel ID.

Klik WhatsApp akan mengirim:

- GA4 event: `whatsapp_click`
- Meta Pixel event: `Contact`

Kegagalan tracking tidak akan menghambat pengunjung menuju WhatsApp.

## Preview lokal

Tidak membutuhkan instalasi package.

```bash
python -m http.server 4173
```

Buka `http://localhost:4173`.

Atau buka `standalone-preview.html` untuk preview satu file.

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

- Satu produk atau satu penawaran utama.
- Maksimal 10 section.
- Riset cepat kompetitor dan penentuan angle.
- Copywriting berdasarkan brief.
- Desain custom, bukan template pasaran.
- Responsive desktop dan mobile.
- CTA langsung ke WhatsApp.
- Subdomain dan hosting tanpa biaya bulanan.
- Satu putaran revisi minor.
- Garansi versi pertama online maksimal 48 jam setelah Definition of Ready terpenuhi.

## Catatan portfolio

Area showcase Kuliner, Kecantikan, dan Jasa Lokal memakai brand serta produk fiktif untuk demonstrasi. Halaman tidak menggunakan testimonial, rating, jumlah pelanggan, atau klaim hasil palsu.
