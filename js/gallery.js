/* ==========================================================================
   معرض آية لتجارة السيارات - نظام الـ Lightbox لتكبير الصور (gallery.js)
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-card');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-target-img');
    const lightboxCaption = document.getElementById('lightbox-caption-text');
    const lightboxClose = document.getElementById('lightbox-close-btn');

    if (!galleryItems.length || !lightboxModal) return;

    galleryItems.forEach((item) => {
      item.addEventListener('click', function () {
        const img = this.querySelector('.gallery-img');
        const title = this.querySelector('.gallery-title')?.textContent || '';
        const category = this.querySelector('.gallery-category')?.textContent || '';

        if (img && lightboxImg) {
          lightboxImg.src = img.getAttribute('src') || img.src;
          if (lightboxCaption) {
            lightboxCaption.textContent = title ? `${title} - ${category}` : category;
          }
          lightboxModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    function closeLightbox() {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  });
})();
