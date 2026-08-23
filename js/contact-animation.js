/* ==========================================================================
   معرض آية لتجارة السيارات - تأثيرات الحركات والأنيميشن التفاعلي لصفحة تواصل معنا
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initContactCard3DTilt();
  initFormAnimations();
  initContactParticleCanvas();
  initTopicChips();
  initContactShowroomVideoControls();
});

/**
 * التفاعل السريع لتبويبات المواضيع السريعة
 */
function initTopicChips() {
  const chips = document.querySelectorAll('.topic-chip');
  const select = document.getElementById('contact-topic');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const topicVal = chip.getAttribute('data-topic');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value.includes(topicVal) || topicVal.includes(select.options[i].value)) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    });
  });
}

/**
 * 1. تأثير إمالة الكروت الثلاثية الأبعاد (3D Card Tilt)
 */
function initContactCard3DTilt() {
  const cards = document.querySelectorAll('.contact-hub-card, .owner-card-hero');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });
}

/**
 * 2. أنيميشن النموذج وحركة أيقونة الطائرة الورقية عند الإرسال
 */
function initFormAnimations() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('.btn-send-animated');
  const icon = submitBtn ? submitBtn.querySelector('i') : null;

  form.addEventListener('submit', (e) => {
    if (submitBtn && icon) {
      submitBtn.classList.add('sending');
      setTimeout(() => {
        submitBtn.classList.remove('sending');
      }, 1200);
    }
  });
}

/**
 * 3. الجسيمات الذهبية العائمة (Golden Floating Particles Canvas)
 */
function initContactParticleCanvas() {
  const container = document.querySelector('.contact-particles-bg');
  if (!container) return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  container.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = container.offsetWidth;
    height = canvas.height = container.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const isMobile = window.innerWidth < 768;
  const particleCount = isMobile ? 10 : 28;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.8,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.15,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
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
      if (!isMobile) {
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
      }
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/**
 * 4. تشغيل الفيديو مع الصوت وشريط التحكم الفاخر بدون تقطيع لمتصفح كروم والهواتف
 */
function initContactShowroomVideoControls() {
  const video = document.getElementById('scroll-autoplay-video');
  if (!video) return;

  const playBtn = document.getElementById('contact-vid-ctrl-play');
  const rewindBtn = document.getElementById('contact-vid-ctrl-rewind');
  const forwardBtn = document.getElementById('contact-vid-ctrl-forward');
  const muteBtn = document.getElementById('contact-vid-ctrl-mute');
  const fullscreenBtn = document.getElementById('contact-vid-ctrl-fullscreen');
  const progressWrap = document.getElementById('contact-video-progress-wrap');
  const progressFill = document.getElementById('contact-video-progress-fill');
  const timeText = document.getElementById('contact-vid-time-text');

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateSoundUi(isMuted) {
    if (muteBtn) {
      muteBtn.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    }
  }

  function updatePlayUi(isPaused) {
    if (playBtn) {
      playBtn.innerHTML = isPaused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
    }
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.90 &&
      rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) * 0.10
    );
  }

  // فك كتم الصوت وتشغيل الفيديو
  function startVideoWithSound() {
    video.muted = false;
    video.volume = 1.0;
    const promise = video.play();
    if (promise !== undefined) {
      promise.then(() => {
        updateSoundUi(false);
        updatePlayUi(false);
      }).catch(() => {
        // في حال واجه تقييد متصفح قبل تفاعل اللمس، يبدأ صامت ويكرر فك الكتم فوراً عند أول لمسة
        video.muted = true;
        video.play().catch(() => {});
        updateSoundUi(true);
        updatePlayUi(false);
      });
    }
  }

  // فك قيد الصوت المباشر في متصفح كروم عند أي لمسة أو سكرول
  const activateAudioOnUserTouch = () => {
    video.muted = false;
    video.volume = 1.0;
    updateSoundUi(false);
    if (isElementInViewport(video)) {
      if (video.paused) {
        video.play().catch(() => {});
        updatePlayUi(false);
      }
    }
  };

  // الاستماع المباشر لجميع أحداث اللمس والحركة لفك قيد الصوت في كروم فوراً
  ['touchstart', 'touchend', 'pointerdown', 'pointerup', 'scroll', 'wheel', 'click'].forEach((evt) => {
    window.addEventListener(evt, activateAudioOnUserTouch, { passive: true });
    document.addEventListener(evt, activateAudioOnUserTouch, { passive: true });
  });

  // تفعيل IntersectionObserver للتشغيل التلقائي عند الوصول للقسم
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startVideoWithSound();
        } else {
          if (!video.paused) {
            video.pause();
            updatePlayUi(true);
          }
        }
      });
    }, { threshold: 0.10 });

    observer.observe(video);
  } else {
    window.addEventListener('scroll', () => {
      if (isElementInViewport(video)) {
        startVideoWithSound();
      } else {
        if (!video.paused) {
          video.pause();
          updatePlayUi(true);
        }
      }
    }, { passive: true });
  }

  // تحديث شريط التقدم والوقت
  let lastUpdate = 0;
  video.addEventListener('timeupdate', () => {
    const now = Date.now();
    if (now - lastUpdate < 180) return;
    lastUpdate = now;

    if (video.duration) {
      const percent = (video.currentTime / video.duration) * 100;
      if (progressFill) progressFill.style.width = `${percent}%`;
      if (timeText) timeText.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
    }
  });

  // تقديم وتأخير الفيديو عند النقر على شريط التقدم
  if (progressWrap) {
    progressWrap.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const rect = progressWrap.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      if (width > 0 && video.duration) {
        video.currentTime = (clickX / width) * video.duration;
      }
    });
  }

  // زر تشغيل / إيقاف
  if (playBtn) {
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (video.paused) {
        video.muted = false;
        video.volume = 1.0;
        video.play().catch(() => {});
        updatePlayUi(false);
        updateSoundUi(false);
      } else {
        video.pause();
        updatePlayUi(true);
      }
    });
  }

  // زر ترجيع 10 ثواني
  if (rewindBtn) {
    rewindBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      video.currentTime = Math.max(0, video.currentTime - 10);
    });
  }

  // زر تقديم 10 ثواني
  if (forwardBtn) {
    forwardBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
    });
  }

  // زر كتم / تشغيل الصوت
  function toggleMute(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      if (video.paused) video.play().catch(() => {});
      updateSoundUi(false);
    } else {
      video.muted = true;
      updateSoundUi(true);
    }
  }

  if (muteBtn) muteBtn.addEventListener('click', toggleMute);

  // زر ملء الشاشة
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.webkitEnterFullscreen) {
        video.webkitEnterFullscreen();
      }
    });
  }

  // النقر على الفيديو لتشغيل / إيقاف مؤقت مع الصوت
  video.addEventListener('click', () => {
    if (video.paused) {
      video.muted = false;
      video.volume = 1.0;
      video.play().catch(() => {});
      updatePlayUi(false);
      updateSoundUi(false);
    } else {
      video.pause();
      updatePlayUi(true);
    }
  });
}
