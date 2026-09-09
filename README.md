# Dashboard Analisa Performa Salesman — Distrilink SAP

Purwarupa dashboard untuk supervisor SAP memantau performa harian tim sales: efektivitas kunjungan, total order, dan pesanan yang gagal karena stok kosong (OOS). Dibuat untuk test case Frontend Web seleksi magang.

## Tech Stack

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 — sesuai ketentuan teknis soal. UI pakai **shadcn/ui** di atas Radix agar komponen dasar (button, input, card, table, alert) sudah accessible dan konsisten tanpa perlu dibuat dari nol. Chart pakai **Recharts**, ikon dari **lucide-react**.

## Fitur

- Login terhubung ke API DummyJSON sungguhan (`POST /auth/login`) — ada toggle tampilkan/sembunyikan password, dan alert jelas kalau login gagal
- Dashboard terproteksi: otomatis redirect ke `/login` kalau belum ada token
- Header menampilkan nama user yang login + tombol Keluar
- 3 summary card — total kunjungan, rata-rata efektivitas, total nilai order (klik kartu order untuk lihat nominal penuh)
- Bar chart efektivitas kunjungan per sales
- Pencarian nama/area di tabel sales
- Layout responsif untuk desktop & tablet

## Struktur Folder

```
src/
├── app/
│   ├── page.tsx          # redirect otomatis ke /login
│   ├── login/page.tsx    # halaman login + integrasi API
│   └── dasbor/page.tsx   # halaman dashboard utama
├── components/
│   ├── PeringatanError.tsx   # alert untuk error 
│   ├── HeaderDasbor.tsx      # header + info user + tombol logout
│   ├── KartuRingkasan.tsx    # 3 summary cards
│   ├── GrafikEfektivitas.tsx # bar chart efektivitas
│   ├── TabelSales.tsx        # tabel data sales + search
│   └── ui/                   # komponen dasar dari shadcn/ui
├── data/
│   └── dataPenjualan.json    # dataset sales, statis lokal
├── lib/
│   └── formatRupiah.ts       # helper format angka ke Rupiah
└── type/
    └── tipePenjualan.ts      # definisi tipe data sales
```

## Panduan Instalasi dan Menjalankan Proyek

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 18.x atau terbaru) di sistem Anda.

1. **Kloning Repositori:**
   ```bash
   git clone https://github.com/arexsxx/dasbor-sales-testcase.git
   cd dasbor-sales-testcase
   ```

2. **Instalasi Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Server Lokal:**
   ```bash
   npm run dev
   ```

4. **Akses Aplikasi:**
   Buka browser dan kunjungi: **http://localhost:3000**

   **Kredensial Uji Coba:**
   - Username: `emilys`
   - Password: `emilyspass`

   Akun lain bisa dicek lewat GET **https://dummyjson.com/users**.

---

## Catatan & Asumsi

- Token disimpan di `localStorage`, sesuai ketentuan soal
- Data sales pakai JSON statis lokal (`src/data/dataPenjualan.json`) sesuai dataset di soal, bukan dari API, karena datanya memang spesifik untuk studi kasus ini
- Field `kunjungan_unplanned` yang disebut di deskripsi field pada soal sengaja tidak dipakai — field ini tidak ada di dataset contoh dan tidak dibutuhkan rumus/tugas manapun
