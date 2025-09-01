// Footer functionality and enhancements
document.addEventListener('DOMContentLoaded', function() {
    
    // Update current year automatically
    updateCurrentYear();
    
    // Initialize footer animations
    initializeFooterAnimations();
    
    // Handle contact interactions
    handleContactInteractions();
    
    // Add smooth scroll to footer links
    addSmoothScrolling();
});

function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

function initializeFooterAnimations() {
    // Animate footer elements on scroll
    const footerElements = document.querySelectorAll('.footer-brand, .footer-contact, .footer-links, .footer-social');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const footerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    footerElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        footerObserver.observe(element);
    });
}

function handleContactInteractions() {
    // Add click tracking for contact items
    const phoneLink = document.querySelector('a[href^="tel:"]');
    const emailLink = document.querySelector('a[href^="mailto:"]');
    
    if (phoneLink) {
        phoneLink.addEventListener('click', function() {
            console.log('Phone number clicked');
            // Add analytics tracking here if needed
        });
    }
    
    if (emailLink) {
        emailLink.addEventListener('click', function() {
            console.log('Email clicked');
            // Add analytics tracking here if needed
        });
    }
    
    // Copy contact info on double click
    const contactValues = document.querySelectorAll('.contact-value');
    contactValues.forEach(contact => {
        contact.addEventListener('dblclick', function(e) {
            e.preventDefault();
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showCopyNotification(this);
            });
        });
    });
}

function showCopyNotification(element) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.textContent = 'Copied!';
    notification.style.cssText = `
        position: absolute;
        background: var(--footer-gold);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.8rem;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    element.parentNode.appendChild(notification);
    
    // Position notification
    const rect = element.getBoundingClientRect();
    notification.style.left = '0';
    notification.style.top = '-2rem';
    
    // Show and hide notification
    setTimeout(() => notification.style.opacity = '1', 10);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

function addSmoothScrolling() {
    // Add smooth scrolling to internal footer links
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Social media link handlers
function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add your social media URLs here
            const platform = this.querySelector('i').className;
            console.log(`Social link clicked: ${platform}`);
            
            // Prevent default for demo - remove when adding real URLs
            // e.preventDefault();
        });
    });
}

// Initialize social links when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSocialLinks);

// Responsive footer adjustments
function handleResponsiveFooter() {
    const footer = document.querySelector('.elegant-footer');
    const isMobile = window.innerWidth <= 768;
    
    if (footer) {
        if (isMobile) {
            footer.classList.add('mobile-footer');
        } else {
            footer.classList.remove('mobile-footer');
        }
    }
}

// Handle window resize
window.addEventListener('resize', debounce(handleResponsiveFooter, 250));
window.addEventListener('load', handleResponsiveFooter);

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
