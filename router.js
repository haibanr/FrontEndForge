// router.js
import { handleRouting } from './main.js';

/**
 * Mengubah URL tanpa memicu refresh halaman penuh.
 */
export function navigateTo(view, params = {}) {
    const url = new URL(window.location);
    url.searchParams.set('view', view);
    
    // Hapus parameter lama agar tidak bocor antar view
    if (view !== 'project') {
        url.searchParams.delete('id');
        url.searchParams.delete('mode');
    }

    // Masukkan parameter baru jika ada
    for (const key in params) {
        if (params[key]) {
            url.searchParams.set(key, params[key]);
        }
    }
    
    window.history.pushState({}, '', url);
    
    // Langsung eksekusi fungsi pengubah tampilan di main.js
    handleRouting();
}

/**
 * Mengambil informasi rute aktif saat ini dari URL.
 */
export function getRoute() {
    const params = new URLSearchParams(window.location.search);
    return {
        view: params.get('view') || 'dashboard',
        projectId: params.get('id'),
        mode: params.get('mode') || 'dariNol'
    };
}