# Landing Page Factory — Starter Repository

Repository operasional untuk memproduksi landing page custom berbantuan AI dengan SLA versi pertama online maksimal 48 jam.

**Prinsip utama:** repository ini tidak menyediakan template visual. Folder `starter/src` hanya berisi kontrak teknis minimum, reset CSS, runtime CTA WhatsApp, dan titik injeksi tracking. Coding agent tetap harus membuat struktur, visual direction, copy presentation, dan komposisi halaman khusus untuk setiap klien.

## Model produksi

Satu klien dibuat sebagai satu folder terisolasi:

```text
clients/<slug>/
├── context/                # Single source of truth
├── src/                    # Landing page milik klien
└── project.config.json     # Konfigurasi build dan Cloudflare
```

Hasil build diletakkan di:

```text
dist/<slug>/
```

## Persyaratan

- Node.js 24 atau lebih baru.
- Akun Cloudflare dengan Pages project untuk setiap klien pada fase awal.
- Wrangler login untuk deploy lokal, atau secrets GitHub Actions:
  - `CLOUDFLARE_API_TOKEN`
  - `CLOUDFLARE_ACCOUNT_ID`

Repository ini sengaja memakai script Node.js bawaan tanpa dependency runtime agar setup awal kecil dan stabil.

## Mulai cepat

### 1. Buat project klien

```bash
npm run new:client -- --slug=kopi-senja --client="Kopi Senja" --brand="Kopi Senja"
```

Script membuat folder baru, mengisi identitas dasar, dan menghasilkan nama Pages project yang aman.

### 2. Isi brief

Edit:

```text
clients/kopi-senja/context/client-brief.json
```

Percakapan CS dapat dinormalisasi menggunakan `prompts/01-brief-normalizer.md`.

### 3. Validasi brief

```bash
npm run validate -- --slug=kopi-senja
```

### 4. Kunci brief dan mulai SLA

Setelah pembayaran, approval, aset minimum, klaim, dan nomor WhatsApp sudah valid:

```bash
npm run mark:ready -- --slug=kopi-senja
```

Script menolak memulai SLA bila syarat wajib belum terpenuhi, lalu mencatat waktu mulai dan deadline tepat 48 jam.

### 5. Isi riset dan strategi

Lengkapi berurutan:

```text
competitor-research.md
angle-strategy.md
asset-manifest.md
build-spec.md
```

Gunakan prompt di folder `prompts/` agar output antar-agen konsisten.

### 6. Jalankan coding agent

Berikan agent:

```text
AGENTS.md
prompts/04-coding-agent.md
clients/<slug>/context/*
clients/<slug>/src/*
```

Agent hanya boleh mengubah folder klien yang sedang dikerjakan.

### 7. Build dan QA

```bash
npm run build -- --slug=kopi-senja
npm run qa -- --slug=kopi-senja
```

QA otomatis memeriksa kontrak statis seperti metadata, placeholder, CTA WhatsApp, data attribute tracking, nomor tujuan, gambar, link eksternal, form, serta konsistensi tracking. QA visual dan responsive tetap wajib dilakukan dengan browser sesuai checklist.

### 8. Preview lokal

```bash
npm run serve -- --slug=kopi-senja --port=4173
```

### 9. Provision Pages project

```bash
npm run provision -- --slug=kopi-senja
```

### 10. Deploy

```bash
npm run deploy -- --slug=kopi-senja --branch=main
```

Atau jalankan workflow **Deploy Client** dari GitHub Actions.

## Perintah

| Perintah | Fungsi |
|---|---|
| `new:client` | Membuat workspace klien tanpa desain template |
| `validate` | Memeriksa kelengkapan dan format brief |
| `mark:ready` | Memulai timer SLA 48 jam setelah semua gate lulus |
| `status` | Menampilkan fase dan sisa waktu SLA |
| `set:status` | Mengubah fase operasional |
| `build` | Menyalin source dan menginjeksi runtime/tracking |
| `qa` | Menjalankan QA statis pada hasil build |
| `serve` | Menjalankan preview lokal tanpa dependency |
| `provision` | Membuat Cloudflare Pages project |
| `deploy` | Build, QA, lalu deploy dengan Wrangler |

## Status workflow

```text
DRAFT
→ INTAKE
→ READY_FOR_PRODUCTION
→ RESEARCH
→ STRATEGY
→ BUILDING
→ QA
→ DEPLOYED
→ REVISION
→ DONE
```

Gunakan `BLOCKED` bila ada fakta, aset, approval, atau risiko yang menghentikan produksi.

## Source of truth

Urutan otoritas:

1. `client-brief.json` — fakta, scope, approval, CTA, tracking.
2. `angle-strategy.md` — angle dan message hierarchy.
3. `asset-manifest.md` — aset dan izin penggunaan.
4. `build-spec.md` — acceptance criteria teknis.
5. `competitor-research.md` — pola kategori dan white space; tidak boleh disalin.

## Keamanan

- Jangan simpan API token di repository.
- GA4 Measurement ID dan Meta Pixel ID boleh berada di frontend karena memang identifier publik, tetapi tetap harus berasal dari klien.
- Jangan menambahkan script pihak ketiga tanpa persetujuan.
- Jangan mengirim data sensitif melalui event tracking.
- Domain sebaiknya tetap dimiliki klien; tim hanya mengelola konfigurasi teknis.

## Dokumen utama

- `docs/PLAYBOOK-LANDING-PAGE-48-JAM.md`
- `docs/WORKFLOW.md`
- `docs/CS-BRIEF-SCRIPT.md`
- `docs/QA-OPERATIONS.md`
- `docs/DEPLOYMENT.md`
- `AGENTS.md`
