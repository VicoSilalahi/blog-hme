**Ringkasan Fitur dan Routing**

Perbaruan: 2025-12-14

- **Tujuan:**: Menjelaskan fitur utama, alur data, dan routing aplikasi.

**Teknologi Utama**
- **Framework:**: Next.js (App Router) dengan React Server Components.
- **Styling:**: Tailwind CSS (konfigurasi di repo).
- **CMS / Data:**: DatoCMS via GraphQL menggunakan `graphql-request` dan helper di `src/lib/datocms.ts`.

**Fitur Utama**
- **Daftar Artikel (Home):**: Implementasi di `src/app/page.tsx`. Mengambil `id`, `title`, `slug`, `date`, `coverImage` lewat query `HOMEPAGE_QUERY` dan menampilkan preview artikel (gambar, tanggal, judul) serta tautan ke detail.
- **Halaman Artikel (Detail):**: Implementasi di `src/app/blog/[slug]/page.tsx`. Query `POST_QUERY` mengambil artikel berdasarkan `slug` termasuk `content`, `coverImage`, `tags`. Menampilkan judul, timestamp, gambar utama, isi (`StructuredText`), dan Related Articles berbasis pencocokan tag (skor = jumlah tag yang sama, top 3).
- **Layout Global:**: `src/app/layout.tsx` menyediakan metadata (title, description, icon), wrapper halaman, footer, dan skrip kecil untuk me-localize tampilan tanggal pada elemen `<time data-utc>`.
- **404 Handling:**: Jika artikel tidak ditemukan, fungsi `notFound()` dipanggil → Next.js menampilkan 404.

**Routing (Rute Penting)**
- **/**: Ditangani oleh `src/app/page.tsx` — daftar artikel (home).
- **/blog/[slug]**: Ditangani oleh `src/app/blog/[slug]/page.tsx` — halaman detail artikel dinamis.
- **Link Internal:**: Dari daftar ke detail menggunakan `Link href={`/blog/${article.slug}`}`.
- **Data Fetching:**: Dilakukan pada server (server components, `async` functions) sebelum render.

**Catatan Penting / Opset**
- **Environment Variable:**: Pastikan `NEXT_DATOCMS_API_TOKEN` tersedia agar GraphQL request berfungsi (`src/lib/datocms.ts`).
- **Gambar:**: Gambar ditampilkan via URL langsung (`<img src=...>`), bukan `next/image`.
- **Dependensi Utama:**: lihat `package.json` (`next`, `react`, `graphql-request`, `react-datocms`, `tailwindcss`).

**Saran / Langkah Berikutnya**
- **README:**: Tambahkan bagian setup env (`NEXT_DATOCMS_API_TOKEN`) dan cara menjalankan (`npm run dev`).
- **Optimasi Gambar:**: Pertimbangkan mengganti ke `next/image` untuk optimasi dan layout shift.
- **Testing:**: Tambahkan test/basic linting dan cek error saat `NEXT_DATOCMS_API_TOKEN` tidak tersedia.

--
Dokumentasi ini dibuat otomatis berdasarkan kode sumber pada `src/app` dan `src/lib/datocms.ts`.

