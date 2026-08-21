# Agent Contract — Landing Page Factory

## Misi

Bangun satu landing page custom untuk satu klien berdasarkan fakta dan strategi yang tersedia. Jangan membuat template generik dan jangan menyentuh project klien lain.

## Scope perubahan

Saat menerima `CLIENT_SLUG`, agent hanya boleh mengubah:

```text
clients/<CLIENT_SLUG>/src/**
clients/<CLIENT_SLUG>/context/work-log.md
clients/<CLIENT_SLUG>/context/delivery-report.md
```

Agent tidak boleh mengubah script factory, schema, prompt global, workflow, atau folder klien lain kecuali tugas secara eksplisit meminta perubahan platform.

## Baca sebelum coding

1. `clients/<slug>/context/client-brief.json`
2. `clients/<slug>/context/competitor-research.md`
3. `clients/<slug>/context/angle-strategy.md`
4. `clients/<slug>/context/asset-manifest.md`
5. `clients/<slug>/context/build-spec.md`
6. `clients/<slug>/context/qa-checklist.md`
7. `prompts/04-coding-agent.md`

## Hard rules

- Fakta dalam brief tidak boleh diubah atau ditambah.
- Tidak boleh membuat testimonial, rating, scarcity, sertifikasi, hasil, atau angka palsu.
- Kompetitor hanya untuk memahami kategori; jangan menyalin copy, struktur khas, atau aset.
- Desain harus lahir dari kategori, target, brand, aset, dan angle.
- Jangan memakai gaya AI generik sebagai default.
- Semua CTA utama wajib memakai `data-cta="whatsapp"` dan `data-cta-location`.
- Nomor dan pesan WhatsApp ditetapkan oleh runtime build; jangan hard-code nomor lain.
- Jangan menghapus `<!-- LP_TRACKING_HEAD -->`, `runtime-config.js`, atau `app.js`.
- Hasil akhir tidak boleh mengandung TODO, lorem ipsum, `{{placeholder}}`, atau komentar instruksi produksi.
- Tidak boleh ada horizontal overflow pada 320px.
- CTA harus tetap berfungsi bila tracking gagal.

## Prosedur selesai

Jalankan:

```bash
npm run build -- --slug=<CLIENT_SLUG>
npm run qa -- --slug=<CLIENT_SLUG>
```

Lalu lakukan QA browser pada viewport yang ditetapkan. Isi `delivery-report.md` dengan hasil aktual. Jangan menyatakan selesai bila terdapat blocker.
