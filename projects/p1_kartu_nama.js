export const proyekKartuNama = {
    id: "p1-kartu-nama",
    judul: "Membuat Kartu Nama Digital",
    kategori: ["HTML", "CSS"],
    tingkat: "Pemula",
    deskripsi: "Rancang komponen kartu profil yang rapi menggunakan tag semantik HTML dan styling border radius CSS.",
    materi: `
        <h3>📚 CSS Border & Radius</h3>
        <p>Gunakan <code>border-radius</code> untuk membuat sudut melengkung. Untuk membuat lingkaran sempurna, set nilainya ke <code>50%</code>.</p>
        <p>Gunakan ID <code>#kartu</code> sebagai pembungkus utama profil kamu.</p>
    `,
    instruksi: `
        <h3>🎯 Tugas Proyek:</h3>
        <ol>
            <li>Buat sebuah pembungkus &lt;div&gt; dengan <b>id="kartu"</b>.</li>
            <li>Di dalam CSS, set background-color <code>#kartu</code> menjadi <b>gelap ("#2d3748")</b>.</li>
            <li>Berikan sudut melengkung pada kartu dengan <code>border-radius: 10px</code>.</li>
        </ol>
    `,
    starterCode: {
        dariNol: {
            html: `<!-- Mulai coding kartu nama digitalmu di sini -->\n`,
            css: `body { background: #f0f2f5; display: flex; justify-content: center; align-items: center; height: 100vh; }\n`,
            js: `// Proyek HTML-CSS murni. Tidak wajib menulis JavaScript.\n`
        }
    },
    kunciJawaban: {
        html: `<div id="kartu">\n  <h2>Budi Dev</h2>\n  <p>Front-End Engineer</p>\n</div>`,
        css: `#kartu {\n  background-color: #2d3748;\n  color: white;\n  padding: 20px;\n  border-radius: 10px;\n  text-align: center;\n}`,
        js: ``
    },
    validasi: function(htmlContent, cssContent, jsContent, logs) {
        const cekHtml = htmlContent.includes('id="kartu"');
        const cleanCss = cssContent.replace(/\s/g, '').toLowerCase();
        const cekBg = cleanCss.includes('background-color:#2d3748') || cleanCss.includes('background:#2d3748');
        const cekRadius = cleanCss.includes('border-radius:10px');

        return {
            sukses: cekHtml && cekBg && cekRadius,
            pesanError: !cekHtml ? "Kamu belum membuat elemen div dengan id='kartu'." :
                        !cekBg ? "Warna background id #kartu belum diset ke #2d3748." :
                        !cekRadius ? "Sudut melengkung border-radius: 10px belum terpasang." : null
        };
    }
};