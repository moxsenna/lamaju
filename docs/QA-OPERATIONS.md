# QA Operations

QA otomatis hanya menangkap pelanggaran yang bisa dideteksi secara statis. Review manusia tetap wajib untuk kualitas desain, copy, konteks, dan pengalaman mobile.

## Blocker otomatis

- file `index.html` tidak ada;
- title atau meta description kosong;
- jumlah H1 bukan satu;
- placeholder/TODO/lorem ipsum masih ada;
- CTA WhatsApp tidak ada;
- nomor CTA berbeda dari brief setelah build;
- CTA tidak memiliki lokasi tracking;
- gambar bermakna tidak memiliki alt;
- external link `target="_blank"` tidak memiliki `noopener`;
- form muncul padahal scope WhatsApp-only;
- prohibited claim muncul secara eksplisit;
- ID tracking berformat tidak valid;
- asset lokal yang direferensikan tidak ditemukan.

## Review manusia — konten

- offer dipahami dalam lima detik;
- target terasa spesifik;
- angle konsisten;
- tidak ada klaim lebih kuat daripada bukti;
- harga, promo, ketentuan, area layanan, dan langkah order benar;
- objection handling relevan;
- CTA sesuai tahap persuasi;
- tidak ada janji hasil absolut.

## Review manusia — desain

- visual concept sesuai kategori dan target;
- tidak terlihat seperti template AI generik;
- aset produk menjadi pusat perhatian;
- hierarchy jelas;
- tidak semua section berupa kartu;
- jumlah radius, shadow, warna, font, dan dekorasi terkendali;
- whitespace dan panjang baris nyaman;
- CTA primary konsisten;
- footer memiliki identitas bisnis dan fallback kontak bila tersedia.

## Viewport wajib

- 320 × 568
- 360 × 800
- 390 × 844
- 412 × 915
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 900

## Review responsive

- tidak ada horizontal scroll;
- body text minimum 16px;
- tap target utama minimum 44 × 44 CSS px;
- sticky CTA tidak menutup konten atau consent UI;
- urutan konten tetap logis ketika grid menjadi satu kolom;
- gambar tidak gepeng dan crop tidak menghilangkan informasi penting;
- heading tidak menghasilkan orphan ekstrem;
- text zoom 200% tetap usable;
- focus state terlihat;
- reduced motion dihormati.

## QA CTA WhatsApp

Klik CTA dari:

- hero;
- section tengah;
- offer/pricing;
- sticky mobile bila ada;
- footer.

Pastikan:

- semuanya menuju nomor yang sama;
- pesan otomatis benar;
- nama produk benar;
- URL ter-encode;
- desktop dan mobile sama-sama berfungsi;
- fallback nomor tampil bila ditentukan;
- event hanya terpanggil satu kali per klik;
- kegagalan analytics tidak menghambat navigasi.

## QA tracking

Dengan GA4 DebugView/Tag Assistant atau tool browser yang sesuai:

- `whatsapp_click` terkirim sekali;
- parameter `cta_location`, `offer_name`, `page_slug`, `link_url` tersedia;
- Meta event memakai `Contact` untuk klik WhatsApp;
- `Lead`/`generate_lead` tidak dipakai untuk klik WhatsApp biasa;
- tidak ada data sensitif dalam event;
- ID sesuai brief;
- script tidak dipasang bila ID kosong.

## Smoke test setelah deploy

- URL publik HTTP 200;
- favicon/OG image tidak 404;
- semua asset utama 200;
- tidak ada mixed content;
- console tanpa error kritis;
- CTA publik masih benar;
- canonical menunjuk URL final yang benar atau dicatat sebagai perbaikan custom domain;
- halaman dapat dibagikan dengan preview sosial yang layak.
