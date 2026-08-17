/* ==========================================================================
   معرض آية لتجارة السيارات - قائمة التنقل والهيدر الثابت (menu.js)
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.querySelector('.main-header');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const mobileOverlay = document.querySelector('.mobile-drawer-overlay');
    const mobileCloseBtn = document.querySelector('.mobile-drawer-close');

    // 1. تثبيت الهيدر وتغيير الخلفية عند السكرول
    function handleScroll() {
      if (!mainHeader) return;
      if (window.scrollY > 40) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // تشغيل أولي

    // 2. تفعيل الرابط الحالي حسب اسم الصفحة
    function setActiveNavLink() {
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

      navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        const hrefPage = href.split('?')[0];
        if (hrefPage === currentPath || (currentPath === '' && hrefPage === 'index.html')) {
          if (!link.classList.contains('dropdown-item-link') && !link.classList.contains('mobile-sub-link')) {
            link.classList.add('active');
          }
        } else {
          link.classList.remove('active');
        }
      });
    }

    setActiveNavLink();

    // 3. التحكم بقائمة الجوال Drawer
    function openMobileDrawer() {
      if (mobileDrawer) mobileDrawer.classList.add('active');
      if (mobileOverlay) mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
      if (mobileDrawer) mobileDrawer.classList.remove('active');
      if (mobileOverlay) mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileDrawer);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileDrawer);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileDrawer);
  });
})();
