/* ==========================================================================
   معرض آية لتجارة السيارات - البحث المباشر في كتالوج السيارات (search.js)
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-car-input');
    const carCards = document.querySelectorAll('.cars-grid .car-card');
    const noResultsMsg = document.getElementById('no-cars-found');

    if (!searchInput || !carCards.length) return;

    searchInput.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      let visibleCount = 0;

      carCards.forEach((card) => {
        const title = (card.querySelector('.car-title')?.textContent || '').toLowerCase();
        const brand = (card.querySelector('.car-brand-model')?.textContent || '').toLowerCase();
        const specs = (card.querySelector('.car-specs-grid')?.textContent || '').toLowerCase();

        if (title.includes(query) || brand.includes(query) || specs.includes(query)) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResultsMsg) {
        noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  });
})();
