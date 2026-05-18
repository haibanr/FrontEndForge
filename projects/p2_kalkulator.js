export const proyekKalkulator = {
    id: "p2-kalkulator",
    judul: "Kalkulator Penjumlahan Otomatis",
    kategori: ["JS"],
    tingkat: "Menengah",
    deskripsi: "Buatlah sistem kalkulator mini yang bisa menjumlahkan dua angka saat tombol hitung diklik.",
    materi: `
        <h3>📚 Manipulasi DOM & Event</h3>
        <p>Gunakan fungsi <code>Number()</code> untuk membungkus nilai input teks agar berubah menjadi tipe data Angka sebelum dijumlahkan.</p>
        <pre><code>let total = Number(in1.value) + Number(in2.value);</code></pre>
    `,
    instruksi: `
        <h3>🎯 Tugas Proyek:</h3>
        <ol>
            <li>Ambil nilai angka dari input <code>#angka1</code> dan <code>#angka2</code>.</li>
            <li>Jumlahkan lalu masukkan hasilnya ke teks element <code>#hasil</code>.</li>
            <li>Cetak ke console log dengan kata kunci <b>"Berhasil menghitung"</b> saat tombol diklik.</li>
        </ol>
    `,
    starterCode: {
        dariNol: {
            html: `<!-- Buat input #angka1, #angka2, button #btn-hitung, dan span #hasil dari nol -->\n`,
            css: `body { padding: 20px; font-family: sans-serif; }`,
            js: `// Mulai ketik kode logika JS dari awal\n`
        },
        pakeTemplate: {
            html: `<div class="box">\n  <input type="number" id="angka1" placeholder="0">\n  <span>+</span>\n  <input type="number" id="angka2" placeholder="0">\n  <button id="btn-hitung">Hitung</button>\n  <h3>Hasil: <span id="hasil">0</span></h3>\n</div>`,
            css: `body { padding: 30px; font-family: sans-serif; background: #f8fafc; }\n.box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; display: inline-block; }\ninput, button { padding: 6px; margin: 5px; }`,
            js: `// Elemen HTML & UI sudah disediakan. Fokus tulis logikanya di sini!\nconst btn = document.getElementById('btn-hitung');\nbtn.addEventListener('click', () => {\n  // Lanjutkan...\n});\n`
        }
    },
    // ... (bagian atas tetap sama) ...
    // starterCode: {
    //     // ... (starterCode tetap sama) ...
    // },
    kunciJawaban: {
        // 1. ISI HTML SOLUSI DENGAN TEMPLATE UTUH AGAR TIDAK KOSONG
        html: `<div class="box">\n  <input type="number" id="angka1" placeholder="0">\n  <span>+</span>\n  <input type="number" id="angka2" placeholder="0">\n  <button id="btn-hitung">Hitung</button>\n  <h3>Hasil: <span id="hasil">0</span></h3>\n</div>`,
        
        // 2. ISI CSS SOLUSI DENGAN STYLE TEMPLATE UTUH
        css: `body { padding: 30px; font-family: sans-serif; background: #f8fafc; }\n.box { background: white; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; display: inline-block; }\ninput, button { padding: 6px; margin: 5px; }`,
        
        // 3. JAGA-JAGA DENGAN MENAMBAHKAN CEK EVENT DOM DAN BLOKIFIKASI NULL
        js: `// Memastikan elemen DOM ter-render sempurna di dalam iframe sebelum memasang event\nconst btn = document.getElementById('btn-hitung');\n  if (btn) {\n    btn.addEventListener('click', () => {\n      const a1 = Number(document.getElementById('angka1').value) || 0;\n      const a2 = Number(document.getElementById('angka2').value) || 0;\n      document.getElementById('hasil').innerText = a1 + a2;\n      console.log("Berhasil menghitung: " + (a1 + a2));\n    });\n  }\n;`
    },
    validasi: function(htmlContent, cssContent, jsContent, logs) {
// ... (bagian validasi ke bawah tetap sama) ...
        const cekJsEvent = jsContent.includes('click') || jsContent.includes('addEventListener');
        const cekConsole = logs.some(log => log.toLowerCase().includes("berhasil menghitung"));

        return {
            sukses: cekJsEvent && cekConsole,
            pesanError: !cekJsEvent ? "Kamu belum memasang Event Listener 'click' pada tombol hitung." : 
                        !cekConsole ? "Kalkulator belum mencetak log 'Berhasil menghitung' ke console." : null
        };
    }
};