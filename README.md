# Distrilink SAP - Dashboard Analisa Performa Salesman

Proyek ini adalah purwarupa (prototype) halaman dashboard berbasis web untuk memantau performa harian tim sales, dibangun sebagai penyelesaian studi kasus Frontend Web MagangHub untuk Distrilink.

## 🚀 Panduan Instalasi dan Menjalankan Proyek

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 18.x atau terbaru) di sistem Anda.

1. **Kloning Repositori:**
   \`\`\`bash
   git clone <https://github.com/arexsxx/dasbor-sales-testcase.git>
   cd <dasbor-sales-testcase>
   \`\`\`

2. **Instalasi Dependensi:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Jalankan Server Lokal:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Akses Aplikasi:**
   Buka browser dan kunjungi: **http://localhost:3000**
   
   **Kredensial Uji Coba (Sesuai API DummyJSON):**
   * Username: `emilys`
   * Password: `emilyspass`

---

## 🛠️ Justifikasi Pendekatan Teknis (Technical Rationale)

Aplikasi ini tidak hanya dibangun agar "berfungsi", tetapi juga dirancang dengan mempertimbangkan pengalaman pengguna (UX), keamanan sesi, dan skalabilitas antarmuka.

1. **Tech Stack & Ekosistem:** 
   Menggunakan **Next.js (App Router)** dan **TypeScript** untuk memastikan *Type Safety* pada struktur data performa sales. **Tailwind CSS** digunakan untuk tata letak yang fleksibel dan penataan gaya bawaan (Utility-first CSS).
2. **Arsitektur Component-Driven (Kerapian Kode):** 
   Halaman dasbor dipecah menjadi komponen antarmuka yang terisolasi (`HeaderDasbor`, `KartuRingkasan`, `TabelSales`, `GrafikEfektivitas`). Ini memudahkan proses *maintenance*, mencegah *re-render* yang tidak perlu, dan membuat kode lebih mudah dibaca.
3. **Optimasi Pencarian (Data Filtering):** 
   Fitur filter area dan nama sales menggunakan hook `useMemo` di React. Ini memastikan data array hanya disaring ulang ketika teks input benar-benar berubah, menghemat resource komputasi di sisi *client*.
4. **Desain UI/UX Responsif (Mobile-First):** 
   Menggunakan prinsip ruang putih (*white space*) dan hierarki visual yang jelas. Pada layar *mobile*, tabel dibungkus dengan *horizontal overflow* dan komponen dirancang bertumpuk agar data tetap terbaca tanpa merusak *layout* utama. Identitas warna diseragamkan menggunakan palet biru (`blue-600` / `#2563eb`) yang profesional.

---

## 📝 Asumsi dan Keputusan Desain Khusus

Sesuai dengan instruksi asesmen, berikut adalah asumsi eksplisit yang diterapkan saat menghadapi edge-cases selama proses *development*:

1. **Struktur Data JSON (kunjungan_unplanned):**
   Pada deskripsi dokumen soal, terdapat field `kunjungan_unplanned`. Namun, pada "Contoh Dataset JSON" riil yang diberikan, field tersebut tidak ada. **Asumsi:** Aplikasi dibangun murni berpatokan pada *Contoh Dataset JSON* yang tersedia, sehingga metrik *unplanned* ditiadakan dari kalkulasi antarmuka.
2. **Kalkulasi Rata-rata Efektivitas:**
   Angka "Rata-rata Efektivitas" pada *Summary Card* dihitung berdasarkan akumulasi rata-rata (mean) dari persentase `efektivitas_visit_persen` seluruh individu sales, bukan dihitung ulang dari total kunjungan dibagi total rencana.
3. **Penanganan Rate-Limiting API Publik (Fallback Session):**
   API publik `dummyjson.com` memiliki keterbatasan *rate-limiting* yang sering kali memblokir *request* dengan error `Failed to fetch` apabila pengguna melakukan *login-logout* secara cepat dan beruntun. 
   **Keputusan:** Sistem tetap diutamakan memanggil API sungguhan. Namun, jika terjadi kegagalan jaringan (CORS/Failed to fetch) di pihak DummyJSON *dan* kredensial yang dimasukkan adalah kredensial valid (`emilys`), sistem menyediakan *hybrid fallback* lokal agar penguji tetap dapat masuk ke dasbor tanpa hambatan (*seamless UX*).
4. **Pembersihan Sesi (Hard-Navigation):**
   Saat pengguna *Logout*, sistem menggunakan `window.location.replace` alih-alih *soft-router* bawaan Next.js. Ini memastikan memori sesi, cache halaman, dan token di browser benar-benar dibersihkan tanpa meninggalkan *state* yang bentrok.

---