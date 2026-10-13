/**
 * MIDIR FUTURES — Navigation JS
 * Handles sticky header, mobile menu, active states
 */

(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

  // ── Sticky / scroll behaviour ──────────────────────
  if (header) {
    let lastScrollY = 0;
    let ticking = false;

    function onScroll() {
      const scrollY = window.scrollY;
      header.classList.toggle('scrolled', scrollY > 60);
      lastScrollY = scrollY;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  // ── Mobile menu toggle ─────────────────────────────
  function openMenu() {
    mobileNav.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // focus first link
    const firstLink = mobileNav.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    // close on link click
    mobileNavLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // close on outside click
    document.addEventListener('click', function (e) {
      if (mobileNav.classList.contains('open') &&
          !mobileNav.contains(e.target) &&
          !navToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  // ── Active nav links ────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-menu a, .mobile-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage ||
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

})();
