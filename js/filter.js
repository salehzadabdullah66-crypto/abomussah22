/* ==========================================================================
   معرض آية لتجارة السيارات - تصفية وفلترة كتالوج السيارات (filter.js)
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const brandFilter = document.getElementById('filter-brand');
    const yearFilter = document.getElementById('filter-year');
    const priceFilter = document.getElementById('filter-price');
    const carCards = document.querySelectorAll('.cars-grid .car-card');
    const noResultsMsg = document.getElementById('no-cars-found');

    if (!carCards.length) return;

    function applyFilters() {
      const selectedBrand = brandFilter ? brandFilter.value.toLowerCase() : 'all';
      const selectedYear = yearFilter ? yearFilter.value : 'all';
      const selectedPrice = priceFilter ? parseInt(priceFilter.value) || Infinity : Infinity;

      let visibleCount = 0;

      carCards.forEach((card) => {
        const cardBrand = (card.getAttribute('data-brand') || '').toLowerCase();
        const cardYear = card.getAttribute('data-year') || '';
        const cardPrice = parseInt(card.getAttribute('data-price')) || 0;

        const matchBrand = selectedBrand === 'all' || cardBrand === selectedBrand;
        const matchYear = selectedYear === 'all' || cardYear === selectedYear;
        const matchPrice = selectedPrice === Infinity || cardPrice <= selectedPrice;

        if (matchBrand && matchYear && matchPrice) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResultsMsg) {
        if (visibleCount === 0) {
          noResultsMsg.style.display = 'block';
        } else {
          noResultsMsg.style.display = 'none';
        }
      }
    }

    if (brandFilter) brandFilter.addEventListener('change', applyFilters);
    if (yearFilter) yearFilter.addEventListener('change', applyFilters);
    if (priceFilter) priceFilter.addEventListener('change', applyFilters);

    // ربط النقر على بطاقات شريط الماركات الفاخرة للفلترة المباشرة
    const marqueeCards = document.querySelectorAll('.brand-marquee-card');
    marqueeCards.forEach((mCard) => {
      mCard.addEventListener('click', () => {
        const nameText = (mCard.querySelector('.brand-name')?.textContent || '').toLowerCase();
        let targetBrand = 'all';

        if (nameText.includes('mercedes')) targetBrand = 'mercedes';
        else if (nameText.includes('bmw')) targetBrand = 'bmw';
        else if (nameText.includes('porsche')) targetBrand = 'porsche';
        else if (nameText.includes('range') || nameText.includes('land')) targetBrand = 'landrover';
        else if (nameText.includes('audi')) targetBrand = 'audi';
        else if (nameText.includes('lamborghini')) targetBrand = 'lamborghini';
        else if (nameText.includes('lexus')) targetBrand = 'lexus';
        else if (nameText.includes('rolls')) targetBrand = 'rollsroyce';

        if (brandFilter && targetBrand !== 'all') {
          brandFilter.value = targetBrand;
          applyFilters();
          document.querySelector('.filter-toolbar')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  });
})();
