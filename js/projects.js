// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const buildNowBtn = document.getElementById('buildNowBtn');
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Smooth scrolling navbar background on scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Build Now button functionality
    buildNowBtn.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'translateY(-3px) scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = 'translateY(-3px) scale(1)';
        }, 150);
        
        // Add your custom functionality here
        console.log('Build Now button clicked!');
        
        // Example: Show a modal or redirect
        // You can add actual functionality like:
        // window.location.href = '/contact';
        // or show a contact form modal
        showBuildModal();
    });
    
    // Example modal function (you can customize this)
    function showBuildModal() {
        alert('Ready to build your dream project? Contact us to get started!');
        // Replace with actual modal or form functionality
    }
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const bannerImage = document.querySelector('.banner-image');
        
        if (heroContent && bannerImage) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
            bannerImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Add loading animation to elements
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
    document.querySelectorAll('.section-title, .section-description').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    // Button hover sound effect (optional)
    buildNowBtn.addEventListener('mouseenter', function() {
        // You can add a subtle sound effect here if desired
        console.log('Build Now button hovered');
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // Performance optimization - debounced scroll
    let scrollTimeout;
    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(scrollTimeout);
                func(...args);
            };
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Additional scroll-based functionality can be added here
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
});
