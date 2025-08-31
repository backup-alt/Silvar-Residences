// Load navbar from nav.html
document.addEventListener('DOMContentLoaded', function() {
    
    // Import navigation bar
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // After navbar is loaded, initialize navigation functionality
            initializeNavigation();
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            // Fallback if nav.html is not available
            createFallbackNav();
        });
    
    // Initialize other functionality
    initializeBuildButton();
    initializeScrollEffects();
});

function initializeNavigation() {
    // Navigation functionality after navbar is loaded
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
                
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

function createFallbackNav() {
    // Fallback navigation if nav.html fails to load
    const fallbackNav = `
        <nav style="position: fixed; top: 0; width: 100%; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); z-index: 1000; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <div style="font-size: 1.5rem; font-weight: 700; color: #2c3e50;">BuildCraft</div>
            <div style="display: flex; gap: 2rem;">
                <a href="#" style="text-decoration: none; color: #2c3e50; font-weight: 500;">Home</a>
                <a href="#" style="text-decoration: none; color: #3498db; font-weight: 500;">Projects</a>
                <a href="#" style="text-decoration: none; color: #2c3e50; font-weight: 500;">About</a>
                <a href="#" style="text-decoration: none; color: #2c3e50; font-weight: 500;">Contact</a>
            </div>
        </nav>
    `;
    document.getElementById('navbar-placeholder').innerHTML = fallbackNav;
}

function initializeBuildButton() {
    const buildNowBtn = document.getElementById('buildNowBtn');
    
    if (buildNowBtn) {
        buildNowBtn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'translateY(-3px) scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(-3px) scale(1)';
            }, 150);
            
            console.log('Build Now button clicked!');
            
            // Add your functionality here
            alert('Ready to build your dream project? Contact us to get started!');
        });
        
        buildNowBtn.addEventListener('mouseenter', function() {
            console.log('Build Now button hovered');
        });
    }
}

function initializeScrollEffects() {
    // Scroll-based animations
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
}
