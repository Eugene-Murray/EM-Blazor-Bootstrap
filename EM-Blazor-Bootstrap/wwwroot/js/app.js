"use strict";
(function () {
    const STORAGE_KEY = 'em-theme';
    const BTN_ID = 'theme-toggle';
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        const btn = document.getElementById(BTN_ID);
        if (btn)
            btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    const saved = localStorage.getItem(STORAGE_KEY) ??
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(saved);
    window.toggleTheme = function () {
        const current = document.documentElement.getAttribute('data-bs-theme') ?? 'dark';
        applyTheme(current === 'dark' ? 'light' : 'dark');
    };
    document.addEventListener('DOMContentLoaded', function () {
        applyTheme(localStorage.getItem(STORAGE_KEY) ?? 'dark');
    });
    document.addEventListener('enhancedload', function () {
        applyTheme(localStorage.getItem(STORAGE_KEY) ?? 'dark');
    });
})();
