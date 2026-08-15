/* ==========================================================================
   معرض آية لتجارة السيارات - تبديل الوضع الداكن والفاتح (theme.js)
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'aya_car_theme';

  function playThemeToggleSound(theme) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (theme === 'light') {
        // نغمة صاعدة هادئة وفاخرة عند الانتقال للوضع النهاري
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
      } else {
        // نغمة دافئة هادئة عند الانتقال للوضع الليلي
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(330, now + 0.14);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.14);
      }
    } catch (err) {
      // التجاوز في حال تقييد الصوت من المتصفح
    }
  }

  function getPreferredTheme() {
    return localStorage.getItem(STORAGE_KEY) || 'dark';
  }

  function updateInputs(theme) {
    const isDark = theme === 'dark';
    const inputs = document.querySelectorAll('.theme-toggle-input, #theme-toggle');
    inputs.forEach((input) => {
      if (input.type === 'checkbox') {
        input.checked = isDark;
      }
    });
  }

  function setTheme(theme, playSound = false) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateInputs(theme);
    if (playSound) {
      playThemeToggleSound(theme);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = getPreferredTheme();
    setTheme(currentTheme, false);

    // الاستماع لتغيير المفتاح الإلكتروني
    document.addEventListener('change', (e) => {
      if (e.target && (e.target.classList.contains('theme-toggle-input') || e.target.id === 'theme-toggle')) {
        const newTheme = e.target.checked ? 'dark' : 'light';
        setTheme(newTheme, true);
      }
    });

    // دعم الضغط المباشر
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.theme-toggle-btn');
      if (btn && !btn.querySelector('input')) {
        e.preventDefault();
        const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = activeTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme, true);
      }
    });
  });
})();
