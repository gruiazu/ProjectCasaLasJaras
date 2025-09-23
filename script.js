/* Carousel básico: avance automático + botones.
   Conserva opción manual con flechas. */
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