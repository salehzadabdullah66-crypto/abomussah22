/* ==========================================================================
   معرض آية لتجارة السيارات - تهيئة الموقع العامة والوظائف الأساسية (main.js)
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // 1. إخفاء شاشة التحميل الأولية Page Loader
    const pageLoader = document.getElementById('page-loader');
    if (pageLoader) {
      setTimeout(() => {
        pageLoader.classList.add('hidden');
      }, 600);
    }

    // 2. تفعيل كاشف الحركة وتثبيت ظهور القسم الرئيسي مرة واحدة فقط Scroll Observer
    if ('IntersectionObserver' in window) {
      const scrollObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const isHeroSection = entry.target.classList.contains('hero-content') || 
                                  entry.target.closest('.hero-section') || 
                                  entry.target.classList.contains('page-banner') ||
                                  entry.target.classList.contains('hero-title');
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              // إظهار نصوص القسم الرئيسي مرة واحدة فقط وثباتها بشكل دائم
              if (isHeroSection) {
                scrollObserver.unobserve(entry.target);
              }
            } else {
              // التكرار ينطبق فقط على كروت السيارات وباقي الأقسام
              if (!isHeroSection) {
                entry.target.classList.remove('revealed');
              }
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      function observeAllElements() {
        const revealElements = document.querySelectorAll('.scroll-reveal, .car-card');
        revealElements.forEach((el) => scrollObserver.observe(el));
      }

      observeAllElements();

      // مراقبة التغييرات والفلترة المباشرة لبطاقات السيارات
      const carsGridTarget = document.querySelector('.cars-grid');
      if (carsGridTarget && 'MutationObserver' in window) {
        const mutObserver = new MutationObserver(() => {
          observeAllElements();
        });
        mutObserver.observe(carsGridTarget, { childList: true, subtree: true });
      }
    } else {
      // احتياطي للأجهزة القديمة
      document.querySelectorAll('.scroll-reveal, .car-card').forEach((el) => el.classList.add('revealed'));
    }

    // 3. تفعيل الأكورديون للأسئلة الشائعة FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach((header) => {
      if (header.dataset.accordionBound) return;
      header.dataset.accordionBound = "true";

      header.addEventListener('click', function (e) {
        e.preventDefault();
        const accordionItem = this.closest('.accordion-item');
        if (!accordionItem) return;
        const isActive = accordionItem.classList.contains('active');

        // إغلاق بقية الأكورديونات المفتوحة
        document.querySelectorAll('.accordion-item').forEach((item) => {
          item.classList.remove('active');
        });

        // التبديل للحالة الحالية
        if (!isActive) {
          accordionItem.classList.add('active');
        }
      });
    });

    // 4. حاسبة التمويل بالـ JS (Financing Calculator)
    const calcForm = document.getElementById('financing-calc-form');
    if (calcForm) {
      const carPriceInput = document.getElementById('calc-price');
      const downPaymentInput = document.getElementById('calc-down');
      const termInput = document.getElementById('calc-months');
      const monthlyPaymentElem = document.getElementById('calc-monthly-val');
      const totalAmountElem = document.getElementById('calc-total-val');

      function calculateInstallment() {
        const price = parseFloat(carPriceInput.value) || 0;
        const downPayment = parseFloat(downPaymentInput.value) || 0;
        const months = parseInt(termInput.value) || 12;

        const loanAmount = Math.max(0, price - downPayment);
        // فائدة تقديرية سنوية 4.5%
        const annualInterestRate = 0.045;
        const totalInterest = loanAmount * (annualInterestRate * (months / 12));
        const totalPayable = loanAmount + totalInterest;
        const monthlyPayment = months > 0 ? totalPayable / months : 0;

        const currentLang = document.documentElement.getAttribute('lang') || 'ar';
        const locale = currentLang === 'en' ? 'en-US' : 'ar-EG';

        if (monthlyPaymentElem) {
          monthlyPaymentElem.textContent = Math.round(monthlyPayment).toLocaleString(locale) + ' $';
        }
        if (totalAmountElem) {
          totalAmountElem.textContent = Math.round(totalPayable).toLocaleString(locale) + ' $';
        }
      }

      carPriceInput.addEventListener('input', calculateInstallment);
      downPaymentInput.addEventListener('input', calculateInstallment);
      termInput.addEventListener('change', calculateInstallment);

      calculateInstallment(); // حساب أولي
    }

    // 5. تفعيل كتابة وعرض عنوان القسم الرئيسي مرة واحدة فقط عند الفتح
    initHeroTypewriterOnce();

    // 6. تفعيل خلفية الجسيمات الذهبية العائمة الشاملة لجميع الصفحات
    initGlobalGoldParticleCanvas();
  });

  function initHeroTypewriterOnce() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle || heroTitle.dataset.typedDone) return;
    heroTitle.dataset.typedDone = "true";

    const textPart1 = "معرض ";
    const goldText = "آية";
    const textPart2 = " لتجارة السيارات";

    heroTitle.innerHTML = '<span id="type-text-body"></span><span class="type-cursor">|</span>';
    const textBody = document.getElementById('type-text-body');

    let sequence = [];
    for (let char of textPart1) sequence.push({ char, type: 'normal' });
    sequence.push({ type: 'goldStart' });
    for (let char of goldText) sequence.push({ char, type: 'gold' });
    sequence.push({ type: 'goldEnd' });
    for (let char of textPart2) sequence.push({ char, type: 'normal' });

    let idx = 0;
    let goldSpan = null;

    const interval = setInterval(() => {
      if (idx >= sequence.length) {
        clearInterval(interval);
        // الاستقرار النهائي على النمط الأصلي بالألوان الرسمية المعتمدة
        heroTitle.innerHTML = 'معرض <span class="gold-gradient-title">آية</span> لتجارة السيارات';
        return;
      }

      const item = sequence[idx];
      if (item.type === 'goldStart') {
        goldSpan = document.createElement('span');
        goldSpan.className = 'gold-gradient-title';
        textBody.appendChild(goldSpan);
      } else if (item.type === 'goldEnd') {
        goldSpan = null;
      } else if (item.char) {
        if (goldSpan) {
          goldSpan.textContent += item.char;
        } else {
          textBody.appendChild(document.createTextNode(item.char));
        }
      }

      idx++;
    }, 75);
  }

  function initGlobalGoldParticleCanvas() {
    if (document.getElementById('global-gold-particles-canvas')) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'global-gold-particles-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const particleCount = 38;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 1,
        vx: (Math.random() - 0.5) * 0.45,
        vy: -Math.random() * 0.65 - 0.25,
        alpha: Math.random() * 0.65 + 0.2
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.vx *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.85)';
        ctx.fill();
      });

      requestAnimationFrame(render);
    }

    render();
  }
})();
