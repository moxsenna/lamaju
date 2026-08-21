# QA Report — Portfolio High-Intent 5

Tanggal pengujian: 1 Agustus 2026

## Cakupan

- Chromium headless pada 1440×900, 390×844, dan 320×568.
- Pemeriksaan horizontal overflow.
- Pemeriksaan runtime JavaScript dan console error.
- Menu mobile, FAQ, dan interaksi khusus setiap halaman.
- Pemeriksaan satu H1 dan ID unik.
- Semua halaman merupakan single-file HTML tanpa aset eksternal.

## Hasil

### home-care-lansia.html

- H1: 1
- ID duplikat: tidak ada
- CTA/data-wa: 4
- Overflow: tidak ditemukan pada tiga viewport.
- Console/page error: tidak ditemukan.
- Interaksi khusus: lulus.

### waterproofing.html

- H1: 1
- ID duplikat: tidak ada
- CTA/data-wa: 4
- Overflow: tidak ditemukan pada tiga viewport.
- Console/page error: tidak ditemukan.
- Interaksi khusus: lulus.

### cctv-smart-home.html

- H1: 1
- ID duplikat: tidak ada
- CTA/data-wa: 4
- Overflow: tidak ditemukan pada tiga viewport.
- Console/page error: tidak ditemukan.
- Interaksi khusus: lulus.

### daycare-premium.html

- H1: 1
- ID duplikat: tidak ada
- CTA/data-wa: 4
- Overflow: tidak ditemukan pada tiga viewport.
- Console/page error: tidak ditemukan.
- Interaksi khusus: lulus.

### pindahan-storage.html

- H1: 1
- ID duplikat: tidak ada
- CTA/data-wa: 5
- Overflow: tidak ditemukan pada tiga viewport.
- Console/page error: tidak ditemukan.
- Interaksi khusus: lulus.

## Interaksi yang diuji

- Home care: pilihan kebutuhan mengubah rekomendasi.
- Waterproofing: pilihan gejala mengubah diagnosa awal.
- CCTV & smart home: package builder mengubah total simulasi.
- Daycare: selector kelompok usia mengubah program dan jadwal.
- Pindahan: estimator memperbarui kisaran biaya.

## Catatan produksi

- Ganti konstanta `WA_NUMBER` pada setiap HTML.
- Seluruh brand, harga, SLA, benefit, dan skenario adalah fiktif.
- Untuk penggunaan nyata, klaim, prosedur, izin, perlindungan data, dan ketentuan layanan harus diverifikasi oleh pemilik usaha.