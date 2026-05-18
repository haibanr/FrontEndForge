// modules/projectEngine.js
import { semuaProyek } from '../projects/projectRegistry.js';
import { initMonaco, updatePreview, htmlEditor, cssEditor, jsEditor } from './editorCore.js';
import { navigateTo } from '../router.js';

const projectModal = document.getElementById('project-modal');
const projectListContainer = document.getElementById('project-list-container');
const projectInstructionPanel = document.getElementById('project-instruction-panel');
const panelProjectTitle = document.getElementById('panel-project-title');
const panelProjectMateri = document.getElementById('panel-project-materi');
const panelProjectInstruksi = document.getElementById('panel-project-instruksi');
const consoleOutput = document.getElementById('console-output');

const btnCheckAnswer = document.getElementById('btn-check-answer');
const btnShowSolution = document.getElementById('btn-show-solution');

export let proyekAktif = null;
let arrayLogsInternalRef = null; 

export function setLogsReference(arrayLogs) {
    arrayLogsInternalRef = arrayLogs;
}

export function renderDaftarProyek() {
    projectListContainer.innerHTML = "";
    semuaProyek.forEach((proyek) => {
        const itemHtml = document.createElement('div');
        itemHtml.className = 'project-list-item';
        const tags = proyek.kategori.map(kat => {
            const classTag = kat.toLowerCase() === 'js' ? 'tag-js' : 'tag-html-css';
            return `<span class="tag ${classTag}">${kat}</span>`;
        }).join(' ');

        itemHtml.innerHTML = `
            <div class="project-info" style="flex:1;">
                <h4>${proyek.judul} <span style="font-size:0.75rem; color:#38bdf8;">(${proyek.tingkat})</span></h4>
                <p>${proyek.deskripsi}</p>
                <div class="tag-container">${tags}</div>
            </div>
            <div id="action-area-${proyek.id}" style="width: 200px;">
                <button class="card-btn load-proj-btn" data-id="${proyek.id}">Pilih Proyek</button>
            </div>
        `;
        projectListContainer.appendChild(itemHtml);
    });

    document.querySelectorAll('.load-proj-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idTerpilih = e.target.getAttribute('data-id');
            const targetProyek = semuaProyek.find(p => p.id === idTerpilih);
            tampilkanOpsiModeMengoding(targetProyek);
        });
    });
}

// --- POTONGAN KODE PADA modules/projectEngine.js ---
function tampilkanOpsiModeMengoding(proyek) {
    const areaAksi = document.getElementById(`action-area-${proyek.id}`);
    if (proyek.kategori.includes("JS") && proyek.starterCode.pakeTemplate) {
        areaAksi.innerHTML = `
            <div class="mode-options-box" style="margin-top: 10px;">
                <button class="opt-btn btn-launch-proj" data-mode="dariNol">🛠️ <b>Dari Nol</b> (Kosong)</button>
                <button class="opt-btn btn-launch-proj" data-mode="pakeTemplate">📟 <b>Pakai Template</b> (UI Siap)</button>
            </div>
        `;
        areaAksi.querySelectorAll('.btn-launch-proj').forEach(optBtn => {
            optBtn.addEventListener('click', (e) => {
                const modePilihan = e.currentTarget.getAttribute('data-mode');
                // Alihkan pemicu lewat Router dengan membawa data mode secara eksplisit
                navigateTo('project', { id: proyek.id, mode: modePilihan });
            });
        });
    } else {
        // Jika proyek biasa tanpa template, langsung arahkan ke mode dariNol
        navigateTo('project', { id: proyek.id, mode: 'dariNol' });
    }
}

export function muatProyekKeWorkspace(proyek, modeMengoding) {
    proyekAktif = proyek;
    projectModal.classList.add('hidden');
    projectInstructionPanel.classList.remove('hidden');

    panelProjectTitle.textContent = proyek.judul;
    panelProjectMateri.innerHTML = proyek.materi;
    panelProjectInstruksi.innerHTML = proyek.instruksi;

    consoleOutput.innerHTML = `<p style="color: #64748b; font-style: italic;">Memulai misi baru...</p>`;
    
    const starterTerpilih = proyek.starterCode[modeMengoding];
    initMonaco(starterTerpilih); // Memperbaiki typo starterTerpイル otomatis
    setTimeout(() => { updatePreview(); }, 80);
}

export function resetProyekAktif() {
    proyekAktif = null;
}

// Event Listener Validasi & Solusi
btnCheckAnswer.addEventListener('click', () => {
    if (!proyekAktif) return;
    const hasilUji = proyekAktif.validasi(htmlEditor.getValue(), cssEditor.getValue(), jsEditor.getValue(), arrayLogsInternalRef || []);
    if (hasilUji.sukses) {
        alert(`🎉 LUAR BIASA! \nSelamat, kamu berhasil menyelesaikan tantangan "${proyekAktif.judul}" dengan sempurna! 🔥`);
    } else {
        alert(`❌ TETOT! KODE BELUM BENAR \n\nKoreksi: \n${hasilUji.pesanError || hasilUji.errorHtml || hasilUji.errorCss || hasilUji.errorJs || "Periksa kembali instruksi tugas kamu."}`);
    }
});

btnShowSolution.addEventListener('click', () => {
    if (!proyekAktif) return;
    if (confirm("Ingin melihat solusi pengerjaan yang benar? Ini akan menimpa kode yang sedang kamu ketik saat ini.")) {
        htmlEditor.setValue(proyekAktif.kunciJawaban.html);
        cssEditor.setValue(proyekAktif.kunciJawaban.css);
        jsEditor.setValue(proyekAktif.kunciJawaban.js);
        document.getElementById('tab-console-btn').click();
        setTimeout(() => { updatePreview(); }, 50);
    }
});