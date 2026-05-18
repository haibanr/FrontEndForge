import { defineConfig } from 'vite';
import monacoEditorPlugin from 'vite-plugin-monaco-editor';

// Mengatasi masalah ketidakcocokan ekspor CommonJS vs ESM secara aman
const monacoPlugin = typeof monacoEditorPlugin === 'function' 
    ? monacoEditorPlugin 
    : (monacoEditorPlugin.default || monacoEditorPlugin);

export default defineConfig({
    plugins: [
        monacoPlugin({
            // Memastikan worker untuk HTML, CSS, dan JS saja yang dibuat agar build tetap ringan
            languages: ['html', 'css', 'javascript']
        })
    ]
});