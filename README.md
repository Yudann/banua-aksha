# Website BAI Konsultan

Company profile satu halaman untuk **BAI Konsultan / PT Banua Aksha Inovasi**, perusahaan konsultan lingkungan. Website dibangun sebagai static frontend React + Vite dan menggunakan endpoint PHP + PHPMailer untuk formulir konsultasi pada shared hosting cPanel.

Production: [https://baikonsultan.com](https://baikonsultan.com)

## Teknologi

- React 19
- Vite 6
- Tailwind CSS 4 dan CSS kustom (`src/styles/app.css`)
- Lenis untuk smooth scrolling
- Lucide React untuk ikon antarmuka
- PHP 8.1+ dan PHPMailer untuk SMTP contact form
- Apache/cPanel untuk hosting production

## Menjalankan Frontend

Prasyarat: Node.js 20+ dan npm.

```bash
npm install
npm run dev
```

Vite development server hanya menjalankan frontend. Endpoint PHP tidak dieksekusi oleh Vite.

Build production:

```bash
npm run build
```

Hasil build berada di folder `dist`. File dari `public`, termasuk `api/contact.php`, `robots.txt`, `sitemap.xml`, dan `.htaccess`, ikut disalin ke `dist`.

## Contact Form dan SMTP

Flow production:

```text
React form
  -> POST /api/contact.php
  -> validasi, honeypot, dan file-based rate limit
  -> PHPMailer melalui SMTPS mail.baikonsultan.com:465
  -> admin@baikonsultan.com
```

Email visitor digunakan sebagai `Reply-To`, bukan sebagai `From`. Sender selalu memakai mailbox domain BAI Konsultan.

### Dependency PHP

Dependency backend didefinisikan di `server/composer.json` dan tidak dibundle oleh npm.

```bash
composer install --working-dir=server --no-dev --optimize-autoloader
```

### Config lokal

Salin template config ke lokasi yang diabaikan Git:

```powershell
New-Item -ItemType Directory -Force server/private
Copy-Item server/mail-config.example.php server/private/mail-config.php
```

Isi `smtp_password` hanya pada `server/private/mail-config.php`. Jangan memasukkan password ke `public`, `src`, `.env`, atau variable `VITE_*`.

Untuk menguji build bersama PHP built-in server:

```powershell
npm run build
php -S localhost:8080 -t dist
```

Buka `http://localhost:8080`. Tambahkan origin tersebut ke `allowed_origins` pada config lokal selama pengujian, lalu hapus kembali setelah selesai.

## Setup Production cPanel

Struktur yang direkomendasikan:

```text
/home/baic1929/
  private/
    composer.json
    mail-config.php
    vendor/
  public_html/
    api/contact.php
    assets/
    index.html
    robots.txt
    sitemap.xml
    .htaccess
    ...hasil build Vite lainnya
```

Langkah setup:

1. Buat `/home/baic1929/private` di luar `public_html`.
2. Upload `server/composer.json` ke folder tersebut.
3. Jalankan Composer di folder private:

   ```bash
   cd /home/baic1929/private
   composer install --no-dev --optimize-autoloader
   ```

4. Salin `server/mail-config.example.php` menjadi `/home/baic1929/private/mail-config.php`.
5. Isi password mailbox yang benar hanya pada file private tersebut.
6. Pastikan permission file config membatasi akses ke akun hosting, misalnya `600` bila didukung.
7. Build frontend secara lokal dan upload **isi** folder `dist` ke `public_html`.
8. Pastikan hidden file `.htaccess` ikut ter-upload.

Jika Composer tidak tersedia di terminal cPanel, jalankan `composer install --working-dir=server --no-dev --optimize-autoloader` secara lokal, lalu upload folder `server/vendor`, `server/composer.json`, dan config production ke `/home/baic1929/private`.

## Konfigurasi Mail

Field pada `mail-config.php`:

| Field | Production value |
| --- | --- |
| `smtp_host` | `mail.baikonsultan.com` |
| `smtp_port` | `465` |
| `smtp_username` | `admin@baikonsultan.com` |
| `smtp_password` | Password mailbox, server-side only |
| `from_email` | `admin@baikonsultan.com` |
| `from_name` | `BAI Konsultan Website` |
| `recipient` | `admin@baikonsultan.com` |
| `allowed_origins` | `https://baikonsultan.com` |

TLS certificate verification tetap aktif. Jangan menambahkan opsi yang menonaktifkan `verify_peer` atau mengizinkan self-signed certificate.

## Struktur Utama

```text
public/
  api/contact.php             Endpoint PHP production
  assets/                     Gambar website
  .htaccess                   Security, compression, dan cache policy
  robots.txt                  Crawl policy
  sitemap.xml                 Sitemap homepage
  banua-logo.png              Logo dan favicon
server/
  composer.json               Dependency PHPMailer
  mail-config.example.php     Template config tanpa secret
src/
  components/                 Navigasi dan komponen reusable
  data/                       Copy layanan, sektor, misi, nilai, dan proses
  hooks/                      Scroll, parallax, visibility, dan Lenis
  sections/                   Section halaman utama
  styles/app.css              Styling, responsive behavior, dan motion
  App.jsx                     Susunan halaman
index.html                    Metadata SEO dan JSON-LD
vite.config.js                Konfigurasi build Vite
```

## Panduan Update Konten

| Kebutuhan | Lokasi |
| --- | --- |
| Hero | `src/sections/Hero.jsx` |
| Tentang perusahaan | `src/sections/About.jsx` |
| Daftar dan deskripsi layanan | `src/data/services.js` |
| Form contact dan dropdown layanan | `src/sections/Contact.jsx` |
| Proses kerja | `src/data/processSteps.js` dan `src/sections/Process.jsx` |
| Visi dan misi | `src/sections/VisionMission.jsx` dan `src/data/missions.js` |
| Komitmen | `src/data/commitments.js` |
| Sektor industri | `src/data/clients.js` |
| Nilai perusahaan | `src/data/values.js` |
| Footer dan identitas kontak | `src/sections/Footer.jsx` |
| Metadata SEO | `index.html` |
| Animasi dan responsive styling | `src/styles/app.css` |

Dropdown contact form mengambil data dari `src/data/services.js`, sama seperti section layanan. Allowlist backend di `public/api/contact.php` wajib ikut disinkronkan ketika nama layanan berubah karena backend tidak boleh mempercayai nilai dari browser.

## Checklist Sebelum Upload

```bash
npm install
npm run build
```

- Pastikan tidak ada secret di `dist` atau Git.
- Pastikan `dist/api/contact.php` tersedia.
- Pastikan `dist/.htaccess`, `dist/robots.txt`, dan `dist/sitemap.xml` tersedia.
- Test form, email admin, email konfirmasi visitor, dan fungsi Reply-To.
- Test `https://baikonsultan.com/robots.txt` dan `https://baikonsultan.com/sitemap.xml` setelah upload.

## Troubleshooting

| Masalah | Pemeriksaan |
| --- | --- |
| Form 404 | Pastikan isi `dist` di-upload ke `public_html` dan `public_html/api/contact.php` tersedia. |
| Form 500 | Periksa lokasi config private, instalasi PHPMailer, versi PHP, serta setting mailbox. Detail internal hanya dicatat di server log. |
| SMTP gagal | Pastikan port 465, SMTPS, username mailbox penuh, password benar, dan sertifikat mail host valid. |
| Email masuk spam | Periksa SPF, DKIM, DMARC, dan reputasi domain dari cPanel/DNS. |
| Request ditolak | Pastikan `allowed_origins` cocok persis dengan production origin. |
| Perubahan tidak tampil | Pastikan isi build terbaru ter-upload dan hapus cache HTML/CDN bila ada. |

Dokumen ini disiapkan untuk handover pengembangan website PT Banua Aksha Inovasi.
