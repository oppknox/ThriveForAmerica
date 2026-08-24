document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.site-nav');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const joinForm = document.getElementById('join-form');
    const desktopQuery = window.matchMedia('(min-width: 1101px)');

    function closeMenu() {
        if (!navToggle || !navLinks) return;
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
        navLinks.classList.remove('is-open');
        document.body.classList.remove('nav-open');
    }

    function openMenu() {
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Close menu');
        navLinks.classList.add('is-open');
        document.body.classList.add('nav-open');
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        desktopQuery.addEventListener('change', function (event) {
            if (event.matches) {
                closeMenu();
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (event) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();
            const navHeight = nav ? nav.offsetHeight : 72;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;

            window.scrollTo({
                top: Math.max(0, top),
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'auto'
                    : 'smooth'
            });
        });
    });

    function updateNavOnScroll() {
        if (!nav) return;
        nav.classList.toggle('is-scrolled', window.scrollY > 80);
    }

    updateNavOnScroll();
    window.addEventListener('scroll', updateNavOnScroll, { passive: true });

    if (joinForm) {
        joinForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                zip: document.getElementById('zip').value,
                volunteer: document.getElementById('volunteer').checked
            };

            const safeName = formData.name
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');

            const formContainer = document.querySelector('.form-container');
            formContainer.innerHTML = `
                <div class="success-message">
                    <h3>Thank You for Joining!</h3>
                    <p>Thank you, ${safeName}! Your information has been submitted successfully.</p>
                    <p>We'll be in touch soon with updates on our campaign.</p>
                    ${formData.volunteer ? '<p>We appreciate your interest in volunteering and will contact you with opportunities soon!</p>' : ''}
                </div>
            `;
        });
    }

});
