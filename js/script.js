// Enhanced snap slider functionality
function initializeSnapSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    // Auto-advance slides every 4 seconds
    function autoAdvance() {
        currentSlide = (currentSlide + 1) % slides.length;
        const slideWidth = sliderContainer.offsetWidth;
        sliderContainer.scrollTo({
            left: slideWidth * currentSlide,
            behavior: 'smooth'
        });
    }
    
    // Start auto-advance
    let autoSlideInterval = setInterval(autoAdvance, 4000);
    
    // Pause on hover/touch
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(autoAdvance, 4000);
    });
    
    // Handle touch events for mobile
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        clearInterval(autoSlideInterval);
    });
    
    sliderContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        e.preventDefault();
    });
    
    sliderContainer.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentSlide < slides.length - 1) {
                currentSlide++;
            } else if (diffX < 0 && currentSlide > 0) {
                currentSlide--;
            }
            
            const slideWidth = sliderContainer.offsetWidth;
            sliderContainer.scrollTo({
                left: slideWidth * currentSlide,
                behavior: 'smooth'
            });
        }
        
        // Restart auto-advance
        autoSlideInterval = setInterval(autoAdvance, 4000);
    });
    
    // Update current slide on scroll
    sliderContainer.addEventListener('scroll', () => {
        const slideWidth = sliderContainer.offsetWidth;
        currentSlide = Math.round(sliderContainer.scrollLeft / slideWidth);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSnapSlider);
