/* ==========================================================================
   معرض آية لتجارة السيارات - والتحقق من صحة نموذج التواصل (contact.js)
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const alertSuccess = document.getElementById('contact-alert-success');
    const alertError = document.getElementById('contact-alert-error');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('contact-name')?.value.trim() || '';
      const phone = document.getElementById('contact-phone')?.value.trim() || '';
      const email = document.getElementById('contact-email')?.value.trim() || '';
      const message = document.getElementById('contact-message')?.value.trim() || '';

      // الإخفاء الأولي للتنبيهات
      if (alertSuccess) alertSuccess.classList.remove('active');
      if (alertError) alertError.classList.remove('active');

      // التحقق من الحقول
      if (!name || name.length < 3) {
        showError('يرجى كتابة الاسم الكامل (3 حروف على الأقل)');
        return;
      }

      if (!phone || phone.length < 8) {
        showError('يرجى أدخال رقم هاتف صحيح');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showError('يرجى أدخال بريد إلكتروني صحيح');
        return;
      }

      if (!message || message.length < 10) {
        showError('يرجى كتابة تفاصيل الرسالة (10 أحرف على الأقل)');
        return;
      }

      // إظهار نجاح الإرسال
      if (alertSuccess) {
        alertSuccess.innerHTML = '<i class="fas fa-check-circle"></i> تم إرسال رسالتك بنجاح! سيتواصل معك فريق أبو موسى في أقرب وقت.';
        alertSuccess.classList.add('active');
      }

      contactForm.reset();
    });

    function showError(msg) {
      if (alertError) {
        alertError.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`;
        alertError.classList.add('active');
      }
    }
  });
})();
