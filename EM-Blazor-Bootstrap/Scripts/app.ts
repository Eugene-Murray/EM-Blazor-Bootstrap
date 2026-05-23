(function () {
    const STORAGE_KEY = 'em-theme';
    const BTN_ID = 'theme-toggle';

    function applyTheme(theme: string): void {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        const btn = document.getElementById(BTN_ID);
        if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // Apply saved/preferred theme immediately before first paint
    const saved: string =
        localStorage.getItem(STORAGE_KEY) ??
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(saved);

    (window as any).toggleTheme = function (): void {
        const current = document.documentElement.getAttribute('data-bs-theme') ?? 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    };

    // Sync button icon once DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        applyTheme(localStorage.getItem(STORAGE_KEY) ?? 'dark');
    });

    // Re-apply after every Blazor enhanced navigation (prevents the server-
    // rendered <html> attribute merge from stripping data-bs-theme)
    document.addEventListener('enhancedload', function () {
        applyTheme(localStorage.getItem(STORAGE_KEY) ?? 'dark');
    });
})();
