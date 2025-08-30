// BULLETPROOF NAVIGATION - Completely isolated
(function() {
    'use strict';
    
    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        initNavigation();
    }
    
    function initNavigation() {
        console.log('🍔 Bulletproof Navigation Starting...');
        
        // Get elements with unique selectors
        const hamburger = document.getElementById('navHamburgerUnique');
        const mobileOverlay = document.getElementById('navMobileOverlayUnique');
        const mobileLinks = document.querySelectorAll('.nav-mobile-link-unique');
        const body = document.body;
        
        // Verify elements exist
        if (!hamburger || !mobileOverlay) {
            console.error('❌ Navigation elements not found');
            return;
        }
        
        console.log('✅ Navigation elements found');
        
        // State management
        let isMenuOpen = false;
        
        // Toggle function
        function toggleMenu() {
            isMenuOpen = !isMenuOpen;
            console.log('🔄 Menu toggle:', isMenuOpen ? 'OPENING' : 'CLOSING');
            
            if (isMenuOpen) {
                hamburger.classList.add('nav-active-unique');
                mobileOverlay.classList.add('nav-active-unique');
                body.classList.add('nav-menu-open-unique');
                hamburger.setAttribute('aria-expanded', 'true');
            } else {
                hamburger.classList.remove('nav-active-unique');
                mobileOverlay.classList.remove('nav-active-unique');
                body.classList.remove('nav-menu-open-unique');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
        
        // Close menu function
        function closeMenu() {
            if (isMenuOpen) {
                isMenuOpen = false;
                hamburger.classList.remove('nav-active-unique');
                mobileOverlay.classList.remove('nav-active-unique');
                body.classList.remove('nav-menu-open-unique');
                hamburger.setAttribute('aria-expanded', 'false');
                console.log('📱 Menu closed');
            }
        }
        
        // Event listeners
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Hamburger clicked!');
            toggleMenu();
        });
        
        // Visual feedback on touch
        hamburger.addEventListener('touchstart', function() {
            this.style.background = 'rgba(52, 152, 219, 0.2)';
        }, { passive: true });
        
        hamburger.addEventListener('touchend', function() {
            const self = this;
            setTimeout(function() {
                self.style.background = '';
            }, 150);
        }, { passive: true });
        
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
        
        // Close on outside click
        document.addEventListener('click', function(e) {
            if (isMenuOpen && 
                !hamburger.contains(e.target) && 
                !mobileOverlay.contains(e.target)) {
                console.log('🖱️ Outside click detected');
                closeMenu();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                console.log('📱 Window resized - closing menu');
                closeMenu();
            }
        });
        
        // Set initial aria state
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', 'Toggle navigation menu');
        
        console.log('🎉 Bulletproof Navigation Ready!');
        
        // Test function - remove after confirming it works
        window.testNavigation = function() {
            console.log('🧪 Testing navigation...');
            console.log('Hamburger element:', hamburger);
            console.log('Mobile overlay:', mobileOverlay);
            console.log('Current menu state:', isMenuOpen);
        };
    }
})();
