/* ==========================================================================
   معرض آية لتجارة السيارات - تصفية وفلترة كتالوج السيارات (filter.js)
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.getElementById('filter-category');
    const brandFilter = document.getElementById('filter-brand');
    const yearFilter = document.getElementById('filter-year');
    const priceFilter = document.getElementById('filter-price');
    const categoryTabs = document.querySelectorAll('.car-category-tab');
    const carCards = document.querySelectorAll('.cars-grid .car-card');
    const noResultsMsg = document.getElementById('no-cars-found');

    if (!carCards.length) return;

    // فحص البارامترات في رابط الصفحة (مثال: cars.html?category=used)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categoryFilter) {
      categoryFilter.value = categoryParam;
    }

    function applyFilters() {
      const selectedCategory = categoryFilter ? categoryFilter.value.toLowerCase() : 'all';
      const selectedBrand = brandFilter ? brandFilter.value.toLowerCase() : 'all';
      const selectedYear = yearFilter ? yearFilter.value : 'all';
      const selectedPrice = priceFilter ? parseInt(priceFilter.value) || Infinity : Infinity;

      let visibleCount = 0;

      carCards.forEach((card) => {
        const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();
        const cardBrand = (card.getAttribute('data-brand') || '').toLowerCase();
        const cardYear = card.getAttribute('data-year') || '';
        const cardPrice = parseInt(card.getAttribute('data-price')) || 0;

        let matchCategory = false;
        if (selectedCategory === 'all') {
          // إخفاء السيارات المستعملة والبيك آب من العرض العام وإظهارها فقط عند الدخول لقائمتها المخصصة
          matchCategory = cardCategory !== 'used' && cardCategory !== 'pickup';
        } else {
          matchCategory = cardCategory === selectedCategory;
        }

        const matchBrand = selectedBrand === 'all' || cardBrand === selectedBrand;
        const matchYear = selectedYear === 'all' || cardYear === selectedYear;
        const matchPrice = selectedPrice === Infinity || cardPrice <= selectedPrice;

        if (matchCategory && matchBrand && matchYear && matchPrice) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // مزامنة التبويبات النشطة (Sync Category Tabs Active State)
      if (categoryTabs.length) {
        categoryTabs.forEach((tab) => {
          const tabCat = (tab.getAttribute('data-category') || '').toLowerCase();
          if (tabCat === selectedCategory) {
            tab.classList.add('active');
          } else {
            tab.classList.remove('active');
          }
        });
      }

      if (noResultsMsg) {
        noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (brandFilter) brandFilter.addEventListener('change', applyFilters);
    if (yearFilter) yearFilter.addEventListener('change', applyFilters);
    if (priceFilter) priceFilter.addEventListener('change', applyFilters);

    // تطبيق التصفية الأولية عند تحميل الصفحة
    applyFilters();

    // ربط نقر التبويبات العلوية مع الفلترة
    if (categoryTabs.length) {
      categoryTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
          const category = tab.getAttribute('data-category');
          if (categoryFilter) {
            categoryFilter.value = category;
          }
          applyFilters();
        });
      });
    }

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
        else if (nameText.includes('toyota')) targetBrand = 'toyota';
        else if (nameText.includes('ford')) targetBrand = 'ford';
        else if (nameText.includes('gmc')) targetBrand = 'gmc';
        else if (nameText.includes('isuzu')) targetBrand = 'isuzu';
        else if (nameText.includes('hyundai')) targetBrand = 'hyundai';
        else if (nameText.includes('kia')) targetBrand = 'kia';

        if (brandFilter && targetBrand !== 'all') {
          brandFilter.value = targetBrand;
          applyFilters();
          document.querySelector('.filter-toolbar')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  });
})();

