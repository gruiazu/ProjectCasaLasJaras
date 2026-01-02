document.addEventListener('DOMContentLoaded', () => {

  // CÓDIGO PARA LA GALERÍA PRINCIPAL (HERO)
  const heroSlides = document.querySelectorAll('.hero-gallery .slide');
  if (heroSlides.length > 0) {
    const heroNextButton = document.querySelector('.hero-nav.next');
    const heroPrevButton = document.querySelector('.hero-nav.prev');
    let currentHeroSlide = 0;
    let heroInterval;

    function showHeroSlide(index) {
      heroSlides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
          slide.classList.add('active');
        }
      });
    }

    function nextHeroSlide() {
      currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
      showHeroSlide(currentHeroSlide);
    }

    function prevHeroSlide() {
      currentHeroSlide = (currentHeroSlide - 1 + heroSlides.length) % heroSlides.length;
      showHeroSlide(currentHeroSlide);
    }

    function startHeroInterval() {
      heroInterval = setInterval(nextHeroSlide, 5000);
    }

    function resetHeroInterval() {
      clearInterval(heroInterval);
      startHeroInterval();
    }

    if (heroSlides.length > 1) {
      showHeroSlide(currentHeroSlide);
      startHeroInterval();
      heroNextButton.addEventListener('click', () => {
        nextHeroSlide();
        resetHeroInterval();
      });
      heroPrevButton.addEventListener('click', () => {
        prevHeroSlide();
        resetHeroInterval();
      });
    } else if (heroSlides.length === 1) {
      showHeroSlide(0);
    }
  }

  // CÓDIGO PARA EL CARRUSEL DE TESTIMONIOS
  const track = document.querySelector('.carousel-track');
  if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    let index = 0;
    let slideInterval;

    function updateSlide() {
      if (!track) return;
      track.style.transform = 'translateX(-' + index * 100 + '%)';
    }
    function nextSlide() {
      if (!slides.length) return;
      index = (index + 1) % slides.length;
      updateSlide();
    }
    function prevSlide() {
      if (!slides.length) return;
      index = (index - 1 + slides.length) % slides.length;
      updateSlide();
    }
    function startInterval() {
      slideInterval = setInterval(nextSlide, 6000);
    }
    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }
    if (nextButton && prevButton) {
      nextButton.addEventListener('click', () => { nextSlide(); resetInterval(); });
      prevButton.addEventListener('click', () => { prevSlide(); resetInterval(); });
    }
    if (slides.length > 0) {
      startInterval();
    }
  }

  // CÓDIGO PARA EL LIGHTBOX DE LA GALERÍA (ACTUALIZADO)
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.lightbox-nav.prev');
    const nextBtn = document.querySelector('.lightbox-nav.next');

    let galleryImages = [];
    let currentIndex = 0;

    function showImage(index) {
      if (index >= 0 && index < galleryImages.length) {
        lightboxImg.src = galleryImages[index];
        currentIndex = index;
      }
    }

    function showNextImage() {
      const nextIndex = (currentIndex + 1) % galleryImages.length;
      showImage(nextIndex);
    }

    function showPrevImage() {
      const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(prevIndex);
    }

    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', e => {
        e.preventDefault();
        
        const currentGallery = trigger.closest('.photo-grid');
        const allTriggersInGallery = currentGallery.querySelectorAll('.lightbox-trigger');
        galleryImages = Array.from(allTriggersInGallery).map(t => t.href);
        
        const startIndex = galleryImages.indexOf(trigger.href);

        lightbox.style.display = 'flex';
        showImage(startIndex);
      });
    });

    function closeLightbox() {
      lightbox.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', e => {
      if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowRight') {
          showNextImage();
        } else if (e.key === 'ArrowLeft') {
          showPrevImage();
        } else if (e.key === 'Escape') {
          closeLightbox();
        }
      }
    });
  }

});