// modules/editorCore.js
import * as monaco from 'monaco-editor';

export let htmlEditor, cssEditor, jsEditor;
export let isInspectMode = false;

const previewWindow = document.getElementById('preview-window');
const toggleInspectBtn = document.getElementById('toggle-inspect');
const inspectorContent = document.getElementById('inspector-content');
const tabBlueprintBtn = document.getElementById('tab-blueprint-btn');
const consoleOutput = document.getElementById('console-output');

// --- POTONGAN KODE PADA modules/editorCore.js ---
export function initMonaco(initValues = null) {
    const defaultValues = {
        html: `<div id="kotak-utama" class="box-style">\n  <h1>Selamat Datang Pembuat!</h1>\n  <p>Buka Tab <b>📟 Console Log</b> di bawah, lalu klik tombol ini.</p>\n  <button id="btn-tes" type="button">Klik & Cetak Log</button>\n</div>`,
        css: `body { padding: 10px; font-family: sans-serif; background: #fafafa; }\n.box-style { padding: 20px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; }\nh1 { color: #0ea5e9; margin-bottom: 8px; }\nbutton { background: #0ea5e9; color: white; border: none; padding: 10px 15px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 15px; }`,
        js: `console.log("Mesin FrontEndForge berhasil dinyalakan!");\n\nconst tombol = document.getElementById('btn-tes');\ntombol.addEventListener('click', () => {\n  console.log("Tombol berhasil diklik pada jam: " + new Date().toLocaleTimeString());\n});`
    };

    // JIKA ada initValues dari proyek, gunakan itu. Jika tidak, pakai default playground.
    const finalValues = initValues || defaultValues;

    if (!htmlEditor) {
        // Jika editor belum ada, buat baru dengan nilai finalValues
        htmlEditor = monaco.editor.create(document.getElementById('html-monaco'), {
            value: finalValues.html, language: 'html', theme: 'vs-dark', automaticLayout: true, minimap: { enabled: false }
        });
        cssEditor = monaco.editor.create(document.getElementById('css-monaco'), {
            value: finalValues.css, language: 'css', theme: 'vs-dark', automaticLayout: true, minimap: { enabled: false }
        });
        jsEditor = monaco.editor.create(document.getElementById('js-monaco'), {
            value: finalValues.js, language: 'javascript', theme: 'vs-dark', automaticLayout: true, minimap: { enabled: false }
        });

        htmlEditor.onDidChangeModelContent(() => { updatePreview(); });
        cssEditor.onDidChangeModelContent(() => { updatePreview(); });
        jsEditor.onDidChangeModelContent(() => { 
            consoleOutput.innerHTML = ""; 
            updatePreview(); 
        });
    } else {
        // JIKA EDITOR SUDAH ADA, langsung paksa ganti isinya dengan nilai proyek baru!
        htmlEditor.setValue(finalValues.html);
        cssEditor.setValue(finalValues.css);
        jsEditor.setValue(finalValues.js);
    }
    
    // Jalankan preview setelah sinkronisasi internal Monaco selesai
    setTimeout(() => { updatePreview(); }, 150);
}

function injectLineNumbers(htmlString) {
    const lines = htmlString.split('\n');
    return lines.map((line, index) => {
        const lineNumber = index + 1;
        return line.replace(/<([a-zA-Z0-9-]+)(?=[^>]*\s|>)/g, `<$1 data-forge-line="${lineNumber}"`);
    }).join('\n');
}

