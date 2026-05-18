# FrontEndForge — Interactive Web Coding Workspace

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech Stack](https://img.shields.io/badge/Stack-JavaScript%20%7C%20Vite%20%7C%20Monaco%20Editor-blue)](https://github.com/haibanr)

FrontEndForge adalah platform coding workspace berbasis web tanpa konfigurasi (*zero-setup*) yang dirancang khusus untuk membantu *frontend learners* melompati hambatan instalasi lingkungan lokal (*local environment*). Platform ini mengintegrasikan editor kode canggih dengan fitur inspeksi elemen instan untuk mempercepat proses pembelajaran dan meningkatkan keterampilan teknis secara praktis.

🚀 **[Live Demo Link]** | 📂 **[Pitch Deck/Documentation Link]**

---

## 📺 Demo & Fitur Utama (Core Features)

Berikut adalah panduan visual dan fungsionalitas utama dari platform FrontEndForge:

### 1. Workspace Tanpa Konfigurasi (Zero-Setup Workspace)
Pengguna dapat langsung menulis kode HTML5, CSS3, dan JavaScript (ES6) melalui struktur tab file yang dinamis tanpa perlu melakukan konfigurasi lingkungan lokal (*local environment*) terlebih dahulu.

<!-- 📸 TEMPAT SCREENSHOT 1: Taruh gambar/GIF tampilan utama aplikasi lengkap dengan tab file editor dan hasil render preview di sini -->
![Zero-Setup Workspace](https://placehold.co/800x450/2d3748/ffffff?text=Screenshot+Tampilan+Utama+Workspace)

*   **Informasi Penting:** Menyediakan preset proyek siap pakai (starter templates) untuk memotong waktu persiapan awal bagi para pelajar pemula.

### 2. Integrasi Monaco Editor (Advanced Monaco Editor Integration)
Mengintegrasikan mesin teks editor yang bertenaga guna menghadirkan pengalaman pengembangan kelas profesional langsung di dalam *browser*.

<!-- 📸 TEMPAT SCREENSHOT 2: Taruh gambar fokus pada teks editor saat menampilkan fitur autocompletion / sintaks warna di sini -->
![Monaco Editor Feature](https://placehold.co/800x450/2d3748/ffffff?text=Screenshot+Fitur+Auto-complete+Editor)

*   **Informasi Penting:** Dilengkapi dengan fitur *real-time autocompletion*, *syntax highlighting*, dan pencegahan reset layar otomatis (*state synchronization*) saat pengguna berpindah tab kode.

### 3. Fitur Inspeksi Elemen Instan (Instant Element Inspector) — *Fitur Andalan*
Mekanisme *debugging* interaktif yang memetakan komponen visual hasil render langsung kembali ke baris kode sumbernya secara instan.

<!-- 📸 TEMPAT SCREENSHOT 3: Taruh GIF/Gambar yang menunjukkan kursor mengklik elemen di preview dan kursor kode di editor otomatis berpindah ke baris yang sesuai -->
![Instant Element Inspector](https://placehold.co/800x450/2d3748/ffffff?text=Screenshot/GIF+Fitur+Inspect+Elemen+Instan)

*   **Informasi Penting:** Menyelesaikan masalah klasik pelajar frontend yang sering kesulitan melacak posisi baris kode dari komponen visual yang sedang mereka lihat di layar.

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
