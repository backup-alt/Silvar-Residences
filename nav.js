console.log('Navigation script loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ready');
    
    // Get elements
    const hamburger = document.getElementById('mobileToggle');
    const overlay = document.getElementById('mobileOverlay');
    const body = document.body;
    
    console.log('Hamburger element:', hamburger);
    console.log('Overlay element:', overlay);
    
    if (hamburger && overlay) {
        console.log('Both elements found - adding event listeners');
        
        // Toggle menu function
        function toggleMenu() {
            console.log('Toggle menu called');
            
            const isOpen = overlay.classList.contains('active');
            
            if (isOpen) {
                // Close menu
                overlay.classList.remove('active');
                hamburger.classList.remove('active');
                body.classList.remove('menu-open');
                console.log('Menu closed');
            } else {
                // Open menu
                overlay.classList.add('active');
                hamburger.classList.add('active');
                body.classList.add('menu-open');
                console.log('Menu opened');
            }
        }
        
        // Hamburger click event
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Hamburger clicked');
            toggleMenu();
        });
        
        // Close menu when clicking on overlay background
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                console.log('Overlay background clicked');
                toggleMenu();
            }
        });
        
        // Close menu when clicking on mobile nav links
        const mobileLinks = overlay.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Mobile link clicked - closing menu');
                toggleMenu();
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                console.log('Escape key pressed - closing menu');
                toggleMenu();
            }
        });
        
    } else {
        console.error('Required elements not found!');
        console.error('Hamburger:', hamburger);
        console.error('Overlay:', overlay);
    }
});
