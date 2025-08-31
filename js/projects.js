// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    
    // Get navigation elements
    const navLinks = document.querySelectorAll('.nav-right a');
    const heroButton = document.querySelector('.hero button');
    
    // Add active state to current page
    navLinks.forEach(link => {
        if (link.textContent === 'Projects') {
            link.style.color = '#007BFF';
        }
    });
    
    // Hero button click event
    heroButton.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
        
        // You can add your custom action here
        console.log('Build Now button clicked!');
        
        // Example: Scroll to content section
        document.querySelector('.content').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // You can add navigation logic here
            console.log(`Navigating to: ${this.textContent}`);
        });
    });
    
    // Optional: Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = '#fff';
            nav.style.backdropFilter = 'none';
        }
    });
});

// Optional: Add responsive navigation toggle for mobile
function toggleMobileNav() {
    const navRight = document.querySelector('.nav-right');
    navRight.classList.toggle('mobile-active');
}

// You can expand this with more interactive features as needed
