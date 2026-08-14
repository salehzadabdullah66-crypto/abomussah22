/* ==========================================================================
   معرض آية لتجارة السيارات - تفاعلات وحركات صفحة الأسئلة الشائعة (FAQ Interactive)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
  initFaqSearch();
  initFaqCategoryFilter();
});

/**
 * 1. الأكورديون التفاعلي المرن (Accordion Expand/Collapse)
 */
function initFaqAccordion() {
  const headers = document.querySelectorAll('.accordion-header');
  
  headers.forEach(header => {
    if (header.dataset.accordionBound) return;
    header.dataset.accordionBound = "true";

    header.addEventListener('click', (e) => {
      e.preventDefault();
      const item = header.closest('.accordion-item');
      if (!item) return;
      const isOpen = item.classList.contains('active');
      
      // إغلاق باقي الأسئلة لتركيز تجربة المستخدم
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // فتح أو إغلاق السؤال الحالي
      if (!isOpen) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * 2. البحث الفوري اللحظي في الأسئلة الشائعة (Live Instant FAQ Search)
 */
function initFaqSearch() {
  const searchInput = document.getElementById('faq-search-input');
  const items = document.querySelectorAll('.accordion-item');
  const noResults = document.getElementById('faq-no-results');

  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    let matchesCount = 0;

    items.forEach(item => {
      const headerText = item.querySelector('.accordion-header span').textContent.toLowerCase();
      const contentText = item.querySelector('.accordion-content').textContent.toLowerCase();
      
      if (headerText.includes(query) || contentText.includes(query)) {
        item.style.display = 'block';
        item.style.animation = 'fadeInUp 0.4s ease';
        matchesCount++;

        // فتح السؤال تلقائياً إذا كان هناك بحث دقيق
        if (query.length > 2) {
          item.classList.add('active');
        }
      } else {
        item.style.display = 'none';
        item.classList.remove('active');
      }
    });

    if (noResults) {
      noResults.style.display = matchesCount === 0 ? 'block' : 'none';
    }
  });
}

/**
 * 3. تصفية الأسئلة حسب القسم (Category Tab Filtering)
 */
function initFaqCategoryFilter() {
  const tabs = document.querySelectorAll('.faq-tab-btn');
  const items = document.querySelectorAll('.accordion-item');
  const searchInput = document.getElementById('faq-search-input');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      if (searchInput) searchInput.value = '';

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease';
        } else {
          item.style.display = 'none';
          item.classList.remove('active');
        }
      });
    });
  });
}
