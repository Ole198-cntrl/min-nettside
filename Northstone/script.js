// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQ Accordion Functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Modal Functionality
function openPreview() {
    const modal = document.getElementById('previewModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePreview() {
    const modal = document.getElementById('previewModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    const modal = document.getElementById('previewModal');
    if (event.target === modal) {
        closePreview();
    }
});

// Verification Functionality
function verifyRegistration() {
    const checkboxes = document.querySelectorAll('.verification-checkbox');
    const checkedBoxes = Array.from(checkboxes).filter(cb => cb.checked);
    
    if (checkedBoxes.length === 0) {
        alert('Please select at least one affiliate partner you have signed up with.');
        return;
    }
    
    const selectedPartners = checkedBoxes.map(cb => cb.name).join(', ');
    
    // Simulate verification process
    const verifyButton = document.querySelector('.verify-button');
    const originalText = verifyButton.innerHTML;
    
    verifyButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
    verifyButton.disabled = true;
    
    setTimeout(() => {
        verifyButton.innerHTML = '<i class="fas fa-check"></i> Verification Sent!';
        verifyButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        
        // Show success message
        const message = `Thank you! Your verification has been sent for: ${selectedPartners}. We'll contact you via email or Telegram within 24 hours.`;
        alert(message);
        
        // Reset button after 3 seconds
        setTimeout(() => {
            verifyButton.innerHTML = originalText;
            verifyButton.style.background = 'var(--gradient-gold)';
            verifyButton.disabled = false;
        }, 3000);
    }, 2000);
}

// Contact Form Submission
document.querySelector('.contact-form-inputs').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simulate form submission
    const submitButton = this.querySelector('.contact-submit-button');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
        submitButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        
        alert(`Thank you ${name}! Your message has been sent. We'll get back to you soon.`);
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.style.background = 'var(--gradient-gold)';
            submitButton.disabled = false;
        }, 3000);
    }, 1500);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.step, .partner-card, .contact-item, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Partner link tracking
document.querySelectorAll('.partner-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const partner = this.getAttribute('data-partner');
        const href = this.getAttribute('href');
        
        // If it's a real affiliate link, let it redirect
        if (href && href !== '#') {
            // Track the click
            trackEvent('affiliate_click', { 
                partner: partner,
                link: href
            });
            
            // Let the link work normally (opens in new tab)
            return;
        }
        
        // For placeholder links, show message
        e.preventDefault();
        const message = `Redirecting to ${partner}... Please complete your registration there and return to verify your account.`;
        alert(message);
    });
});

// Contact link functionality
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.textContent.includes('Email')) {
            e.preventDefault();
            window.location.href = 'mailto:esp_jak@hotmail.com';
        } else if (this.textContent.includes('Channel')) {
            e.preventDefault();
            alert('Telegram channel link would be added here in production.');
        }
    });
});

// Performance tracking (simulated)
function trackEvent(eventName, data = {}) {
    console.log(`Event: ${eventName}`, data);
    // In production, this would send data to analytics
}

// Track important user interactions
document.addEventListener('DOMContentLoaded', () => {
    trackEvent('page_view', { page: 'home' });
    
    // Track CTA clicks
    document.querySelectorAll('.cta-button, .secondary-button').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('cta_click', { 
                button_text: button.textContent.trim(),
                section: button.closest('section')?.id || 'unknown'
            });
        });
    });
    
    // Track form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            trackEvent('form_submit', { 
                form_type: form.classList.contains('newsletter-form') ? 'newsletter' : 'verification'
            });
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePreview();
    }
});

// Add loading states for better UX
function showLoading(element, text = 'Loading...') {
    const originalContent = element.innerHTML;
    element.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`;
    element.disabled = true;
    return originalContent;
}

function hideLoading(element, originalContent) {
    element.innerHTML = originalContent;
    element.disabled = false;
}

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('Website error:', e.error);
    // In production, this would send to error tracking service
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 