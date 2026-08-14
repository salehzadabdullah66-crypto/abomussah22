/* ==========================================================================
   معرض آية لتجارة السيارات - تفاعلات وحركات قسم الخدمات (Services Interactive)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initServiceCard3DTilt();
  initServiceBookingModal();
  initServiceTimelineAnimation();
});

/**
 * 1. تأثير إمالة كروت الخدمات ثلاثية الأبعاد (3D Service Cards Tilt)
 */
function initServiceCard3DTilt() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
  });
}

/**
 * 2. المودال التفاعلي لطلب وحجز الخدمة المباشر (VIP Service Booking Modal)
 */
function initServiceBookingModal() {
  const modal = document.getElementById('service-modal');
  const serviceTitleInput = document.getElementById('modal-service-name');
  const serviceNameTitle = document.getElementById('modal-service-title-display');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal) return;

  // فتح المودال عند الضغط على زر طلب الخدمة
  document.querySelectorAll('.btn-book-service').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceTitle = btn.getAttribute('data-service-title') || 'طلب خدمة سيارات';
      
      if (serviceTitleInput) serviceTitleInput.value = serviceTitle;
      if (serviceNameTitle) serviceNameTitle.textContent = serviceTitle;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // إغلاق المودال
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // إرسال نموذج طلب الخدمة
  const form = document.getElementById('service-modal-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = document.getElementById('modal-alert-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.textContent = 'تم استلام طلب خدمتكم بنجاح! سيتواصل معكم فريق أبو موسى خلال دقائق.';
        setTimeout(() => {
          closeModal();
          successMsg.style.display = 'none';
          form.reset();
        }, 2500);
      }
    });
  }
}

/**
 * 3. أنيميشن خط تتبع وتنفيذ الخدمات (Service Timeline Animation)
 */
function initServiceTimelineAnimation() {
  const steps = document.querySelectorAll('.service-step-item');
  if (!steps.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.25 });

  steps.forEach(step => observer.observe(step));
}
