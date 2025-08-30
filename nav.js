// ENHANCED BULLETPROOF NAVIGATION - Works on all pages
(function() {
    'use strict';
    
    // Enhanced initialization with retries
    function initNavigation() {
        console.log('🍔 Navigation Starting on:', window.location.pathname);
        
        // Multiple attempts to find elements
        const hamburger = document.getElementById('navHamburgerUnique') || 
                         document.querySelector('.nav-hamburger-unique') ||
                         document.querySelector('[id="navHamburgerUnique"]');
                         
        const mobileOverlay = document.getElementById('navMobileOverlayUnique') || 
                             document.querySelector('.nav-mobile-overlay-unique') ||
                             document.querySelector('[id="navMobileOverlayUnique"]');
                             
        const mobileLinks = document.querySelectorAll('.nav-mobile-link-unique');
        const body = document.body;
        const logo = document.querySelector('.logo');
        
        // Enhanced debugging
        console.log('🔍 Element check:');
        console.log('  - Hamburger found:', !!hamburger);
        console.log('  - Mobile overlay found:', !!mobileOverlay);
        console.log('  - Mobile links found:', mobileLinks.length);
        console.log('  - Current URL:', window.location.href);
        
        if (!hamburger) {
            console.error('❌ Hamburger element not found');
            console.log('Available elements with nav-hamburger class:', document.querySelectorAll('[class*="hamburger"]'));
        }
        
        if (!mobileOverlay) {
            console.error('❌ Mobile overlay not found');
            console.log('Available elements with mobile-overlay class:', document.querySelectorAll('[class*="mobile-overlay"]'));
        }
        
        if (!hamburger || !mobileOverlay) {
            console.log('⏳ Retrying in 500ms...');
            setTimeout(initNavigation, 500);
            return;
        }
        
        console.log('✅ All navigation elements found - Initializing...');
        
        // State management
        let isMenuOpen = false;
        
        // Enhanced toggle function with extensive logging
        function toggleMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            
            isMenuOpen = !isMenuOpen;
            console.log('🔄 Menu toggle on', window.location.pathname, ':', isMenuOpen ? 'OPENING' : 'CLOSING');
            
            // Apply changes with multiple fallbacks
            try {
                if (isMenuOpen) {
                    // Open menu
                    hamburger.classList.add('nav-active-unique');
                    mobileOverlay.classList.add('nav-active-unique');
                    body.classList.add('nav-menu-open-unique');
                    hamburger.setAttribute('aria-expanded', 'true');
                    
                    // Force styles as backup
                    mobileOverlay.style.transform = 'translateX(0)';
                    mobileOverlay.style.opacity = '1';
                    mobileOverlay.style.visibility = 'visible';
                    mobileOverlay.style.display = 'flex';
                    
                    console.log('✅ Menu opened successfully');
                    
                } else {
                    // Close menu
                    hamburger.classList.remove('nav-active-unique');
                    mobileOverlay.classList.remove('nav-active-unique');
                    body.classList.remove('nav-menu-open-unique');
                    hamburger.setAttribute('aria-expanded', 'false');
                    
                    // Reset styles
                    setTimeout(() => {
                        mobileOverlay.style.transform = '';
                        mobileOverlay.style.opacity = '';
                        mobileOverlay.style.visibility = '';
                        mobileOverlay.style.display = '';
                    }, 400);
                    
                    console.log('✅ Menu closed successfully');
                }
            } catch (error) {
                console.error('❌ Error toggling menu:', error);
            }
        }
        
        // Close menu function
        function closeMenu() {
            if (isMenuOpen) {
                console.log('🔒 Closing menu from external trigger');
                toggleMenu();
            }
        }
        
        // ENHANCED EVENT LISTENERS with extensive fallbacks
        
        // Primary click event with detailed logging
        hamburger.addEventListener('click', function(e) {
            console.log('🖱️ Hamburger clicked on:', window.location.pathname);
            toggleMenu(e);
        }, { capture: true });
        
        // Touch events for mobile
        hamburger.addEventListener('touchstart', function(e) {
            console.log('📱 Touch start on hamburger');
            this.style.background = 'rgba(52, 152, 219, 0.3)';
        }, { passive: true });
        
        hamburger.addEventListener('touchend', function(e) {
            console.log('📱 Touch end on hamburger');
            const self = this;
            setTimeout(() => self.style.background = '', 150);
        }, { passive: true });
        
        // Double-click protection
        let clickTimeout;
        hamburger.addEventListener('mousedown', function(e) {
            clearTimeout(clickTimeout);
            clickTimeout = setTimeout(() => {
                console.log('🖱️ Mouse interaction confirmed');
            }, 100);
        });
        
        // Keyboard support
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                console.log('⌨️ Keyboard activate hamburger');
                toggleMenu(e);
            }
        });
        
        // Logo click handler
        if (logo) {
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🏠 Logo clicked - navigating to index.html');
                window.location.href = 'index.html';
            });
            
            logo.setAttribute('tabindex', '0');
            logo.setAttribute('role', 'link');
            logo.setAttribute('aria-label', 'Go to homepage');
        }
        
        // Mobile link handlers
        mobileLinks.forEach(function(link, index) {
            link.addEventListener('click', function() {
                console.log('🔗 Mobile link', index, 'clicked');
                closeMenu();
            });
        });
        
        // Outside click handler
        document.addEventListener('click', function(e) {
            if (isMenuOpen && 
                !hamburger.contains(e.target) && 
                !mobileOverlay.contains(e.target)) {
                console.log('🖱️ Outside click - closing menu');
                closeMenu();
            }
        }, { capture: true });
        
        // Escape key handler
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                console.log('⌨️ Escape pressed - closing menu');
                closeMenu();
            }
        });
        
        // Window resize handler
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                console.log('📱 Resize detected - closing menu');
                closeMenu();
            }
        });
        
        // Page visibility handler (for browser tab switching)
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && isMenuOpen) {
                console.log('👁️ Page hidden - closing menu');
                closeMenu();
            }
        });
        
        // Force proper styling
        hamburger.style.pointerEvents = 'auto';
        hamburger.style.zIndex = '1000001';
        
        // Set ARIA attributes
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('tabindex', '0');
        
        console.log('🎉 Navigation Ready on:', window.location.pathname);
        
        // Global test function
        window.testNavigation = function() {
            console.log('🧪 Navigation Test Results:');
            console.log('  - Page:', window.location.pathname);
            console.log('  - Hamburger:', !!hamburger);
            console.log('  - Overlay:', !!mobileOverlay);
            console.log('  - Menu state:', isMenuOpen);
            console.log('  - Hamburger classes:', hamburger?.className);
            
            if (hamburger && mobileOverlay) {
                console.log('  - Testing toggle...');
                toggleMenu();
            }
        };
    }
    
    // Enhanced DOM ready detection
    function domReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            setTimeout(callback, 0);
        }
    }
    
    // Initialize with retries
    domReady(function() {
        console.log('📄 DOM ready, starting navigation...');
        initNavigation();
        
        // Backup initialization after slight delay
        setTimeout(initNavigation, 1000);
    });
    
})();
