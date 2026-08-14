/* ==========================================================================
   معرض آية لتجارة السيارات - تأثيرات الحركات والأنيميشن التفاعلي لصفحة تواصل معنا
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initContactCard3DTilt();
  initFormAnimations();
  initContactParticleCanvas();
  initTopicChips();
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
