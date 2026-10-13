/**
 * MIDIR FUTURES — Main JS
 * Scroll reveal, counters, hero image, lazy load
 */

(function () {
  'use strict';

  // ── 1. Scroll reveal ────────────────────────────────
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (item) { observer.observe(item); });
  }

  // ── 2. Animated counters ─────────────────────────────
  function animateCounter(el) {
    const target = el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const numericTarget = parseFloat(target.replace(/[^\d.]/g, ''));
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = Math.min(now - start, duration);
      const progress = elapsed / duration;
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericTarget * eased;

      // Format with same style as target
      let display;
      if (target.includes('M')) {
        display = (current / 1000000 >= 1)
          ? Math.floor(current / 1000000) + 'M'
          : Math.round(current / 1000) + 'K';
      } else if (target.includes(',')) {
        display = Math.round(current).toLocaleString();
      } else {
        display = Math.round(current);
      }

      el.textContent = prefix + display + suffix;

      if (elapsed < duration) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) { observer.observe(counter); });
  }

  // ── 3. Hero image load / subtle entrance ─────────────
  function initHero() {
    const heroBg = document.querySelector('.hero__bg');
    if (!heroBg) return;

    const bgUrl = heroBg.style.backgroundImage;
    if (!bgUrl) return;

    const urlMatch = bgUrl.match(/url\(["']?(.+?)["']?\)/);
    if (!urlMatch) return;

    const img = new Image();
    img.onload = function () {
      heroBg.classList.add('loaded');
    };
    img.src = urlMatch[1];
  }

  // ── 4. Lazy load images ───────────────────────────────
  function initLazyImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if (!lazyImages.length || !('IntersectionObserver' in window)) return;
    // Native lazy loading handles this; this is a fallback enhancement
    lazyImages.forEach(function (img) {
      if (!img.complete && img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  }

  // ── 5. Config-driven content ──────────────────────────
  function applyConfig() {
    const cfg = window.SITE_CONFIG;
    if (!cfg) return;

    // Replace email links
    document.querySelectorAll('[data-config="email"]').forEach(function (el) {
      if (cfg.email && !cfg.email.includes('REPLACE')) {
        el.textContent = cfg.email;
        if (el.tagName === 'A') el.href = 'mailto:' + cfg.email;
      }
    });

    // Replace phone links
    document.querySelectorAll('[data-config="phone1"]').forEach(function (el) {
      if (cfg.phone1 && !cfg.phone1.includes('REPLACE')) {
        el.textContent = cfg.phone1;
        if (el.tagName === 'A') el.href = 'tel:' + cfg.phone1.replace(/\s/g, '');
      }
    });

    // Replace address
    document.querySelectorAll('[data-config="address"]').forEach(function (el) {
      if (cfg.address && !cfg.address.includes('REPLACE')) {
        el.textContent = cfg.address;
      }
    });

    // Social links
    document.querySelectorAll('[data-config="social-facebook"]').forEach(function (el) {
      if (cfg.social.facebook && !cfg.social.facebook.includes('REPLACE')) {
        el.href = cfg.social.facebook;
      } else {
        el.style.display = 'none';
      }
    });
    document.querySelectorAll('[data-config="social-twitter"]').forEach(function (el) {
      if (cfg.social.twitter && !cfg.social.twitter.includes('REPLACE')) {
        el.href = cfg.social.twitter;
      } else {
        el.style.display = 'none';
      }
    });
    document.querySelectorAll('[data-config="social-linkedin"]').forEach(function (el) {
      if (cfg.social.linkedin && !cfg.social.linkedin.includes('REPLACE')) {
        el.href = cfg.social.linkedin;
      } else {
        el.style.display = 'none';
      }
    });
    document.querySelectorAll('[data-config="social-instagram"]').forEach(function (el) {
      if (cfg.social.instagram && !cfg.social.instagram.includes('REPLACE')) {
        el.href = cfg.social.instagram;
      } else {
        el.style.display = 'none';
      }
    });
  }

  // ── 6. Smooth scroll for anchor links ─────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
          const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  // ── Init ──────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCounters();
    initHero();
    initLazyImages();
    applyConfig();
    initSmoothScroll();
  });

})();
