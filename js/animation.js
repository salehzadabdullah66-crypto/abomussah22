/* ==========================================================================
   معرض آية لتجارة السيارات - المؤثرات الحركية والأرقام التفاعلية (animation.js)
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. تحريك الأرقام والإحصائيات Animated Counters
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateCounters() {
      if (animated) return;

      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target')) || 0;
        const isEn = document.documentElement.getAttribute('lang') === 'en';
        const suffix = (isEn && counter.hasAttribute('data-suffix-en'))
          ? counter.getAttribute('data-suffix-en')
          : (counter.getAttribute('data-suffix') || '');
        let count = 0;
        const duration = 2000; // 2 seconds
        const stepTime = 30;
        const increment = Math.ceil(target / (duration / stepTime));

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            count = target;
            clearInterval(timer);
          }
          const curEn = document.documentElement.getAttribute('lang') === 'en';
          const curSuffix = (curEn && counter.hasAttribute('data-suffix-en'))
            ? counter.getAttribute('data-suffix-en')
            : (counter.getAttribute('data-suffix') || '');
          counter.innerHTML = `${count}<span>${curSuffix}</span>`;
        }, stepTime);
      });

      animated = true;
    }

    const statsSection = document.querySelector('.stats-section');
    if (statsSection && 'IntersectionObserver' in window) {
      const statsObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animateCounters();
            statsObserver.unobserve(statsSection);
          }
        },
        { threshold: 0.3 }
      );
      statsObserver.observe(statsSection);
    } else {
      animateCounters();
    }
  });
})();
