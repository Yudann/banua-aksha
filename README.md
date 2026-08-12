# Website PT Banua Aksha Inovasi

Company profile satu halaman untuk PT Banua Aksha Inovasi. Website dibangun dengan React dan Vite, dengan animasi scroll halus, responsive layout, serta formulir konsultasi yang mengirimkan email melalui Resend.

## Teknologi

- React 19
- Vite 6
- Tailwind CSS 4 dan CSS kustom (`src/styles/app.css`)
- Lenis untuk smooth scrolling
- Lucide React untuk seluruh ikon antarmuka
- Resend untuk pengiriman formulir konsultasi
- Vercel Functions untuk endpoint `POST /api/contact`

## Menjalankan Proyek Secara Lokal

Prasyarat: Node.js 20 atau lebih baru dan npm.

```bash
npm install
```

Salin template environment lalu isi API key Resend:

```bash
Copy-Item .env.example .env.local
```

Jalankan development server:

```bash
npm run dev
```

Website tersedia di `http://localhost:5173`.

Untuk build produksi:

```bash
npm run build
npm run preview
```

## Konfigurasi Email Formulir

Formulir pada section **Hubungi Kami** mengirim dua email melalui Resend:

1. Notifikasi permintaan konsultasi ke email tim PT.
2. Email konfirmasi plain text kepada calon klien.

Isi `.env.local` untuk local development dan Environment Variables di Vercel untuk deployment:

```env
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=hello.webuildy@gmail.com
CONTACT_FROM_EMAIL=Banua Aksha Website <support@webuildy.id>
```

Untuk produksi, ubah `CONTACT_TO_EMAIL` ke alamat inbox PT yang disetujui, misalnya `admin.petebaik@gmail.com`.

Catatan penting:

- `CONTACT_FROM_EMAIL` harus memakai sender/domain yang sudah terverifikasi di Resend.
- Jangan pernah memasukkan `RESEND_API_KEY` ke source code, `.env.example`, atau repository Git.
- `.env.local` sudah diabaikan Git dan hanya dipakai untuk environment lokal.
- Saat memakai `npm run dev`, endpoint `POST /api/contact` dijalankan oleh middleware development Vite. Saat deploy, Vercel otomatis menjalankan file `api/contact.js` sebagai serverless function.

## Deploy ke Vercel

1. Hubungkan repository ke project Vercel.
2. Tambahkan tiga environment variable pada menu **Settings > Environment Variables** untuk environment Production, Preview, dan Development sesuai kebutuhan.
3. Pastikan domain/sender `support@webuildy.id` sudah verified di Resend.
4. Deploy dari branch `main`.
5. Kirim satu formulir uji dan pastikan inbox tim serta email konfirmasi calon klien sama-sama menerima pesan.

## Struktur Proyek

```text
api/
  contact.js                 Endpoint email Resend
public/
  assets/                    Seluruh gambar website
  banua-logo.png             Logo utama
src/
  components/                Navigasi dan komponen reusable
  data/                      Copy layanan, klien, misi, nilai, dan proses
  hooks/                     Scroll, parallax, visibility, dan Lenis
  sections/                  Section-section halaman utama
  styles/app.css             Styling, responsive behavior, dan motion
  App.jsx                    Susunan halaman utama
vite.config.js               Konfigurasi Vite dan API lokal
```

## Panduan Update Konten

| Kebutuhan | Lokasi |
| --- | --- |
| Hero | `src/sections/Hero.jsx` |
| Tentang perusahaan | `src/sections/About.jsx` |
| Daftar dan deskripsi layanan | `src/data/services.js` |
| Tampilan slider layanan | `src/sections/Services.jsx` |
| Proses kerja | `src/data/processSteps.js` dan `src/sections/Process.jsx` |
| Visi dan misi | `src/sections/VisionMission.jsx` dan `src/data/missions.js` |
| Komitmen | `src/data/commitments.js` |
| Daftar sektor industri | `src/data/clients.js` |
| Nilai perusahaan | `src/data/values.js` |
| Form kontak | `src/sections/Contact.jsx` |
| Footer dan informasi kontak | `src/sections/Footer.jsx` |
| Animasi/global styling | `src/styles/app.css` |

## Catatan Pemeliharaan

- Semua ikon UI menggunakan `lucide-react`; gunakan ikon dari library yang sama saat menambah interaksi baru.
- Aset gambar diletakkan di `public/assets/`. Optimalkan gambar sebelum mengganti aset agar performa tetap baik di mobile.
- Perubahan besar pada scroll/motion perlu mempertahankan `prefers-reduced-motion` dan perilaku mobile yang sudah ada.
- Setelah perubahan, jalankan `npm run build` sebelum deploy.

## Troubleshooting

| Masalah | Pemeriksaan |
| --- | --- |
| Form mengembalikan 404 saat lokal | Restart `npm run dev`; middleware API aktif hanya saat development server terbaru berjalan. |
| Form gagal mengirim | Periksa `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, dan `CONTACT_FROM_EMAIL` pada `.env.local` atau Vercel. |
| Resend menolak sender | Verifikasi domain/sender di dashboard Resend. |
| Email masuk ke spam | Periksa SPF/DKIM domain sender dan cek folder spam penerima. |
| Perubahan tidak tampil setelah deploy | Pastikan Environment Variables dipasang pada environment deployment yang benar, lalu redeploy. |

---

Dokumen ini disiapkan untuk handover pengembangan website PT Banua Aksha Inovasi.
