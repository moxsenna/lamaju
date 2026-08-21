# Deployment Cloudflare Pages per Klien

## Strategi fase awal

Gunakan satu Pages project untuk satu klien. Ini memberikan isolasi deploy, rollback, custom domain, dan analytics yang sederhana. Repository tetap boleh monorepo; workflow manual memilih `client_slug`.

## Provision lokal

Pastikan Wrangler sudah terautentikasi, lalu:

```bash
npm run provision -- --slug=<client-slug>
```

Script menjalankan pembuatan Pages project berdasarkan `project.config.json`.

## Deploy lokal

```bash
npm run deploy -- --slug=<client-slug> --branch=main
```

Urutan internal:

1. validasi brief;
2. build;
3. QA statis;
4. `wrangler pages deploy`.

## GitHub Actions

Tambahkan repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Gunakan API token dengan izin minimum yang diperlukan untuk Pages deployment. Buka Actions → **Deploy Client** → pilih slug dan branch.

Workflow tidak membuat domain secara otomatis. Hubungkan custom domain setelah deployment pertama dan setelah kepemilikan/domain access terkonfirmasi.

## Project config

```json
{
  "cloudflare": {
    "project_name": "lp-client-slug",
    "production_branch": "main"
  }
}
```

Project name harus unik pada akun Cloudflare dan hanya memakai karakter yang didukung.

## Rollback

Sebelum deploy produksi:

- pastikan commit atau tag terakhir stabil;
- simpan URL deployment dari output workflow;
- bila build baru bermasalah, deploy ulang commit stabil atau gunakan rollback melalui dashboard/deployment history.

## Custom domain

- domain idealnya dimiliki klien;
- simpan siapa registrar dan siapa pemilik akses;
- jangan memasukkan credential registrar ke repository;
- SLA 48 jam berhenti pada subdomain provider;
- propagasi DNS dan approval custom domain dicatat terpisah.

## Skala

Saat jumlah project mulai menjadi hambatan, jangan menambal pipeline per klien tanpa desain ulang. Evaluasi platform multi-tenant berbasis hostname routing dan asset storage terpusat. Migrasi harus mempertahankan isolasi aset, rollback, analytics, custom domain, dan kemampuan ekspor file klien.
