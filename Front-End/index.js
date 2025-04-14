Detailing/Front-End/index.js

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 70px offset for header
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileNav = document.querySelector('.nav-links[data-visible="true"]');
                if (mobileNav) {
                    mobileNav.setAttribute('data-visible', false);
                    const toggle = document.querySelector('.mobile-nav-toggle[aria-expanded="true"]');
                    if (toggle) {
                        toggle.setAttribute('aria-expanded', false);
                        toggle.innerHTML = '<span class="sr-only">Menu</span><i class="fas fa-bars" aria-hidden="true"></i>';
                    }
                }
            }
        });
    });
    
    // Sticky navigation on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const nav = document.querySelector('.nav-links');
        const headerHeight = header.getBoundingClientRect().height;
        
        if (window.scrollY > 100) {
            nav.classList.add('sticky');
            header.classList.add('scrolled');
        } else {
            nav.classList.remove('sticky');
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const visibility = navLinks.getAttribute('data-visible');
            
            if (visibility === "true") {
                navLinks.setAttribute('data-visible', false);
                navToggle.setAttribute('aria-expanded', false);
                navToggle.innerHTML = '<span class="sr-only">Menu</span><i class="fas fa-bars" aria-hidden="true"></i>';
            } else {
                navLinks.setAttribute('data-visible', true);
                navToggle.setAttribute('aria-expanded', true);
                navToggle.innerHTML = '<span class="sr-only">Close</span><i class="fas fa-times" aria-hidden="true"></i>';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.getAttribute('data-visible') === 'true') {
                navLinks.setAttribute('data-visible', false);
                navToggle.setAttribute('aria-expanded', false);
                navToggle.innerHTML = '<span class="sr-only">Menu</span><i class="fas fa-bars" aria-hidden="true"></i>';
            }
        });
    });
    
    // Image gallery lightbox for "Our Work" section
    const workImages = document.querySelectorAll('.grid-item-1 img, .grid-item-2 img, .grid-item-3 img, .grid-item-4 img, .grid-item-5 img');
    
    // Create lightbox container if it doesn't exist
    let lightbox = document.querySelector('.lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close">&times;</span>
                <img class="lightbox-image">
                <div class="lightbox-caption"></div>
            </div>
        `;
        document.body.appendChild(lightbox);
    }
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeButton = lightbox.querySelector('.close');
    
    // Add click event to each gallery image
    workImages.forEach(img => {
        img.addEventListener('click', function() {
            lightboxImage.src = this.src;
            lightboxCaption.textContent = this.alt;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });
    
    // Close lightbox when clicking close button or outside the image
    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
    
    // Service card hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-grid-item1');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('img').style.opacity = '0.8';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('img').style.opacity = '0.6';
        });
    });
    
    // Simple form validation for contact form if it exists
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const requiredFields = contactForm.querySelectorAll('[required]');
            let valid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!valid) {
                e.preventDefault();
                alert('Please fill out all required fields');
            }
        });
    }
    
    // Add CSS for new JavaScript features
    addStyles();
    
    function addStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .nav-links.sticky {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 1000;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                padding: 1rem 0;
            }
            
            .lightbox {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 1001;
                justify-content: center;
                align-items: center;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 80%;
                max-height: 80%;
            }
            
            .lightbox-image {
                max-width: 100%;
                max-height: 80vh;
                display: block;
                border: 3px solid white;
            }
            
            .lightbox-caption {
                color: white;
                text-align: center;
                padding: 10px;
                font-size: 16px;
            }
            
            .close {
                position: absolute;
                top: -30px;
                right: 0;
                color: white;
                font-size: 30px;
                font-weight: bold;
                cursor: pointer;
            }
            
            .error {
                border: 2px solid red !important;
                background-color: rgba(255, 0, 0, 0.1);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .service-grid-item1 {
                animation: fadeIn 0.8s;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Animated counter for statistics if they exist
    const counterElements = document.querySelectorAll('.counter');
    if (counterElements.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const countTarget = parseInt(entry.target.getAttribute('data-count'));
                    let count = 0;
                    const interval = setInterval(() => {
                        entry.target.textContent = count;
                        if (count >= countTarget) {
                            clearInterval(interval);
                        }
                        count += Math.ceil(countTarget / 20); // Adjust speed based on target
                        if (count > countTarget) count = countTarget;
                    }, 50);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        counterElements.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Create the fixed navigation bar
    const header = document.querySelector('.header');
    const headerContainer = document.querySelector('.header-container');
    const fixedNav = headerContainer.cloneNode(true);
    fixedNav.classList.add('nav-fixed');
    document.body.appendChild(fixedNav);
    
    // Mobile menu toggle for the fixed navigation
    const mobileToggle = fixedNav.querySelector('.mobile-nav-toggle');
    const navLinksFixed = fixedNav.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const visibility = navLinksFixed.getAttribute('data-visible');
            
            if (visibility === "true") {
                navLinksFixed.setAttribute('data-visible', false);
                mobileToggle.setAttribute('aria-expanded', false);
                mobileToggle.innerHTML = '<span class="sr-only">Menu</span><i class="fas fa-bars" aria-hidden="true"></i>';
            } else {
                navLinksFixed.setAttribute('data-visible', true);
                mobileToggle.setAttribute('aria-expanded', true);
                mobileToggle.innerHTML = '<span class="sr-only">Close</span><i class="fas fa-times" aria-hidden="true"></i>';
            }
        });
    }
    
    // Handle scroll events for showing/hiding fixed navigation
    let lastScrollTop = 0;
    const navbarHeight = 70;
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Show fixed navigation once we've scrolled past the header
        if (scrollTop > header.offsetHeight - navbarHeight) {
            fixedNav.classList.add('show');
            
            // Highlight the current section in the navigation
            highlightCurrentSection();
        } else {
            fixedNav.classList.remove('show');
        }
        
        // Hide navigation when scrolling down on mobile (optional feature)
        if (window.innerWidth < 768) {
            if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
                // Scrolling down
                fixedNav.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                fixedNav.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Highlight the current section in the navigation
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-fixed .nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
});