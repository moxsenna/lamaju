# Workflow Produksi per Klien

## Gate 0 — Order diterima

Pemilik: CS / admin.

Output:

- pembayaran tercatat;
- slug klien dibuat;
- folder project dibuat;
- status `INTAKE`.

## Gate 1 — Brief lengkap

Pemilik: CS.

Wajib selesai:

- produk/offer jelas;
- target utama jelas;
- harga/promo/ketentuan jelas;
- bukti dan klaim dipisahkan;
- aset minimum diterima;
- hak penggunaan aset dikonfirmasi;
- nomor WhatsApp format internasional diuji;
- rangkuman brief disetujui klien;
- scope disetujui;
- pembayaran diterima.

Jalankan `validate`, lalu `mark:ready`. Timer 48 jam baru dimulai setelah script berhasil.

## Gate 2 — Riset

Pemilik: researcher/strategist.

Output wajib:

- sampel kompetitor;
- matriks 5P;
- pola kategori;
- white space;
- hal yang tidak boleh ditiru;
- sumber dan tanggal akses.

Status: `RESEARCH`.

## Gate 3 — Strategi

Pemilik: strategist.

Output wajib:

- kandidat angle;
- skor TAJAM;
- angle utama;
- angle pendukung;
- reason to believe;
- message hierarchy;
- struktur section;
- daftar klaim aman dan klaim yang ditolak.

Status: `STRATEGY`.

## Gate 4 — Build

Pemilik: coding agent + reviewer manusia.

Input agent harus lengkap. Agent membuat halaman dari blank canvas teknis, bukan memilih template visual.

Status: `BUILDING`.

## Gate 5 — QA

Pemilik: QA/reviewer.

Urutan:

1. build;
2. QA statis;
3. QA konten;
4. QA visual;
5. QA responsive;
6. QA CTA WhatsApp;
7. QA tracking;
8. QA browser/console/network;
9. deploy preview;
10. smoke test URL publik.

Status: `QA`.

## Gate 6 — Delivery

SLA berhenti ketika versi pertama:

- online pada subdomain provider;
- dapat dibuka publik;
- CTA utama berfungsi;
- tidak memiliki blocker;
- lolos checklist internal.

Status: `DEPLOYED`.

Kirim URL, batas revisi, serta ringkasan implementasi. Approval akhir dan custom domain bukan syarat penghentian timer.

## Gate 7 — Revisi

Satu daftar revisi minor, maksimal 10 butir, diterima maksimal tiga hari kalender setelah delivery.

Status: `REVISION`, lalu `DONE` setelah revisi dan handover selesai.
