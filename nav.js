// Replace your current script.js with this version:
(function() {
    // Your entire navigation code wrapped in IIFE
    document.addEventListener('DOMContentLoaded', function() {
            document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing navigation...');
        
        // Get elements
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobile-menu');
        const body = document.body;
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
        // Debug: Check if elements exist
        console.log('Hamburger element found:', !!hamburger);
        console.log('Mobile menu element found:', !!mobileMenu);
    
        // Check if elements exist
        if (!hamburger || !mobileMenu) {
            console.error('Navigation elements not found');
            return;
        }
    
        // Toggle mobile menu
        function toggleMobileMenu() {
            const isOpen = mobileMenu.classList.contains('active');
            console.log('Toggling menu. Currently open:', isOpen);
            
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        }
    
        // Open mobile menu
        function openMobileMenu() {
            console.log('Opening mobile menu...');
            hamburger.classList.add('active');
            mobileMenu.classList.add('active');
            body.classList.add('menu-open');
        }
    
        // Close mobile menu
        function closeMobileMenu() {
            console.log('Closing mobile menu...');
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    
        // Hamburger click event - WITH DEBUGGING
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked successfully!');
            toggleMobileMenu();
        });
    
        // Debug: Add visual feedback when hamburger is clicked
        hamburger.addEventListener('mousedown', function() {
            console.log('Hamburger mouse down detected');
            this.style.background = 'rgba(52, 152, 219, 0.2)';
        });
    
        hamburger.addEventListener('mouseup', function() {
            console.log('Hamburger mouse up detected');
            setTimeout(() => {
                this.style.background = '';
            }, 150);
        });
    
        // Close menu when clicking on mobile nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Mobile link clicked - closing menu');
                closeMobileMenu();
            });
        });
    
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
                if (mobileMenu.classList.contains('active')) {
                    console.log('Clicked outside - closing menu');
                    closeMobileMenu();
                }
            }
        });
    
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                console.log('Escape key pressed - closing menu');
                closeMobileMenu();
            }
        });
    
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                console.log('Window resized - closing menu');
                closeMobileMenu();
            }
        });
    
        console.log('Navigation initialized successfully!');
    });
    
        });
    })();


// Wait for DOM to load
