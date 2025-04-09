document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .footer-links a, .primary-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to links that start with #
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed navbar
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Sticky navigation bar with color change on scroll
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.style.backgroundColor = 'rgba(26, 75, 132, 0.95)'; // Primary color with opacity
            nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            nav.style.boxShadow = 'none';
        }
    });
    
    // Form submission handling
    const joinForm = document.getElementById('join-form');
    
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                zip: document.getElementById('zip').value,
                volunteer: document.getElementById('volunteer').checked
            };
            
            // In a real application, you would send this data to a server
            console.log('Form submitted with data:', formData);
            console.log('Form submission successful!');
            
            // Show success message
            const formContainer = document.querySelector('.form-container');
            formContainer.innerHTML = `
                <div class="success-message">
                    <h3>Thank You for Joining!</h3>
                    <p>Thank you, ${formData.name}! Your information has been submitted successfully.</p>
                    <p>We'll be in touch soon with updates on our campaign.</p>
                    ${formData.volunteer ? '<p>We appreciate your interest in volunteering and will contact you with opportunities soon!</p>' : ''}
                </div>
            `;
        });
    }
    
    // Animate policy cards on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation class to CSS
    const style = document.createElement('style');
    style.textContent = `
        .policy-card, .value-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .policy-card.animate, .value-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Observe all policy and value cards
    const cards = document.querySelectorAll('.policy-card, .value-card');
    cards.forEach(card => {
        observer.observe(card);
    });
    
    // Add delay to each card for staggered animation
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Mobile navigation toggle (for responsive design)
    const createMobileNav = () => {
        if (window.innerWidth <= 768) {
            // Only create if it doesn't exist yet
            if (!document.querySelector('.mobile-nav-toggle')) {
                const nav = document.querySelector('nav');
                const navLinks = document.querySelector('.nav-links');
                
                // Create toggle button
                const toggleButton = document.createElement('button');
                toggleButton.classList.add('mobile-nav-toggle');
                toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
                nav.insertBefore(toggleButton, navLinks);
                
                // Add styles
                const mobileStyle = document.createElement('style');
                mobileStyle.textContent = `
                    .mobile-nav-toggle {
                        background: none;
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                        display: none;
                    }
                    
                    @media (max-width: 768px) {
                        .mobile-nav-toggle {
                            display: block;
                        }
                        
                        .nav-links {
                            position: absolute;
                            top: 100%;
                            left: 0;
                            right: 0;
                            flex-direction: column;
                            background-color: rgba(26, 75, 132, 0.95);
                            padding: 1rem;
                            display: none;
                        }
                        
                        .nav-links.active {
                            display: flex;
                        }
                    }
                `;
                document.head.appendChild(mobileStyle);
                
                // Toggle functionality
                toggleButton.addEventListener('click', () => {
                    navLinks.classList.toggle('active');
                    
                    // Change icon based on state
                    if (navLinks.classList.contains('active')) {
                        toggleButton.innerHTML = '<i class="fas fa-times"></i>';
                    } else {
                        toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                });
                
                // Close menu when clicking a link
                navLinks.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        navLinks.classList.remove('active');
                        toggleButton.innerHTML = '<i class="fas fa-bars"></i>';
                    });
                });
            }
        }
    };
    
    // Initialize mobile nav
    createMobileNav();
    
    // Update on resize
    window.addEventListener('resize', createMobileNav);
});
