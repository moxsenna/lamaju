# QA Report — Aqiqah Aluna Portfolio

Tanggal pengujian: 31 Juli 2026

## Hasil

- Satu elemen `h1`.
- Tidak ada ID duplikat.
- Sepuluh CTA WhatsApp terdeteksi.
- Tidak ditemukan placeholder `TODO` atau `Lorem ipsum`.
- JavaScript lolos pemeriksaan sintaks `node --check`.
- Tidak ada console error saat halaman dan interaksi diuji.
- Selector paket **putri/putra** berhasil memperbarui harga, jumlah hewan, dan jumlah box.
- FAQ accordion berhasil dibuka dan ditutup.
- Menu navigasi mobile berhasil dibuka.
- Nomor WhatsApp yang belum diatur ditangani dengan dialog konfigurasi, bukan diarahkan ke nomor acak.

## Viewport yang diperiksa

- 320 × 568
- 360 × 800
- 390 × 844
- 412 × 915
- 768 × 1024
- 1024 × 768
- 1280 × 800
- 1440 × 900

Pada seluruh viewport, lebar root document sama dengan lebar viewport sehingga halaman tidak menghasilkan horizontal scroll. Elemen dekoratif yang sengaja berada di luar kanvas dipotong oleh root container.

## Batas pengujian

- Harga, paket, area layanan, dan seluruh informasi komersial bersifat fiktif untuk portfolio.
- GA4 dan Meta Pixel tidak diuji karena ID sengaja dikosongkan.
- Nomor WhatsApp perlu diisi di `config.js` sebelum publikasi.
- Canonical URL, robots, dan sitemap perlu diganti dengan domain final.
