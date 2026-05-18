// main.js
import { getRoute, navigateTo } from './router.js';
import { initMonaco, updatePreview, htmlEditor } from './modules/editorCore.js';
import { semuaProyek } from './projects/projectRegistry.js';
import { renderDaftarProyek, muatProyekKeWorkspace, resetProyekAktif } from './modules/projectEngine.js';

// Dom Elemen Navigasi Utama
const dashboardView = document.getElementById('dashboard-view');
const editorView = document.getElementById('editor-view');
const btnPlayground = document.getElementById('btn-playground');
const btnProject = document.getElementById('btn-project');
const projectModal = document.getElementById('project-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const btnExitProject = document.getElementById('btn-exit-project');
const projectInstructionPanel = document.getElementById('project-instruction-panel');

// Dom Elemen Tab Console Log & Inspector
const tabBlueprintBtn = document.getElementById('tab-blueprint-btn');
const tabConsoleBtn = document.getElementById('tab-console-btn');
const tabBlueprintContent = document.getElementById('tab-blueprint-content');
const tabConsoleContent = document.getElementById('tab-console-content');
const consoleOutput = document.getElementById('console-output');
const clearConsoleBtn = document.getElementById('clear-console-btn');
const consoleBadge = document.getElementById('console-badge');
const inspectorContent = document.getElementById('inspector-content');

// State internal main
let logCount = 0;
let arrayLogsLengkap = [];

// --- A. DETEKTOR ROUTING UTAMA (ANTI RESET REFRESH) ---
export function handleRouting() {
    const route = getRoute();

    // Reset visibilitas dasar
    dashboardView.classList.add('hidden');
    editorView.classList.add('hidden');
    projectModal.classList.add('hidden');
    projectInstructionPanel.classList.add('hidden');

    if (route.view === 'dashboard') {
        dashboardView.classList.remove('hidden');
        resetProyekAktif();
    } 
    else if (route.view === 'playground') {
        editorView.classList.remove('hidden');
        resetProyekAktif();
        initMonaco();
        setTimeout(() => { updatePreview(); }, 50);
    } 
    else if (route.view === 'project') {
        editorView.classList.remove('hidden');
        const proyek = semuaProyek.find(p => p.id === route.projectId);
        if (proyek) {
            muatProyekKeWorkspace(proyek, route.mode);
        } else {
            navigateTo('dashboard');
        }
    }
}

// Daftarkan ke browser api event
window.addEventListener('load', handleRouting);
window.addEventListener('popstate', handleRouting);

// --- B. EVENT TOMBOL NAVIGASI ---
btnPlayground.addEventListener('click', () => navigateTo('playground'));
btnProject.addEventListener('click', () => {
    renderDaftarProyek();
    projectModal.classList.remove('hidden');
});
closeModalBtn.addEventListener('click', () => projectModal.classList.add('hidden'));

btnExitProject.addEventListener('click', () => {
    if (confirm("Apakah kamu yakin ingin keluar dari proyek ini? Progres koding belum disimpan.")) {
        navigateTo('dashboard');
    }
});

// --- C. MANAGEMENT TABS PANEL BAWAH ---
tabBlueprintBtn.addEventListener('click', () => {
    tabBlueprintBtn.classList.add('active');
    tabConsoleBtn.classList.remove('active');
    tabBlueprintContent.classList.remove('hidden');
    tabConsoleContent.classList.add('hidden');
    clearConsoleBtn.classList.add('hidden');
});

tabConsoleBtn.addEventListener('click', () => {
    tabConsoleBtn.classList.add('active');
    tabBlueprintBtn.classList.remove('active');
    tabConsoleContent.classList.remove('hidden');
    tabBlueprintContent.classList.add('hidden');
    clearConsoleBtn.classList.remove('hidden');
    logCount = 0;
    consoleBadge.classList.add('hidden');
});

clearConsoleBtn.addEventListener('click', () => {
    consoleOutput.innerHTML = `<p style="color: #64748b; font-style: italic;">Console cleared.</p>`;
    arrayLogsLengkap = [];
});

// --- D. MENANGKAP PESAN DATA DARI IFRAME PREVIEW ---
window.addEventListener('message', (event) => {
    if (!event.data) return;

    // Tangkap data Inspect Mode
    if (event.data.type === 'FORGE_INSPECT_DATA') {
        const info = event.data.data;
        inspectorContent.innerHTML = `
            <div class="inspect-grid">
                <div class="inspect-label">Tag Elemen</div><div class="inspect-value highlight-blue">&lt;${info.tagName}&gt;</div>
                <div class="inspect-label">ID (#)</div><div class="inspect-value highlight-blue">${info.id}</div>
                <div class="inspect-label">Class (.)</div><div class="inspect-value highlight-blue">${info.className}</div>
                <div class="inspect-label">Atribut Name</div><div class="inspect-value">${info.name}</div>
                <div class="inspect-label">Atribut Type</div><div class="inspect-value">${info.type}</div>
                <div class="inspect-label">Ukuran Elemen</div><div class="inspect-value highlight-green">${info.styles.size}</div>
                <div class="inspect-label">Teks & BG</div><div class="inspect-value" style="font-size: 0.8rem;">Color: ${info.styles.color} | BG: ${info.styles.background}</div>
                <div class="inspect-label">Padding</div><div class="inspect-value">${info.styles.padding}</div>
                <div class="inspect-label">Lokasi Baris</div><div class="inspect-value highlight-orange" id="jump-to-line" data-line="${info.line}">HTML Line: ${info.line} (Klik untuk lompat)</div>
            </div>
        `;
        document.getElementById('jump-to-line').addEventListener('click', function() {
            const targetLine = parseInt(this.getAttribute('data-line'));
            if (targetLine && htmlEditor) {
                htmlEditor.focus(); 
                htmlEditor.revealLine(targetLine); 
                htmlEditor.setPosition({ lineNumber: targetLine, column: 1 });
            }
        });
    }

    // Tangkap log console biasa dari user
    if (event.data.type === 'FORGE_CONSOLE_LOG') {
        arrayLogsLengkap.push(event.data.message);

        if (tabConsoleContent.classList.contains('hidden')) {
            logCount++;
            consoleBadge.textContent = logCount;
            consoleBadge.classList.remove('hidden');
        }
        
        const newLog = document.createElement('div');
        newLog.className = 'log-line log-default';
        newLog.textContent = `> ${event.data.message}`;
        consoleOutput.appendChild(newLog);
    }

    // Tangkap Runtime-Error dari JavaScript user
    if (event.data.type === 'FORGE_CONSOLE_ERROR') {
        arrayLogsLengkap.push(`ERROR: ${event.data.message}`);

        if (tabConsoleContent.classList.contains('hidden')) {
            logCount++;
            consoleBadge.textContent = logCount;
            consoleBadge.classList.remove('hidden');
        }

        const newLog = document.createElement('div');
        newLog.className = 'log-line log-error';
        newLog.textContent = `❌ Uncaught TypeError/SyntaxError: ${event.data.message}`;
        consoleOutput.appendChild(newLog);
    }
});