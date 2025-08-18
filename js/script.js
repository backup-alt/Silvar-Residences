document.addEventListener("DOMContentLoaded", function() {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slider-image');
  let currentIndex = 0;
  const total = slides.length;

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}vw)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % total;
    updateSlider();
  }

  updateSlider(); // Initial position
  setInterval(nextSlide, 3000); // Change slide every 3 seconds
});

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.testimonials-track');
  const cards = Array.from(document.querySelectorAll('.testimonial-card'));
  const prevBtn = document.querySelector('.left-arrow');
  const nextBtn = document.querySelector('.right-arrow');

  const visibleCount = 3;
  const cloneCount = visibleCount - 1; // Clones count based on visible slides

  // Clone last N slides and prepend
  const prependClones = cards.slice(-cloneCount).map(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('clone');
    track.prepend(clone);
    return clone;
  });

  // Clone first N slides and append
  const appendClones = cards.slice(0, cloneCount).map(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('clone');
    track.append(clone);
    return clone;
  });

  // Update cards array to include clones
  const allCards = Array.from(document.querySelectorAll('.testimonial-card'));
  const cardWidth = cards[0].offsetWidth + 24; // width + gap

  // Start index adjusted because of prepended clones
  let currentIndex = cloneCount;

  // Set initial position to first real slide
  track.style.transform = `translateX(${-cardWidth * currentIndex}px)`;

  let isTransitioning = false;

  function moveTo(index) {
    if (isTransitioning) return;
    isTransitioning = true;
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(${-cardWidth * index}px)`;
    currentIndex = index;
  }

  track.addEventListener('transitionend', () => {
    isTransitioning = false;

    // If we've moved to prepend clones (aka before first real slide)
    if (currentIndex < cloneCount) {
      currentIndex = cards.length + currentIndex;
      track.style.transition = 'none';
      track.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
    }

    // If we've moved to append clones (past last real slide)
    if (currentIndex >= cards.length + cloneCount) {
      currentIndex = currentIndex - cards.length;
      track.style.transition = 'none';
      track.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
    }
  });

  prevBtn.addEventListener('click', () => {
    moveTo(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    moveTo(currentIndex + 1);
  });

  // Handle window resize to recalc widths and reposition instantly
  window.addEventListener('resize', () => {
    const newCardWidth = cards[0].offsetWidth + 24;
    track.style.transition = 'none';
    track.style.transform = `translateX(${-newCardWidth * currentIndex}px)`;
  });
});

