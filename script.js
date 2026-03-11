/* ════════════════════════════════════════════════════════════════
   DR. HARJEET SINGH JAGGI — PORTFOLIO SCRIPTS  (single-page)
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
        const isOpen = links.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when any anchor link is tapped (single-page scroll)
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
})();

/* ─── ACTIVE NAV HIGHLIGHT (single-page) ─── */
(function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    if (!navLinks.length) return;

    // Build map: section-id → nav link
    const navMap = {};
    navLinks.forEach(link => {
        const sec = link.getAttribute('data-section');
        if (sec) navMap[sec] = link;
    });

    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = navMap[entry.target.id];
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(sec => observer.observe(sec));
})();

/* ─── SECTION REVEAL ON SCROLL ─── */
(function initReveal() {
    const items = document.querySelectorAll('.reveal, .reveal-child');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.classList.contains('reveal-child')
                    ? Array.from(entry.target.parentElement.querySelectorAll('.reveal-child'))
                        .indexOf(entry.target) * 120
                    : 0;
                setTimeout(() => entry.target.classList.add('visible'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    items.forEach(item => observer.observe(item));
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

/* ─── SMOOTH SCROLL ─── */
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
