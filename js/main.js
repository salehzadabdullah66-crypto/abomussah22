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

    // تفعيل مشغل البنار الصوتي والتشغيل التلقائي للفيديو عند التمرير والمؤشر الذهبي
    initAudioTestimonialPlayer();
    initScrollAutoplayVideos();
    initCustomGoldenCursor();

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

    // 5. تفعيل حركة فتح وإغلاق البردية للشعار والكتابة المتواصلة دون توقف
    initContinuousPapyrusScrollLoop();

    // 6. تفعيل خلفية الجسيمات الذهبية العائمة الشاملة لجميع الصفحات
    initGlobalGoldParticleCanvas();
  });

  function initContinuousPapyrusScrollLoop() {
    const taglineBoxes = document.querySelectorAll('.hero-tagline-quote');
    if (!taglineBoxes.length) return;

    taglineBoxes.forEach((box) => {
      if (box.dataset.papyrusInit) return;
      box.dataset.papyrusInit = "true";

      function getTaglineText() {
        const isEn = document.documentElement.getAttribute('lang') === 'en';
        return isEn ? '"Abu Mousa With You, Fear Nothing"' : '"أبو موسى لديكم لا خوف عليكم"';
      }

      box.innerHTML = `
        <div class="papyrus-scroll-wrapper">
          <span class="papyrus-text-target"></span><span class="papyrus-type-cursor">|</span>
        </div>
      `;

      const textTarget = box.querySelector('.papyrus-text-target');

      let charIdx = 0;

      function runLoop() {
        const fullText = getTaglineText();
        let typeTimer = setInterval(() => {
          const currentFullText = getTaglineText();
          if (charIdx <= currentFullText.length) {
            textTarget.textContent = currentFullText.slice(0, charIdx);
            charIdx++;
          } else {
            clearInterval(typeTimer);

            setTimeout(() => {
              let eraseTimer = setInterval(() => {
                const currentFullText = getTaglineText();
                if (charIdx >= 0) {
                  textTarget.textContent = currentFullText.slice(0, charIdx);
                  charIdx--;
                } else {
                  clearInterval(eraseTimer);
                  charIdx = 0;

                  setTimeout(() => {
                    runLoop();
                  }, 500);
                }
              }, 45);
            }, 2800);
          }
        }, 90);
      }

      runLoop();
    });
  }

  function initHeroTypewriterOnce() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle || heroTitle.dataset.typedDone) return;
    heroTitle.dataset.typedDone = "true";

    const isEn = document.documentElement.getAttribute('lang') === 'en';
    const textPart1 = isEn ? "Aya " : "معرض ";
    const goldText = isEn ? "Car Trading" : "آية";
    const textPart2 = isEn ? " Showroom" : " لتجارة السيارات";

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
        const curEn = document.documentElement.getAttribute('lang') === 'en';
        heroTitle.innerHTML = curEn 
          ? 'Aya <span class="gold-gradient-title">Car Trading</span> Showroom' 
          : 'معرض <span class="gold-gradient-title">آية</span> لتجارة السيارات';
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

  // 14. تهيئة وتشغيل بنار التسجيل الصوتي لآراء العملاء (Audio Testimonial Player)
  function initAudioTestimonialPlayer() {
    const audioCards = document.querySelectorAll('.audio-banner-card');
    audioCards.forEach((card) => {
      const audio = card.querySelector('.testimonial-audio-elem');
      const playBtn = card.querySelector('.audio-play-trigger');
      const playIcon = card.querySelector('.audio-play-icon');
      const progressWrap = card.querySelector('.audio-progress-wrap');
      const progressFill = card.querySelector('.audio-progress-fill');
      const timeDisp = card.querySelector('.audio-time-disp');

      if (!audio || !playBtn) return;

      function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
      }

      playBtn.addEventListener('click', () => {
        if (audio.paused) {
          // إيقاف أي أصوات أو فيديوهات أخرى تعمل بالصفحة
          document.querySelectorAll('audio, video').forEach((el) => {
            if (el !== audio && !el.paused) el.pause();
          });
          audio.play().catch(() => {});
          if (playIcon) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
          }
        } else {
          audio.pause();
          if (playIcon) {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
          }
        }
      });

      audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
          const pct = (audio.currentTime / audio.duration) * 100;
          if (progressFill) progressFill.style.width = `${pct}%`;
          if (timeDisp) timeDisp.textContent = formatTime(audio.currentTime);
        }
      });

      audio.addEventListener('ended', () => {
        if (playIcon) {
          playIcon.classList.remove('fa-pause');
          playIcon.classList.add('fa-play');
        }
        if (progressFill) progressFill.style.width = '0%';
        if (timeDisp) timeDisp.textContent = '0:00';
      });

      if (progressWrap) {
        progressWrap.addEventListener('click', (e) => {
          const rect = progressWrap.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const width = rect.width;
          if (audio.duration && width > 0) {
            audio.currentTime = (clickX / width) * audio.duration;
          }
        });
      }
    });
  }

  // 15. التشغيل التلقائي للفيديو عند التمرير والنزول مع إيقاظ الصوت تلقائياً (Scroll Autoplay With Sound)
  function initScrollAutoplayVideos() {
    const videos = document.querySelectorAll('#scroll-autoplay-video, [data-autoplay-on-scroll]');
    if (!videos.length || !('IntersectionObserver' in window)) return;

    const unlockSound = () => {
      videos.forEach((video) => {
        video.muted = false;
      });
    };

    window.addEventListener('click', unlockSound);
    window.addEventListener('touchstart', unlockSound);
    window.addEventListener('scroll', unlockSound);

    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.muted = false;
          const promise = video.play();
          if (promise !== undefined) {
            promise.catch(() => {
              // إذا حظر المتصفح الصوت التلقائي كسياسة أمان، يتم تشغيله مؤقتاً ثم تفعيل الصوت فور أي حركة أو لمس
              video.muted = true;
              video.play().catch(() => {});
            });
          }
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.35 });

    videos.forEach((vid) => videoObserver.observe(vid));
  }

  // 16. مؤشر الموس المخصص - الحلقة الذهبية المضيئة (Custom Golden Cursor Ring)
  function initCustomGoldenCursor() {
    // عدم التفعيل على أجهزة اللمس
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    let ring = document.getElementById('custom-cursor-ring');
    let dot = document.getElementById('custom-cursor-dot');

    if (!ring) {
      ring = document.createElement('div');
      ring.id = 'custom-cursor-ring';
      ring.className = 'custom-cursor-ring';
      document.body.appendChild(ring);
    }

    if (!dot) {
      dot = document.createElement('div');
      dot.id = 'custom-cursor-dot';
      dot.className = 'custom-cursor-dot';
      document.body.appendChild(dot);
    }

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;
    let isVisible = false;

    // تحديث موضع المؤشر والحلقة مباشرة وثابتة على الفأرة بدون أي تأخير
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ring.classList.add('visible');
        dot.classList.add('visible');
      }

      // تثبيت موضع الحلقة والنقطة المركزية مباشرة على رأس السهم 100%
      ring.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // إخفاء وإظهار المؤشر عند دخول وخروج الفأرة من النافذة
    document.addEventListener('mouseleave', () => {
      isVisible = false;
      ring.classList.remove('visible');
      dot.classList.remove('visible');
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      ring.classList.add('visible');
      dot.classList.add('visible');
    });

    // تأثير الضغط عند النقر بالموس
    window.addEventListener('mousedown', () => {
      ring.classList.add('active');
    });

    window.addEventListener('mouseup', () => {
      ring.classList.remove('active');
    });

    // تضخيم الحلقة الذهبية عند الوقوف على العناصر التفاعلية
    const interactiveSelector = 'a, button, input, select, textarea, .car-card, .btn, .social-btn, [role="button"], .accordion-header, .filter-btn, .float-btn';
    
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelector)) {
        ring.classList.add('hovered');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelector)) {
        ring.classList.remove('hovered');
      }
    });
  }
})();
