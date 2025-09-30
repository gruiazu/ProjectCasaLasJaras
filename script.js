document.addEventListener('DOMContentLoaded', () => {

  // ==================================================================
  // CÓDIGO PARA LA GALERÍA PRINCIPAL (NUEVO)
  // ==================================================================
  const heroSlides = document.querySelectorAll('.hero-gallery .slide');
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
    heroInterval = setInterval(nextHeroSlide, 5000); // Cambia de imagen cada 5 segundos
  }

  function resetHeroInterval() {
    clearInterval(heroInterval);
    startHeroInterval();
  }

  if (heroSlides.length > 0) {
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
  }


  // ==================================================================
  // CÓDIGO PARA EL CARRUSEL DE TESTIMONIOS (EXISTENTE)
  // ==================================================================
  const track = document.querySelector('.carousel-track');
  const slides = track ? Array.from(track.children) : [];
  const nextButton = document.querySelector('.carousel-btn.next');
  const prevButton = document.querySelector('.carousel-btn.prev');
  let index = 0;
  let intervalTime = 6000; // 6s
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

  if (nextButton && prevButton) {
    nextButton.addEventListener('click', () => { nextSlide(); resetInterval(); });
    prevButton.addEventListener('click', () => { prevSlide(); resetInterval(); });
  }

  function startInterval() {
      slideInterval = setInterval(nextSlide, intervalTime);
  }

  function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
  }

  /* inicio automático */
  if (slides.length > 0) {
      startInterval();
  }

});