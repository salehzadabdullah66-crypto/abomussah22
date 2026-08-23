/* ==========================================================================
   معرض آية لتجارة السيارات - مكون الفوتر الموحد (js/footer.js)
   يربط كافة تبويبات وأقسام المشروع الـ 10 ديناميكياً مع تحديد التبويب النشط
   ========================================================================== */

(function () {
  'use strict';

  // جميع تبويبات وأقسام المشروع الـ 10
  const projectTabs = [
    { href: 'index.html', title: 'الرئيسية', icon: 'fas fa-home', group: 'primary' },
    { href: 'about.html', title: 'من نحن', icon: 'fas fa-user-shield', group: 'primary' },
    { href: 'cars.html', title: 'معرض السيارات', icon: 'fas fa-car', group: 'primary' },
    { href: 'offers.html', title: 'العروض الحصرية', icon: 'fas fa-tags', group: 'primary' },
    { href: 'services.html', title: 'خدماتنا المميزة', icon: 'fas fa-concierge-bell', group: 'primary' },
    { href: 'financing.html', title: 'التمويل والتقسيط', icon: 'fas fa-calculator', group: 'secondary' },
    { href: 'gallery.html', title: 'ألبوم الصور', icon: 'fas fa-images', group: 'secondary' },
    { href: 'testimonials.html', title: 'آراء العملاء', icon: 'fas fa-star', group: 'secondary' },
    { href: 'faq.html', title: 'الأسئلة الشائعة', icon: 'fas fa-question-circle', group: 'secondary' },
    { href: 'contact.html', title: 'تواصل معنا', icon: 'fas fa-paper-plane', group: 'secondary' }
  ];

  function getFooterHTML(activePage) {
    const primaryLinksHTML = projectTabs
      .filter(function(tab) { return tab.group === 'primary'; })
      .map(function(tab) {
        var isActive = activePage === tab.href ? ' active' : '';
        return '<li class="footer-link-item"><a href="' + tab.href + '" class="' + isActive + '"><i class="fas fa-chevron-left"></i> ' + tab.title + '</a></li>';
      })
      .join('');

    const secondaryLinksHTML = projectTabs
      .filter(function(tab) { return tab.group === 'secondary'; })
      .map(function(tab) {
        var isActive = activePage === tab.href ? ' active' : '';
        return '<li class="footer-link-item"><a href="' + tab.href + '" class="' + isActive + '"><i class="fas fa-chevron-left"></i> ' + tab.title + '</a></li>';
      })
      .join('');

    return `
    <div class="container">
      <div class="footer-grid">
        <!-- التعريف بالمعرض -->
        <div class="footer-col-about">
          <div class="footer-logo">
            <div class="logo-img-wrap" style="width:48px;height:48px;">
              <img src="img/logo.png" alt="شعار معرض آية" class="logo-img">
            </div>
            <span class="logo-title">معرض <span>آية</span></span>
          </div>
          <p class="footer-about-text">
            معرض آية لتجارة السيارات - الإسم الأبرز في عالم الفخامة والسيارات الحديثة. نحرص دائماً على تقديم التميز وأفضل الأسعار لعملائنا الكرام برعاية وإشراف مالك الشركة أبو موسى.
          </p>
          <div class="footer-tagline-box">
            <i class="fas fa-quote-right"></i> "أبو موسى لديكم لا خوف عليكم"
          </div>
        </div>

        <!-- التبويبات الرئيسية (5 تبويبات) -->
        <div>
          <h4 class="footer-title">روابط التصفح الرئيسية</h4>
          <ul class="footer-links">
            ${primaryLinksHTML}
          </ul>
        </div>

        <!-- أقسام المعرض والخدمات (5 تبويبات) -->
        <div>
          <h4 class="footer-title">أقسام المعرض</h4>
          <ul class="footer-links">
            ${secondaryLinksHTML}
          </ul>
        </div>

        <!-- معلومات التواصل والشبكات الاجتماعية -->
        <div>
          <h4 class="footer-title">تواصل معنا</h4>
          <div class="footer-contact-list">
            <div class="footer-contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <span>موقع شركة آية لتجارة السيارات - دخولية مدينة الباب - دوار سوق الهال</span>
            </div>
            <div class="footer-contact-item">
              <i class="fab fa-whatsapp" style="color:#25D366;"></i>
              <a href="https://wa.me/963959124771" target="_blank" rel="noopener">محادثة واتساب مباشرة</a>
            </div>
            <div class="footer-contact-item">
              <i class="fas fa-envelope"></i>
              <a href="mailto:aya.soccial@gmail.com">aya.soccial@gmail.com</a>
            </div>
          </div>
          <div class="social-links">
            <a href="https://www.facebook.com/share/1CwdWBheX4/" target="_blank" rel="noopener" class="social-btn" title="صفحة الفيسبوك الرسمية"><i class="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/aboomousaa?igsh=MW90emp2eDJkNTlpcw==" target="_blank" rel="noopener" class="social-btn" title="حساب الانستغرام الرسمي"><i class="fab fa-instagram"></i></a>
            <a href="https://wa.me/963959124771" target="_blank" rel="noopener" class="social-btn" title="حساب الواتساب الرسمي"><i class="fab fa-whatsapp"></i></a>
            <a href="https://www.tiktok.com/@abmosa123?_r=1&_t=ZS-96vhLokNh36" target="_blank" rel="noopener" class="social-btn" title="حساب التيك توك الرسمي"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>
    </div>

    <!-- شريط حقوق الملكية السفلي -->
    <div class="footer-bottom">
      <div class="container">
        <p>جميع الحقوق محفوظة © 2026 <strong>معرض آية لتجارة السيارات - برئاسة أبو موسى</strong></p>
      </div>
    </div>
    `;
  }

  function initFooterComponent() {
    const footerElement = document.querySelector('footer.main-footer') || document.getElementById('site-footer');
    if (!footerElement) return;

    // تحديد اسم الصفحة الحالية
    let path = window.location.pathname.split('/').pop() || 'index.html';
    if (!path || path === '/') path = 'index.html';

    // حقن الفوتر الموحد الشامل لكافة تبويبات المشروع الـ 10
    footerElement.innerHTML = getFooterHTML(path);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooterComponent);
  } else {
    initFooterComponent();
  }
})();
