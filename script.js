// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Highlight active navigation link
    highlightActiveNav();

    // Handling contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Adding smooth scroll behavior for anchor links
    setupSmoothScroll();
    
    // Adding fade-in animation for page content
    animatePageContent();
    
    // Project cards interaction
    setupProjectCards();
    
    // Achievement cards animation on scrolling
    setupScrollAnimations();
});


 //Highlight the active navigation link based on current page
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}


 // Handling contact form submission
 
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulating form submission
    const submitButton = e.target.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulating API call with timeout
    setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        e.target.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}


//Validating email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


//Showing notification message
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Adding styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Removing after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

//Setting up smooth scrolling for anchor links
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

//Animating page content on load

function animatePageContent() {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            mainContent.style.transition = 'all 0.6s ease-out';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
}

//Setting up project cards interaction

function setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Adding  staggered animation on page load
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
        
        // Add click event to project links
        const projectLink = card.querySelector('.project-link');
        if (projectLink) {
            projectLink.addEventListener('click', function(e) {
                e.preventDefault();
                showNotification('Project is Private!, you do not have access to it', 'success');
            });
        }
    });
}

//Settingup scroll animations for achievement cards

function setupScrollAnimations() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    if (achievementCards.length === 0) return;
    
    // Initial state
    achievementCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    achievementCards.forEach(card => {
        observer.observe(card);
    });
}

//Adding keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Press 'Escape' to clear form
    if (e.key === 'Escape') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA') {
            activeElement.blur();
        }
    }
});

//Adding CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Contact form submission handling
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert('Please fill all fields.');
      return;
    }

    // ===== CONFIGURE: set your WhatsApp number (no +, country code included) and your email =====
    const OWNER_WHATSAPP_NUMBER = '918296833381'; // e.g. 918296833381
    const OWNER_EMAIL = 'narensonu1520@gmail.com';
    // ==============================================================================================

    const body = `Hi, I got your message from the website.%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;

    // Open WhatsApp chat with your number and prefilled message
    const waUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${body}`;

    // Mailto fallback (opens email client)
    const mailto = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent('Website contact from ' + name)}&body=${decodeURIComponent(body)}`;

    // Ask user which app to use
    const choice = confirm('Send via WhatsApp? OK = WhatsApp, Cancel = Email');

    if (choice) {
      // open WhatsApp (if on desktop will open WhatsApp Web)
      window.open(waUrl, '_blank');
    } else {
      // open default email client
      window.location.href = mailto;
    }

    // Optionally clear form
    form.reset();
  });
});