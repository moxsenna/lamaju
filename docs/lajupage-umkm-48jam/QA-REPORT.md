# QA Report — LajuPage UMKM 48 Jam

## Status

**PASS**

## Pemeriksaan struktur dan kode

- JavaScript lolos `node --check`.
- Tepat satu elemen `<h1>`.
- Tidak ada ID elemen yang duplikat.
- Tidak ditemukan `Lorem Ipsum`, `TODO`, atau placeholder konten yang belum selesai.
- Tujuh titik CTA WhatsApp terdeteksi.
- Lima item FAQ terdeteksi.
- Proteksi nomor WhatsApp kosong bekerja: CTA membuka dialog setup dan tidak mengarah ke nomor acak.

## Pemeriksaan responsive di Chromium

Diuji pada viewport:

- 320 × 568
- 360 × 800
- 390 × 844
- 412 × 915
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 900

Hasil pada seluruh viewport:

- Horizontal overflow: **0 px**
- Jumlah `<h1>`: **1**
- CTA WhatsApp: **7**
- Runtime JavaScript error: **0**
- Mobile menu: **PASS**
- Dialog konfigurasi WhatsApp: **PASS**
- Showcase Kuliner, Kecantikan, dan Jasa Lokal: **PASS**

## Pemeriksaan pesan utama

- Fokus UMKM terlihat sejak eyebrow dan headline hero.
- Janji maksimal 48 jam ditampilkan pada hero, alur, proses, paket, garansi, CTA akhir, dan sticky mobile CTA.
- Harga Rp299.000 terlihat sejak hero dan kembali ditegaskan pada paket.
- Proses memulai dijelaskan sebagai chat CS, kirim foto, harga, dan informasi usaha.
- Garansi menjelaskan bahwa timer dimulai setelah pembayaran, brief, aset, scope, klaim, dan nomor WhatsApp lengkap.
- Tidak ada klaim bahwa landing page pasti menghasilkan penjualan.

## Pemeriksaan manual sebelum production

- Ganti nomor WhatsApp pada `config.js`, lalu uji di ponsel asli.
- Ganti canonical URL, Open Graph URL, sitemap URL, dan placeholder domain.
- Konfirmasi brand, harga, scope, dan redaksi garansi final.
- Uji deployed URL pada Chrome Android dan Safari iPhone.
- Jalankan Lighthouse pada domain final.
- Verifikasi event GA4 dan Meta Pixel menggunakan debug tool masing-masing.
