// UNIVERSAL NAVIGATION - Works on ALL pages
(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        hamburgerSelector: '#navHamburgerUnique',
        overlaySelector: '#navMobileOverlayUnique',
        mobileLinksSelector: '.nav-mobile-link-unique',
        logoSelector: '.logo',
        retryAttempts: 5,
        retryDelay: 200
    };
    
    let retryCount = 0;
    let isInitialized = false;
    
    function initNavigation() {
        // Prevent multiple initializations
        if (isInitialized) {
            console.log('🔒 Navigation already initialized');
            return;
        }
        
        console.log(`🍔 Navigation Init Attempt ${retryCount + 1} on:`, window.location.pathname);
        
        // Find elements with multiple fallback methods
        const hamburger = document.querySelector(CONFIG.hamburgerSelector) || 
                         document.querySelector('.nav-hamburger-unique');
                         
        const mobileOverlay = document.querySelector(CONFIG.overlaySelector) || 
                             document.querySelector('.nav-mobile-overlay-unique');
                             
        const mobileLinks = document.querySelectorAll(CONFIG.mobileLinksSelector);
        const logo = document.querySelector(CONFIG.logoSelector);
        
        // Debug current state
        console.log('🔍 Elements found:', {
            hamburger: !!hamburger,
            overlay: !!mobileOverlay,
            links: mobileLinks.length,
            logo: !!logo,
            page: window.location.pathname
        });
        
        // Retry if elements not found
        if (!hamburger || !mobileOverlay) {
            retryCount++;
            if (retryCount < CONFIG.retryAttempts) {
                console.log(`⏳ Retry in ${CONFIG.retryDelay}ms...`);
                setTimeout(initNavigation, CONFIG.retryDelay);
                return;
            } else {
                console.error('❌ Failed to initialize navigation after', CONFIG.retryAttempts, 'attempts');
                return;
            }
        }
        
        // Mark as initialized
        isInitialized = true;
        console.log('✅ Navigation elements found - Initializing...');
        
        // Menu state
        let isMenuOpen = false;
        
        // Toggle function
        function toggleMenu(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            isMenuOpen = !isMenuOpen;
            console.log(`🔄 Menu ${isMenuOpen ? 'OPENING' : 'CLOSING'} on:`, window.location.pathname);
            
            // Update classes and ARIA
            hamburger.classList.toggle('nav-active-unique', isMenuOpen);
            mobileOverlay.classList.toggle('nav-active-unique', isMenuOpen);
            document.body.classList.toggle('nav-menu-open-unique', isMenuOpen);
            hamburger.setAttribute('aria-expanded', isMenuOpen.toString());
            
            // Force styles for reliability
            if (isMenuOpen) {
                mobileOverlay.style.cssText = 'transform: translateX(0) !important; opacity: 1 !important; visibility: visible !important;';
            } else {
                setTimeout(() => {
                    mobileOverlay.style.cssText = '';
                }, 400);
            }
        }
        
        // Close menu
        function closeMenu() {
            if (isMenuOpen) {
                toggleMenu();
            }
        }
        
        // Event listeners
        hamburger.addEventListener('click', toggleMenu);
        
        // Mobile link handlers
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !hamburger.contains(e.target) && !mobileOverlay.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Close on escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
        });
        
        // Close on resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
        
        // Logo click handler
        if (logo) {
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
            
            logo.setAttribute('tabindex', '0');
            logo.setAttribute('role', 'link');
        }
        
        // Set ARIA attributes
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        
        // Global test function
        window.navTest = function() {
            console.log('🧪 Navigation Test:');
            console.log('- Page:', window.location.pathname);
            console.log('- Initialized:', isInitialized);
            console.log('- Menu Open:', isMenuOpen);
            console.log('- Hamburger:', !!hamburger);
            console.log('- Overlay:', !!mobileOverlay);
            toggleMenu();
        };
        
        console.log('🎉 Navigation Ready on:', window.location.pathname);
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
    
    // Backup initialization
    setTimeout(initNavigation, 1000);
    
})();
