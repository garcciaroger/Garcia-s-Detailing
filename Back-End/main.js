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
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});