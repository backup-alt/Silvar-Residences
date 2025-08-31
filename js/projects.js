// Enhanced JavaScript with interactive features
document.addEventListener('DOMContentLoaded', function() {
    
    // Load navbar
    loadNavbar();
    
    // Initialize all features
    initializeBuildButton();
    initializeStatsCounter();
    initializeScrollEffects();
    initializeCarousel();
    initializeTestimonials();
    initializeServiceCards();
    initializeCTAButtons();
    
    // Smooth scroll for scroll indicator
    document.querySelector('.scroll-indicator').addEventListener('click', function() {
        document.querySelector('.stats-section').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function loadNavbar() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            initializeNavigation();
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            createFallbackNav();
        });
}

function createFallbackNav() {
    const fallbackNav = `
        <nav style="position: fixed; top: 0; width: 100%; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); z-index: 1000; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 1.5rem; font-weight: 700; color: #2c3e50;">BuildCraft</div>
            <div style="display: flex; gap: 2rem;">
                <a href="#" style="text-decoration: none; color: #2c3e50; font-weight: 500;">Home</a>
                <a href="#" style="text-decoration: none; color: #3498db; font-weight: 500;">Projects</a>
                <a href="#" style="text-decoration: none; color: #2c3e50; font-weight: 500;">About</a>
                <a href="#" style="text-decoration: none; color: #2c3e50; font-weight: 500;">Contact</a>
            </div>
        </nav>
    `;
    document.getElementById('navbar-placeholder').innerHTML = fallbackNav;
}

function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            });
        });
    }
}

function initializeBuildButton() {
    const buildNowBtn = document.getElementById('buildNowBtn');
    
    if (buildNowBtn) {
        buildNowBtn.addEventListener('click', function() {
            this.style.transform = 'translateY(-3px) scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1)';
            }, 150);
            
            // Scroll to CTA section
            document.querySelector('.cta-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}

function initializeStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const targetCount = parseInt(entry.target.dataset.count);
                animateCounter(statNumber, targetCount);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statItems.forEach(item => {
        statsObserver.observe(item);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 98 ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

function initializeCarousel() {
    const projectCards = document.querySelectorAll('.project-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentProject = 0;
    
    function showProject(index) {
        projectCards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentProject = (currentProject - 1 + projectCards.length) % projectCards.length;
            showProject(currentProject);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentProject = (currentProject + 1) % projectCards.length;
            showProject(currentProject);
        });
    }
    
    // Auto-rotate carousel
    setInterval(() => {
        currentProject = (currentProject + 1) % projectCards.length;
        showProject(currentProject);
    }, 5000);
}

function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 6000);
}

function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const service = this.dataset.service;
            console.log(`Service clicked: ${service}`);
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

function initializeCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('primary')) {
                alert('Ready to start your project? Let\'s discuss your vision!');
            } else {
                // Scroll to featured projects
                document.querySelector('.featured-projects').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initializeScrollEffects() {
    // Parallax effect for shapes
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Fade in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .service-card, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// Add ripple effect CSS dynamically
const rippleCSS = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(52, 152, 219, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);
