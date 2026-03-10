/* ════════════════════════════════════════════════════════════════
   DR. HARJEET SINGH JAGGI — PORTFOLIO SCRIPTS
   ════════════════════════════════════════════════════════════════ */

'use strict';

/* ─── NAV SCROLL EFFECT ─── */
(function initNavScroll() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    const onScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();

/* ─── MOBILE NAV TOGGLE ─── */
(function initMobileNav() {
    const toggle = document.getElementById('nav-toggle-btn');
    const links = document.getElementById('nav-links-list');
    if (!toggle || !links) return;
    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        const isOpen = links.classList.contains('open');
        toggle.setAttribute('aria-expanded', isOpen);
    });
    // Close when a link is clicked
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => links.classList.remove('open'));
    });
})();

/* ─── ACTIVE NAV HIGHLIGHT ─── */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navMap = {};
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) navMap[href.slice(1)] = link;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const activeLink = navMap[entry.target.id];
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(sec => observer.observe(sec));
})();

/* ─── SECTION REVEAL ON SCROLL ─── */
(function initReveal() {
    const items = document.querySelectorAll('.reveal, .reveal-child');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger reveal-child items within the same parent
                const delay = entry.target.classList.contains('reveal-child')
                    ? Array.from(entry.target.parentElement.querySelectorAll('.reveal-child')).indexOf(entry.target) * 120
                    : 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    items.forEach(item => observer.observe(item));
})();

/* ─── HERO TYPING EFFECT ─── */
(function initTyping() {
    const el = document.getElementById('hero-typed');
    if (!el) return;

    const phrases = [
        'JEE & NEET Coaching.',
        'Physics Made Simple.',
        'IIT Delhi Trained.',
        'Kondhwa, Pune.',
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer;

    const type = () => {
        const current = phrases[phraseIdx];
        if (!deleting) {
            charIdx++;
            el.textContent = current.slice(0, charIdx);
            if (charIdx === current.length) {
                deleting = true;
                timer = setTimeout(type, 2200); // pause before deleting
                return;
            }
        } else {
            charIdx--;
            el.textContent = current.slice(0, charIdx);
            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                timer = setTimeout(type, 400);
                return;
            }
        }
        timer = setTimeout(type, deleting ? 55 : 90);
    };

    // Start after a short delay for dramatic effect
    timer = setTimeout(type, 1200);
})();

/* ─── PUBLICATION TABLE — CITATION COUNTER ─── */
(function initCitationCounter() {
    const badges = document.querySelectorAll('.cite-badge');
    badges.forEach(badge => {
        const raw = badge.textContent.replace('+', '').trim();
        const target = parseInt(raw, 10);
        if (isNaN(target)) return;

        const observer = new IntersectionObserver(entries => {
            if (!entries[0].isIntersecting) return;
            observer.unobserve(badge);
            let current = 0;
            const step = Math.max(1, Math.ceil(target / 40));
            const tick = setInterval(() => {
                current = Math.min(current + step, target);
                badge.textContent = current + '+';
                if (current >= target) clearInterval(tick);
            }, 28);
        }, { threshold: 0.5 });

        observer.observe(badge);
    });
})();

/* ─── SMOOTH SCROLL — POLYFILL FOR OLDER SAFARI ─── */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
