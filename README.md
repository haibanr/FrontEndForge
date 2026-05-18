# FrontEndForge — Interactive Web Coding Workspace

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tech Stack](https://img.shields.io/badge/Stack-JavaScript%20%7C%20Vite%20%7C%20Monaco%20Editor-blue)](https://github.com/haibanr)

FrontEndForge adalah platform coding workspace berbasis web tanpa konfigurasi (*zero-setup*) yang dirancang khusus untuk membantu *frontend learners* melompati hambatan instalasi lingkungan lokal (*local environment*). Platform ini mengintegrasikan editor kode canggih dengan fitur inspeksi elemen instan untuk mempercepat proses pembelajaran dan meningkatkan keterampilan teknis secara praktis.

🚀 **[Live Demo Link]** | 📂 **[Pitch Deck/Documentation Link]**

---

## 📌 Fitur Utama (Core Features)

*   **Zero-Setup Workspace:** Mulai menulis kode HTML5, CSS3, dan JavaScript (ES6) langsung di browser tanpa perlu menginstal Node.js, Vite, atau ekstensi editor.
*   **Advanced Monaco Editor Integration:** Dilengkapi dengan fitur *real-time autocompletion*, *syntax highlighting*, dan *structural presets* untuk meminimalkan friksi saat menulis kode.
*   **Instant Element Inspector (Fitur Andalan):** Mekanisme *debugging* yang efisien di mana pengguna dapat mengklik elemen pada UI yang dirender untuk langsung melacak posisinya di baris kode sumber secara tepat.
*   **Isolated Iframe Sandbox:** Eksekusi kode yang aman dan terisolasi untuk memastikan stabilitas performa aplikasi utama saat merender proyek pengguna.

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
   git clone [https://github.com/haibanr/FrontEndForge.git](https://github.com/haibanr/FrontEndForge.git)

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
