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

    // Inject Mobile Floating Bottom Navigation
    const injectMobileNav = () => {
        const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/') || !window.location.pathname.includes('.html');
        const indexPrefix = isIndex ? '' : 'index.html';
        const isPricing = window.location.pathname.includes('pricing.html');
        const isSevenSquare = window.location.pathname.includes('sevensquare.html');
        
        const mobileNavHtml = `
            <div class="mobile-bottom-nav">
                <div class="mobile-bottom-nav-inner">
                    <a href="${indexPrefix}#course" class="mobile-nav-item" data-nav="course">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        <span class="mobile-nav-text" data-i18n="nav.mission">课程</span>
                    </a>
                    <a href="sevensquare.html" class="mobile-nav-item ${isSevenSquare ? 'active' : ''}" data-nav="core">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M6 3h12l4 6-10 13L2 9z"></path>
                            <path d="M11 3 8 9l4 13 4-13-3-6z"></path>
                            <path d="M2 9h20"></path>
                        </svg>
                        <span class="mobile-nav-text" data-i18n="nav.core">AI</span>
                    </a>
                    <a href="pricing.html" class="mobile-nav-item ${isPricing ? 'active' : ''}" data-nav="pricing">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                            <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        <span class="mobile-nav-text" data-i18n="nav.pricing">报价</span>
                    </a>
                    <a href="${indexPrefix}#contact" class="mobile-nav-item" data-nav="contact">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span class="mobile-nav-text" data-i18n="nav.contact">联络</span>
                    </a>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', mobileNavHtml);
        
        // Translate the newly injected nav
        if (typeof changeLanguage === 'function') {
            const currentLang = localStorage.getItem('selectedLanguage') || 'zh';
            changeLanguage(currentLang);
        }
        
        // Hide on scroll down, show on scroll up logic
        const mobileNav = document.querySelector('.mobile-bottom-nav');
        if (mobileNav) {
            let lastScrollY = window.scrollY;
            window.addEventListener('scroll', () => {
                if (window.scrollY > lastScrollY && window.scrollY > 100) {
                    mobileNav.classList.add('nav-hidden');
                } else {
                    mobileNav.classList.remove('nav-hidden');
                }
                lastScrollY = window.scrollY;
            });
        }
    };
    injectMobileNav();

    // WeChat copy-to-clipboard functionality with custom toast
    const toastMessages = {
        zh: "微信号 'voicecoffee' 已复制到剪贴板，请打开微信添加",
        en: "WeChat ID 'voicecoffee' has been copied to clipboard. Please open WeChat to add.",
        es: "¡El ID de WeChat 'voicecoffee' ha sido copiado al portapapeles! Abra WeChat para agregar.",
        de: "WeChat-ID 'voicecoffee' wurde in die Zwischenablage kopiert. Bitte öffnen Sie WeChat zum Hinzufügen.",
        it: "L'ID WeChat 'voicecoffee' è stato copiato negli appunti. Apri WeChat per aggiungere."
    };

    function showToast(message) {
        let toast = document.getElementById('custom-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'custom-toast';
            toast.className = 'custom-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    const wechatBtn = document.getElementById('wechat-btn');
    if (wechatBtn) {
        wechatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const wechatId = wechatBtn.getAttribute('data-wechat');
            navigator.clipboard.writeText(wechatId).then(() => {
                const currentLang = localStorage.getItem('selectedLanguage') || 'zh';
                const msg = toastMessages[currentLang] || toastMessages['zh'];
                showToast(msg);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                const fallbackMsg = {
                    zh: "微信号：voicecoffee",
                    en: "WeChat ID: voicecoffee",
                    es: "ID de WeChat: voicecoffee",
                    de: "WeChat-ID: voicecoffee",
                    it: "ID WeChat: voicecoffee"
                };
                const currentLang = localStorage.getItem('selectedLanguage') || 'zh';
                alert((fallbackMsg[currentLang] || fallbackMsg['zh']));
            });
        });
    }
});