export function updatePreview() {
    if (!previewWindow || !htmlEditor) return;

    const rawHtml = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();
    const htmlWithLines = injectLineNumbers(rawHtml);

    const inspectorScript = `
        <script>
            (function() {
                const isInspectActive = ${isInspectMode};
                if (isInspectActive) {
                    document.body.style.cursor = 'pointer';
                    let currentTarget = null;
                    document.addEventListener('mouseover', (e) => {
                        currentTarget = e.target;
                        currentTarget.style.outline = '2px dashed #0ea5e9';
                        currentTarget.style.outlineOffset = '-2px';
                    });
                    document.addEventListener('mouseout', (e) => {
                        if (currentTarget) currentTarget.style.outline = 'none';
                    });
                    document.addEventListener('click', (e) => {
                        e.preventDefault(); e.stopPropagation();
                        const el = e.target;
                        const computedStyle = window.getComputedStyle(el);
                        let lineLocation = el.getAttribute('data-forge-line');
                        if (el.tagName.toLowerCase() === 'body' && !lineLocation) lineLocation = "1";
                        
                        const elementBlueprint = {
                            tagName: el.tagName.toLowerCase(), id: el.id ? '#' + el.id : 'Tidak ada',
                            className: el.className ? '.' + Array.from(el.classList).filter(c => !c.startsWith('data-forge')).join('.') : 'Tidak ada',
                            name: el.getAttribute('name') || 'Tidak ada', type: el.getAttribute('type') || 'Tidak ada',
                            line: lineLocation || '1',
                            styles: { size: el.offsetWidth + 'px × ' + el.offsetHeight + 'px', color: computedStyle.color, background: computedStyle.backgroundColor, padding: computedStyle.padding }
                        };
                        window.parent.postMessage({ type: 'FORGE_INSPECT_DATA', data: elementBlueprint }, '*');
                    });
                }
            })();
        <\/script>
    `;

    const consoleInterceptorScript = `
        <script>
            (function() {
                const originalLog = console.log;
                console.log = function(...args) {
                    originalLog.apply(console, args);
                    const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg).join(' ');
                    window.parent.postMessage({ type: 'FORGE_CONSOLE_LOG', message: message }, '*');
                };

                window.onerror = function(message, source, lineno, colno, error) {
                    window.parent.postMessage({ type: 'FORGE_CONSOLE_ERROR', message: message }, '*');
                    return false;
                };
            })();
        <\/script>
    `;

    const pureUserDoc = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                html { background-color: #ffffff; min-height: 100vh; }
                body { min-height: 100vh; margin: 0; }
                ${css}
            </style>
        </head>
        <body>
            ${htmlWithLines}
        </body>
        </html>
    `;

    previewWindow.srcdoc = pureUserDoc;

    previewWindow.onload = () => {
        const iframeDoc = previewWindow.contentDocument || previewWindow.contentWindow.document;
        
        const patchScript = iframeDoc.createElement('script');
        patchScript.textContent = consoleInterceptorScript.replace(/<script>|<\/script>/g, '');
        iframeDoc.body.appendChild(patchScript);

        const userScript = iframeDoc.createElement('script');
        userScript.textContent = `try { ${js} } catch(err) { console.error(err); window.parent.postMessage({ type: 'FORGE_CONSOLE_ERROR', message: err.message }, '*'); }`;
        iframeDoc.body.appendChild(userScript);

        const sysScript = iframeDoc.createElement('script');
        sysScript.textContent = inspectorScript.replace(/<script>|<\/script>/g, '');
        iframeDoc.body.appendChild(sysScript);
    };
}

// Inisialisasi Event Toggle Inspect
if (toggleInspectBtn) {
    toggleInspectBtn.addEventListener('click', () => {
        isInspectMode = !isInspectMode;
        if (isInspectMode) {
            toggleInspectBtn.textContent = "🎯 INSPECT MODE: ACTIVE";
            toggleInspectBtn.classList.add('active');
            tabBlueprintBtn.click();
        } else {
            toggleInspectBtn.textContent = "🔍 INSPECT MODE: OFF";
            toggleInspectBtn.classList.remove('active');
            inspectorContent.innerHTML = `<p style="color: #64748b; font-style: italic;">Inspect Mode dinonaktifkan.</p>`;
        }
        updatePreview();
    });
}