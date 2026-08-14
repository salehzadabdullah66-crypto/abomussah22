/* ==========================================================================
   معرض آية لتجارة السيارات - حركة صفحة من نحن والتفاعلات ثلاثية الأبعاد (about-animation.js)
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initAboutHeroObserver();
    initGoldParticlesCanvas();
    initCar3DTiltEffect();
    initShowroomVideoAutoplay();
  });

  /* 1. التكشف التدريجي وحركة دخول السيارة الناعمة عند وصول المستخدم للصفحة */
  function initAboutHeroObserver() {
    const heroSection = document.querySelector('.about-hero-section');
    const carWrapper = document.querySelector('.about-car-wrapper');
    const heroText = document.querySelector('.about-hero-text');

    if (!heroSection || !carWrapper || !heroText) return;

    function triggerAnimations() {
      // دخول السيارة السريع والأنيق مع التباطؤ الهادئ في المنتصف
      carWrapper.classList.add('animated-in');

      // ظهور النص والزر بأسلوب ناعم بعد استقرار السيارة في المنتصف
      setTimeout(() => {
        heroText.classList.add('animated-in');
      }, 800);
    }

    // تفعيل IntersectionObserver لضمان العمل عند السكرول أو عند الفتح المباشر
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerAnimations();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      observer.observe(heroSection);
    } else {
      // fallback لمتصفحات لا تدعم Observer
      triggerAnimations();
    }
  }

  /* 2. رسم جسيمات الضوء الذهبية الخفيفة العائمة خلف السيارة (Floating Gold Particles) */
  function initGoldParticlesCanvas() {
    const canvas = document.getElementById('about-particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 25 : 55;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 0.8;
        this.speedY = Math.random() * -0.6 - 0.2;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.fadeSpeed = Math.random() * 0.01 + 0.005;
        this.growing = Math.random() > 0.5;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        if (this.growing) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 0.8) this.growing = false;
        } else {
          this.opacity -= this.fadeSpeed;
          if (this.opacity <= 0.15) this.growing = true;
        }

        if (this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
          this.y = height + 10;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    });
  }

  /* 3. تأثير التمايل ثلاثي الأبعاد التفاعلي مع حركة الماوس (Interactive 3D Card Tilt) */
  function initCar3DTiltEffect() {
    const showcase = document.querySelector('.about-car-showcase');
    const frameCard = document.querySelector('.hero-combined-frame');

    if (!showcase || !frameCard || window.innerWidth < 992) return;

    showcase.addEventListener('mousemove', (e) => {
      const rect = showcase.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 6;
      const rotateX = -((y - centerY) / centerY) * 4;

      frameCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
    });

    showcase.addEventListener('mouseleave', () => {
      frameCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  }

  /* 4. التشغيل التلقائي المباشر للفيديو مع الصوت عند التمرير والوصول لقسم الفيديو */
  function initShowroomVideoAutoplay() {
    const videoSection = document.querySelector('.about-video-section');
    const video = document.getElementById('about-showroom-video');
    const soundBtn = document.getElementById('video-sound-toggle');

    if (!videoSection || !video) return;

    function playVideoWithAudio() {
      video.muted = false;
      const promise = video.play();
      if (promise !== undefined) {
        promise.then(() => {
          if (soundBtn) {
            soundBtn.innerHTML = '<i class="fas fa-volume-up"></i> <span>الصوت يعمل 🔊</span>';
            soundBtn.classList.add('unmuted');
          }
        }).catch(() => {
          // في حال كان هاتف المتصفح يمنع تشغيل الصوت بغير كبسة أولية، يبدأ كتم ثم يفتح فوراً
          video.muted = true;
          video.play().catch(() => {});
          if (soundBtn) {
            soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i> <span>انقر لفتح الصوت 🔊</span>';
            soundBtn.classList.remove('unmuted');
          }
        });
      }
    }

    // تفعيل التشغيل مع الصوت عند الفتح المباشر أو التمرير للقسم
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideoWithAudio();
          } else {
            video.pause();
          }
        });
      }, { threshold: 0.2 });

      observer.observe(videoSection);
    } else {
      playVideoWithAudio();
    }

    // زر التحكم بالصوت
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        if (video.muted) {
          video.muted = false;
          video.play().catch(() => {});
          soundBtn.innerHTML = '<i class="fas fa-volume-up"></i> <span>الصوت يعمل 🔊</span>';
          soundBtn.classList.add('unmuted');
        } else {
          video.muted = true;
          soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i> <span>كتم الصوت</span>';
          soundBtn.classList.remove('unmuted');
        }
      });
    }
  }
})();
