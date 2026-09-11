// ============================================
// AR STUDIOS - Interactive Functionality
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeServiceFiltering();
    initializeScrollAnimations();
    initializeNavigation();
});

// Service Filtering Functionality
function initializeServiceFiltering() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter services
            filterServices(category, serviceCards);
        });
    });

    // Set "All Services" as default active
    document.querySelector('.tab-btn[data-category="all"]').classList.add('active');
}

function filterServices(category, cards) {
    cards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            // Remove hidden class to show
            card.classList.remove('hidden');
            
            // Reset animation
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = `fadeIn 0.5s ease forwards`;
                card.style.animationDelay = `${index * 0.05}s`;
            }, 10);
        } else {
            card.classList.add('hidden');
        }
    });
}

// Scroll Animation Effects
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.about, .services, .cta-section, .contact').forEach(el => {
        observer.observe(el);
    });
}

// Navigation Link Smooth Scroll
function initializeNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for external links with #
            if (href === '#' || href.startsWith('http')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.style.borderBottomColor = 'rgba(212, 175, 55, 0.3)';
    } else {
        header.style.borderBottomColor = 'rgba(51, 51, 51, 1)';
    }
});

// Mobile Menu Toggle (for future implementation)
function closeMobileMenu() {
    // Add mobile menu functionality if needed
}

// Smooth Counter Animation for Service Numbers
function animateServiceNumbers() {
    const serviceNumbers = document.querySelectorAll('.service-number');
    
    serviceNumbers.forEach(number => {
        number.style.opacity = '0.5';
        number.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.color = '#e5c158';
        });
        
        number.addEventListener('mouseleave', function() {
            this.style.opacity = '0.7';
            this.style.color = '#d4af37';
        });
    });
}

// Initialize service number animations
document.addEventListener('DOMContentLoaded', animateServiceNumbers);

// Button Click Analytics (optional - for tracking)
function trackButtonClick(buttonName) {
    console.log(`Button clicked: ${buttonName}`);
    // Add your analytics tracking here
}

// CTA Button Tracking
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        trackButtonClick(buttonText);
    });
});

// Service Card Hover Effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Add any additional hover effects here
        this.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Contact Card Animations
document.querySelectorAll('.contact-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = 'fadeIn 0.8s ease forwards';
});

// About Card Animations
document.querySelectorAll('.about-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = 'fadeIn 0.8s ease forwards';
});

// Lazy Load Images (for future optimization)
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add scroll to top button functionality (optional enhancement)
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTop';
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #d4af37;
        color: #0a0a0a;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        font-weight: bold;
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.backgroundColor = '#e5c158';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.backgroundColor = '#d4af37';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Form Link Tracking
document.querySelectorAll('a[href*="forms.gle"]').forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('User initiated inquiry form');
    });
});

// Social Media Link Tracking
document.querySelectorAll('a[href*="instagram.com"], a[href*="linkedin.com"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const platform = this.href.includes('instagram') ? 'Instagram' : 'LinkedIn';
        console.log(`User clicked ${platform} link`);
    });
});

// Performance: Add fade-in keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize all on page load
window.addEventListener('load', function() {
    console.log('AR STUDIOS Website Loaded Successfully');
    
    // Trigger animations on load
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.animation = 'fadeIn 0.5s ease forwards';
    });
});

// Error handling for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('error', function() {
        console.error('Link error:', this.href);
    });
});

// Add page visibility API for tracking
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('User left the page');
    } else {
        console.log('User returned to the page');
    }
});

// Accessibility: Add focus management
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Clear any active states if needed
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.blur();
        });
    }
});

// Mobile viewport height fix
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);

// Export functions for console debugging
window.ARStudios = {
    filterServices: filterServices,
    trackButtonClick: trackButtonClick,
    lazyLoadImages: lazyLoadImages,
    version: '1.0.0'
};

console.log('AR STUDIOS - Premium Digital Marketing & Creative Agency');
console.log('Version:', window.ARStudios.version);
