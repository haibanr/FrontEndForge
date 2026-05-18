# FrontEndForge — Interactive Web Coding Workspace

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech Stack](https://img.shields.io/badge/Stack-JavaScript%20%7C%20Vite%20%7C%20Monaco%20Editor-blue)](https://github.com/haibanr)

FrontEndForge adalah platform coding workspace berbasis web tanpa konfigurasi (*zero-setup*) yang dirancang khusus untuk membantu *frontend learners* melompati hambatan instalasi lingkungan lokal (*local environment*). Platform ini mengintegrasikan editor kode canggih dengan fitur inspeksi elemen instan untuk mempercepat proses pembelajaran dan meningkatkan keterampilan teknis secara praktis.

<img width="800" height="450" alt="image" src="https://github.com/user-attachments/assets/5f35f141-3c9b-4240-9146-1a9c4a26f075" />

---

## 📺 Alur Penggunaan & Demo Fitur Utama

Berikut adalah panduan langkah demi langkah cara menggunakan fitur interaktif di FrontEndForge untuk memaksimalkan proses pembelajaran:

### 1. Memilih Proyek Terpandu (Guided Learning Projects)
Untuk memulai, pengguna tidak perlu bingung harus menulis apa dari awal. Platform menyediakan berbagai kurasi proyek terpandu untuk meningkatkan skill.

<!-- 📸 TEMPAT SCREENSHOT 1: Taruh gambar daftar menu template proyek atau modal pilihan preset di sini -->
!<img width="800" height="450" alt="image" src="https://github.com/user-attachments/assets/5623e6e4-aa0a-401e-ba2c-f8e593497c64" />

*   **Cara Menggunakan:**
    1. Klik tombol **"Templates"** atau **"Projects"** pada top bar/sidebar.
    2. Pilih salah satu studi kasus proyek yang tersedia (misal: *Landing Page, Calculator, atau Todo App*).
    3. Struktur file HTML, CSS, dan JS yang berisi boilerplate khusus akan langsung dimuat ke dalam editor secara otomatis.

### 2. Eksplorasi Editor Tanpa Hambatan (Zero-Setup Workspace & Auto-complete)
Setelah proyek dimuat, pengguna bisa langsung fokus mengeksplorasi dan memodifikasi kode melalui editor kelas profesional.

<!-- 📸 TEMPAT SCREENSHOT 2: Taruh gambar fokus pada teks editor saat menampilkan fitur autocompletion / sintaks warna di sini -->
<img width="800" height="450" alt="image" src="https://github.com/user-attachments/assets/9afa7f7e-e050-42dc-b018-8595253d3af6" />

*   **Cara Menggunakan:**
    1. Pilih tab file (`index.html`, `style.css`, atau `script.js`) di atas editor untuk berpindah konteks.
    2. Mulai ketik kode kamu; fitur *intelligence autocompletion* akan otomatis memberikan saran kode.
    3. Hasil ketikan akan langsung di-render secara *real-time* di panel *Live Preview* tanpa perlu melakukan *refresh* halaman secara manual.

### 3. Mengaktifkan Mode Inspeksi Elemen Instan (Instant Element Inspector)
Jika pengguna ingin tahu baris kode mana yang menghasilkan elemen visual tertentu pada hasil render, mereka dapat menggunakan fitur andalan ini.

<!-- 📸 TEMPAT SCREENSHOT 3: Taruh GIF/Gambar yang menunjukkan kursor mengklik tombol "Inspect", lalu mengarah ke preview -->
<img width="800" height="450" alt="image" src="https://github.com/user-attachments/assets/2540d196-e8b3-49e5-b744-68f64fd57f2f" />


*   **Cara Menggunakan:**
    1. Klik tombol **"Inspect"** (ikon target/kursor) pada panel kontrol untuk beralih ke **Inspect Mode**.
    2. Setelah mode aktif, gerakkan kursor masuk ke dalam panel *Live Preview*.
    3. Klik langsung pada elemen UI yang ingin diperiksa (misal: sebuah tombol atau gambar).
    4. Sistem akan otomatis memindahkan kursor teks di Monaco Editor dan menyorot (*highlight*) baris kode sumber asli dari elemen tersebut secara instan.

### 4. Memantau Output via Console Log (Virtual Console Log Panel)
Untuk mempermudah proses pelacakan variabel dan pesan error dari JavaScript, platform ini menyediakan panel log khusus yang tertanam langsung di dalam UI aplikasi.

<img width="800" height="450" alt="image" src="https://github.com/user-attachments/assets/aa9ef5a0-07bc-4dc0-bba5-bfcb7419ad30" />


*   **Cara Menggunakan:**
    1. Tulis kode perintah cetak seperti `console.log("Hello World")` atau lacak variabel di dalam berkas `script.js`.
    2. Buka atau perhatikan panel **"Console"** yang terletak di bagian bawah *Live Preview*.
    3. Seluruh output log, pesan peringatan (*warning*), hingga pesan error dari kode JavaScript kamu akan tercetak secara rapi di sana, mirip dengan DevTools browser bawaan namun lebih ramah pemula.

---

## 🛠️ Arsitektur & Teknologi (Tech Stack)

*   **Frontend:** JavaScript (ES6), Vite (Build tool berperforma tinggi untuk SPA).
*   **Code Editor:** Monaco Editor API (Mesin utama di balik VS Code).
*   **Communication & Sandbox:** HTML5 `postMessage` API & Isolated `<iframe>`.

---

## 💡 Tantangan Teknis & Solusi (Technical Challenges & Solutions)

### Tantangan: Sinkronisasi Elemen UI dengan Baris Kode (Fitur Inspect)
*   **Masalah:** Bagaimana cara memetakan elemen visual di dalam *preview* (yang berjalan di konteks dokumen berbeda) kembali ke baris kode spesifik yang ada di dalam Monaco Editor tanpa merusak performa?
*   **Solusi:** Memanfaatkan **HTML5 `postMessage` API** sebagai jembatan komunikasi yang aman antara aplikasi utama dan *isolated iframe sandbox*. Saat fitur *inspect* aktif, *event listener* menangkap target klik, mengekstrak metadata baris, dan mengirimkannya kembali ke editor untuk memindahkan kursor secara instan ke baris kode yang tepat.

---

## 📦 Cara Menjalankan Proyek secara Lokal (Local Setup)

Pastikan kamu sudah menginstal [Node.js](https://nodejs.org/).

1. Klon repositori ini:
   ```bash
   git clone https://github.com/haibanr/FrontEndForge.git

2. Masuk ke direktori proyek:
   ```bash
   cd FrontEndForge
   
3. Instal dependensi:
   ```bash
   npm install

4. Jalankan server pengembangan lokal:
   ```bash
   npm run dev

5. Buka `http://localhost:5173` di browser kamu.
