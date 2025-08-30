document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const body = document.body;
    
    // Debug logging
    console.log('Mobile toggle found:', mobileToggle);
    console.log('Mobile overlay found:', mobileOverlay);
    
    if (!mobileToggle || !mobileOverlay) {
        console.error('Required elements not found!');
        return;
    }
    
    // Toggle function
    function toggleMobileMenu() {
        const isActive = mobileToggle.classList.contains('active');
        
        console.log('Toggling menu. Currently active:', isActive);
        
        if (isActive) {
            mobileToggle.classList.remove('active');
            mobileOverlay.classList.remove('active');
            body.classList.remove('menu-open');
            console.log('Menu closed');
        } else {
            mobileToggle.classList.add('active');
            mobileOverlay.classList.add('active');
            body.classList.add('menu-open');
            console.log('Menu opened');
        }
    }
    
    // Mobile menu toggle click
    mobileToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Hamburger clicked');
        toggleMobileMenu();
    });
    
    // Close menu when clicking mobile links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    console.log('Found mobile links:', mobileLinks.length);
    
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            console.log('Mobile link clicked, closing menu');
            if (mobileToggle.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Close menu when clicking overlay background
    mobileOverlay.addEventListener('click', function(e) {
        if (e.target === mobileOverlay) {
            console.log('Overlay background clicked, closing menu');
            toggleMobileMenu();
        }
    });
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileToggle.classList.contains('active')) {
            console.log('Escape key pressed, closing menu');
            toggleMobileMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideMenu = mobileToggle.contains(e.target) || 
                                 mobileOverlay.contains(e.target);
        
        if (!isClickInsideMenu && mobileToggle.classList.contains('active')) {
            console.log('Clicked outside menu, closing');
            toggleMobileMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767 && mobileToggle.classList.contains('active')) {
            console.log('Window resized to desktop, closing mobile menu');
            toggleMobileMenu();
        }
    });
    
    // Scroll effects
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (window.innerWidth > 767) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    navbar.classList.add('nav-hidden');
                } else {
                    navbar.classList.remove('nav-hidden');
                }
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            }, 100);
        }
    });
    
    console.log('Navigation setup complete');
});
