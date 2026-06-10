document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a, .scroll-down').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetHref = this.getAttribute('href');
            
            // Ignore links that point to other HTML pages
            if (targetHref === '#' || targetHref.includes('.html')) {
                return; // Let standard browser navigation happen
            }
            
            // For same-page anchor links, do smooth scrolling
            e.preventDefault();
            try {
                const targetElement = document.querySelector(targetHref);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (err) {
                console.error('Invalid selector:', targetHref);
            }
        });
    });

    // Navigation background change on scroll
    const nav = document.querySelector('.architect-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve if you only want the animation to happen once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial load animations for Hero Section
    setTimeout(() => {
        document.querySelectorAll('.hero .reveal-text').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // Observe elements to reveal on scroll
    document.querySelectorAll('.reveal-up, .section .reveal-text').forEach(el => {
        revealObserver.observe(el);
    });

    // Simple Parallax Effect for Hero Background
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            if (scrollPosition < window.innerHeight) {
                // Move background slightly to create parallax
                heroBg.style.transform = `translate3d(0, ${scrollPosition * 0.4}px, 0)`;
            }
        });
    }
});
