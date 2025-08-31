// nav.js - Updated version
window.initNavigation = function() {
    console.log('🍔 Initializing navigation...');
    
    const hamburger = document.getElementById('navHamburgerUnique');
    const overlay = document.getElementById('navMobileOverlayUnique');
    const mobileLinks = document.querySelectorAll('.nav-mobile-link-unique');
    
    if (!hamburger || !overlay) {
        console.error('❌ Navigation elements not found');
        return;
    }
    
    let isOpen = false;
    
    // Toggle menu function
    function toggleMenu() {
        isOpen = !isOpen;
        
        if (isOpen) {
            hamburger.classList.add('nav-active-unique');
            overlay.classList.add('nav-active-unique');
            document.body.classList.add('nav-menu-open-unique');
        } else {
            hamburger.classList.remove('nav-active-unique');
            overlay.classList.remove('nav-active-unique');
            document.body.classList.remove('nav-menu-open-unique');
        }
    }
    
    // Event listeners
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    // Close on mobile link clicks
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (isOpen) toggleMenu();
        });
    });
    
    // Close on outside click
    document.addEventListener('click', function(e) {
        if (isOpen && !hamburger.contains(e.target) && !overlay.contains(e.target)) {
            toggleMenu();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOpen) {
            toggleMenu();
        }
    });
    
    // Close on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isOpen) {
            toggleMenu();
        }
    });
    
    console.log('✅ Navigation initialized successfully');
};
