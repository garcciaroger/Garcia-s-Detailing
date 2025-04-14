document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const visibility = navLinks.getAttribute('data-visible') === 'true';
            navLinks.setAttribute('data-visible', !visibility);
            navToggle.setAttribute('aria-expanded', !visibility);
            
            if (!visibility) {
                navToggle.innerHTML = '<span class="sr-only">Close</span><i class="fas fa-times" aria-hidden="true"></i>';
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                navToggle.innerHTML = '<span class="sr-only">Menu</span><i class="fas fa-bars" aria-hidden="true"></i>';
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Reset error styles
            removeErrorStyles([name, email, message]);
            
            // Validate name
            if (!name.value.trim()) {
                addErrorStyle(name, 'Please enter your name');
                valid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                addErrorStyle(email, 'Please enter your email');
                valid = false;
            } else if (!isValidEmail(email.value)) {
                addErrorStyle(email, 'Please enter a valid email address');
                valid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                addErrorStyle(message, 'Please enter your message');
                valid = false;
            }
            
            if (!valid) {
                e.preventDefault();
            }
        });
    }
    
    // Helper functions
    function addErrorStyle(element, message) {
        element.style.borderColor = 'red';
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
        errorMessage.style.fontSize = '0.8rem';
        errorMessage.style.marginTop = '5px';
        
        element.parentNode.appendChild(errorMessage);
    }
    
    function removeErrorStyles(elements) {
        elements.forEach(element => {
            element.style.borderColor = '';
            
            const errorMessages = element.parentNode.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.remove());
        });
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }
});