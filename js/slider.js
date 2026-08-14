/* ==========================================================================
   معرض آية لتجارة السيارات - سلايدر السيارات والعروض (slider.js)
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.featured-slider-track');
    const prevBtn = document.querySelector('.slider-prev-btn');
    const nextBtn = document.querySelector('.slider-next-btn');

    if (!sliderContainer) return;

    let currentIndex = 0;

    function getCardWidth() {
      const firstCard = sliderContainer.querySelector('.car-card');
      return firstCard ? firstCard.offsetWidth + 30 : 350;
    }

    function updateSliderPosition() {
      const stepWidth = getCardWidth();
      sliderContainer.style.transform = `translateX(${currentIndex * stepWidth}px)`;
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const totalCards = sliderContainer.querySelectorAll('.car-card').length;
        const visibleCards = window.innerWidth < 768 ? 1 : window.innerWidth < 1200 ? 2 : 3;
        if (currentIndex < totalCards - visibleCards) {
          currentIndex++;
          updateSliderPosition();
        } else {
          currentIndex = 0;
          updateSliderPosition();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateSliderPosition();
        }
      });
    }

    // التمرير التلقائي Auto play
    let autoSlider = setInterval(() => {
      if (nextBtn) nextBtn.click();
    }, 6000);

    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlider));
    sliderContainer.addEventListener('mouseleave', () => {
      autoSlider = setInterval(() => {
        if (nextBtn) nextBtn.click();
      }, 6000);
    });
  });
})();
