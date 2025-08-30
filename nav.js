// BULLETPROOF NAVIGATION - Enhanced for blur effects
(function() {
    'use strict';
    
    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
    
    function initNavigation() {
        console.log('🍔 Enhanced Navigation Starting...');
        
        // Multiple selection methods to ensure elements are found
        const hamburger = document.getElementById('navHamburgerUnique') || 
                         document.querySelector('.nav-hamburger-unique');
        const mobileOverlay = document.getElementById('navMobileOverlayUnique') || 
                             document.querySelector('.nav-mobile-overlay-unique');
        const mobileLinks = document.querySelectorAll('.nav-mobile-link-unique');
        const body = document.body;
        
        // Debug logging
        console.log('Hamburger found:', !!hamburger);
        console.log('Mobile overlay found:', !!mobileOverlay);
        
        if (!hamburger || !mobileOverlay) {
            console.error('❌ Navigation elements not found');
            
            // Retry after short delay
            setTimeout(initNavigation, 100);
            return;
        }
        
        console.log('✅ All navigation elements found');
        
        // State management
        let isMenuOpen = false;
        
        // Enhanced toggle function
        function toggleMenu(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
            }
            
            isMenuOpen = !isMenuOpen;
            console.log('🔄 Menu toggle:', isMenuOpen ? 'OPENING' : 'CLOSING');
            
            // Force style updates
            if (isMenuOpen) {
                hamburger.classList.add('nav-active-unique');
                mobileOverlay.classList.add('nav-active-unique');
                body.classList.add('nav-menu-open-unique');
                hamburger.setAttribute('aria-expanded', 'true');
                
                // Force visibility with direct styles as backup
                mobileOverlay.style.transform = 'translateX(0)';
                mobileOverlay.style.opacity = '1';
                mobileOverlay.style.visibility = 'visible';
                
            } else {
                hamburger.classList.remove('nav-active-unique');
                mobileOverlay.classList.remove('nav-active-unique');
                body.classList.remove('nav-menu-open-unique');
                hamburger.setAttribute('aria-expanded', 'false');
                
                // Clear direct styles
                mobileOverlay.style.transform = '';
                mobileOverlay.style.opacity = '';
                mobileOverlay.style.visibility = '';
            }
        }
        
        // Close menu function
        function closeMenu() {
            if (isMenuOpen) {
                toggleMenu();
            }
        }
        
        // MULTIPLE EVENT LISTENERS for reliability
        
        // Primary click event
        hamburger.addEventListener('click', toggleMenu, { capture: true });
        
        // Backup events for different scenarios
        hamburger.addEventListener('touchstart', function(e) {
            console.log('📱 Touch detected on hamburger');
            // Add visual feedback
            this.style.background = 'rgba(52, 152, 219, 0.3)';
        }, { passive: true });
        
        hamburger.addEventListener('touchend', function(e) {
            console.log('📱 Touch end on hamburger');
            const self = this;
            // Reset visual feedback
            setTimeout(() => self.style.background = '', 150);
            
            // Trigger toggle on touch end
            setTimeout(() => toggleMenu(e), 50);
        }, { passive: false });
        
        // Mouse events as backup
        hamburger.addEventListener('mousedown', function(e) {
            console.log('🖱️ Mouse down on hamburger');
            this.style.background = 'rgba(52, 152, 219, 0.2)';
        });
        
        hamburger.addEventListener('mouseup', function(e) {
            console.log('🖱️ Mouse up on hamburger');
            const self = this;
            setTimeout(() => self.style.background = '', 150);
        });
        
        // Keyboard support
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                console.log('⌨️ Keyboard activate hamburger');
                toggleMenu(e);
            }
        });
        
        // Close on mobile link clicks
        mobileLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                console.log('🔗 Mobile link clicked');
                closeMenu();
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                console.log('⌨️ Escape key pressed');
                closeMenu();
            }
        });
        
        // Close on outside click - Enhanced
        document.addEventListener('click', function(e) {
            if (isMenuOpen && 
                !hamburger.contains(e.target) && 
                !mobileOverlay.contains(e.target)) {
                console.log('🖱️ Outside click detected');
                closeMenu();
            }
        }, { capture: true });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                console.log('📱 Window resized - closing menu');
                closeMenu();
            }
        });
        
        // Fix blur-related issues
        hamburger.style.pointerEvents = 'auto';
        hamburger.style.position = 'relative';
        hamburger.style.zIndex = '1000001';
        
        // Set ARIA attributes
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        hamburger.setAttribute('role', 'button');
        hamburger.setAttribute('tabindex', '0');
        
        console.log('🎉 Enhanced Navigation Ready!');
        
        // Global test function
        window.testNavigation = function() {
            console.log('🧪 Testing navigation...');
            console.log('Hamburger element:', hamburger);
            console.log('Mobile overlay:', mobileOverlay);
            console.log('Current menu state:', isMenuOpen);
            console.log('Hamburger classes:', hamburger.className);
            
            // Force toggle test
            toggleMenu();
        };
        
        // Auto-fix common issues
        setTimeout(() => {
            // Ensure proper z-index hierarchy
            if (hamburger) hamburger.style.zIndex = '1000001';
            if (mobileOverlay) mobileOverlay.style.zIndex = '999999';
        }, 100);
    }
})();
