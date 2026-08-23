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
  const particleCount = 28;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -Math.random() * 0.6 - 0.2,
      alpha: Math.random() * 0.6 + 0.2
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
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/**
 * 4. تشغيل الفيديو مع الصوت وشريط التحكم الفاخر (تقديم/تأخير/كتم/ملء الشاشة) لصفحة تواصل معنا
 */
function initContactShowroomVideoControls() {
  const video = document.getElementById('scroll-autoplay-video');
  if (!video) return;

  const soundBtn = document.getElementById('contact-video-sound-toggle');
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
    if (soundBtn) {
      if (isMuted) {
        soundBtn.innerHTML = '<i class="fas fa-volume-mute"></i> <span>انقر لفتح الصوت 🔊</span>';
        soundBtn.classList.remove('unmuted');
      } else {
        soundBtn.innerHTML = '<i class="fas fa-volume-up"></i> <span>الصوت يعمل 🔊</span>';
        soundBtn.classList.add('unmuted');
      }
    }
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
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) * 0.15
    );
  }

  function playVideoWithAudio() {
    video.muted = false;
    const promise = video.play();
    if (promise !== undefined) {
      promise.then(() => {
        updateSoundUi(false);
        updatePlayUi(false);
      }).catch(() => {
        video.muted = true;
        video.play().catch(() => {});
        updateSoundUi(true);
        updatePlayUi(false);
      });
    }
  }

  // إتاحة وتفعيل الصوت تلقائياً بمجرد لمس أو تمرير المستخدم للشاشة
  const unlockSoundOnInteraction = () => {
    if (isElementInViewport(video)) {
      if (video.muted) {
        playVideoWithAudio();
      }
    }
  };

  ['touchstart', 'touchend', 'scroll', 'wheel', 'pointerdown', 'click', 'keydown'].forEach((evt) => {
    window.addEventListener(evt, unlockSoundOnInteraction, { passive: true });
  });

  // تفعيل IntersectionObserver للتشغيل مع الصوت عند الوصول لقسم الفيديو
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          playVideoWithAudio();
        } else {
          video.pause();
          updatePlayUi(true);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(video);
  } else {
    window.addEventListener('scroll', () => {
      if (isElementInViewport(video)) {
        playVideoWithAudio();
      } else {
        video.pause();
        updatePlayUi(true);
      }
    }, { passive: true });
  }

  // تحديث شريط التقدم والوقت
  video.addEventListener('timeupdate', () => {
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
        video.play().catch(() => {});
        updatePlayUi(false);
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

  // تبديل كتم / تشغيل الصوت
  function toggleMute(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (video.muted) {
      video.muted = false;
      video.play().catch(() => {});
      updateSoundUi(false);
    } else {
      video.muted = true;
      updateSoundUi(true);
    }
  }

  if (soundBtn) soundBtn.addEventListener('click', toggleMute);
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

  // النقر على الفيديو لتشغيل / إيقاف مؤقت
  video.addEventListener('click', () => {
    if (video.paused) {
      video.play().catch(() => {});
      updatePlayUi(false);
    } else {
      video.pause();
      updatePlayUi(true);
    }
  });
}
