// Add this to your existing JavaScript file for enhanced mobile experience
function optimizeSliderForDevice() {
    const slider = document.querySelector('.slider-track');
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    
    if (slider) {
        if (isMobile) {
            // Slower animation on mobile
            slider.style.animationDuration = '28s';
        } else if (isTablet) {
            // Medium speed on tablet
            slider.style.animationDuration = '24s';
        } else {
            // Normal speed on desktop
            slider.style.animationDuration = '21s';
        }
    }
}

// Call on load and resize
window.addEventListener('load', optimizeSliderForDevice);
window.addEventListener('resize', debounce(optimizeSliderForDevice, 250));

// Debounce function to prevent excessive calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


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


