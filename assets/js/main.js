/* Rayhendra Hanif · CV & Portfolio: small progressive enhancements. */
(function () {
  'use strict';

  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var live = $('#live-region');
  var announce = function (msg) {
    if (!live) return;
    live.textContent = '';
    window.setTimeout(function () { live.textContent = msg; }, 50);
  };

  /* ---- Theme toggle (saved in localStorage, defaults to the OS setting) ---- */
  var themeBtn = $('.theme-toggle');
  var themeMeta = $('meta[name="theme-color"]');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function savedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (themeMeta) themeMeta.setAttribute('content', theme === 'dark' ? '#0b1120' : '#f8fafc');
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
    if (persist) {
      try { localStorage.setItem('theme', theme); } catch (e) { /* ignore */ }
    }
  }

  applyTheme(root.getAttribute('data-theme') || (systemDark.matches ? 'dark' : 'light'), false);

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
      announce(next === 'dark' ? 'Dark theme on' : 'Light theme on');
    });
  }

  var onSystemChange = function (e) {
    if (!savedTheme()) applyTheme(e.matches ? 'dark' : 'light', false);
  };
  if (systemDark.addEventListener) systemDark.addEventListener('change', onSystemChange);
  else if (systemDark.addListener) systemDark.addListener(onSystemChange);

  /* ---- Mobile navigation ---- */
  var header = $('.site-header');
  var nav = $('#site-nav');
  var navBtn = $('.nav-toggle');

  function setNav(open) {
    if (!nav || !navBtn) return;
    nav.classList.toggle('is-open', open);
    navBtn.setAttribute('aria-expanded', String(open));
    navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (nav && navBtn) {
    navBtn.addEventListener('click', function () {
      setNav(navBtn.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !header.contains(e.target)) setNav(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setNav(false);
        navBtn.focus();
      }
    });
    var desktop = window.matchMedia('(min-width: 881px)');
    var onDesktop = function (e) { if (e.matches) setNav(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);
    else if (desktop.addListener) desktop.addListener(onDesktop);
  }

  /* ---- Header border once the page scrolls ---- */
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var hasIO = 'IntersectionObserver' in window;

  /* ---- Highlight the nav link for the section in view ---- */
  var navLinks = $$('.nav-list a[href^="#"]');
  if (hasIO && navLinks.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (a) {
          var active = a.getAttribute('href') === '#' + id;
          a.classList.toggle('is-active', active);
          if (active) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]').forEach(function (section) { spy.observe(section); });
  }

  /* ---- Reveal-on-scroll (skipped for reduced motion) ---- */
  var revealEls = $$('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var showAll = function () {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  };
  if (hasIO && !reduceMotion) {
    // Content is only hidden once this script is running, so it can never get stuck invisible
    root.classList.add('reveal-on');
    var revealer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealEls.forEach(function (el) { revealer.observe(el); });
  } else {
    showAll();
  }
  window.addEventListener('beforeprint', showAll);

  /* ---- Lightbox for posters and presentation photos ---- */
  var dialog = $('#lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    var dialogCap = $('figcaption', dialog);
    var dialogImg = document.createElement('img');
    dialogImg.decoding = 'async';
    dialogCap.parentNode.insertBefore(dialogImg, dialogCap);
    $$('[data-lightbox]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var thumb = $('img', link) || $('img', link.closest('.project-card') || document.body);
        dialogImg.src = link.getAttribute('href');
        dialogImg.alt = thumb ? thumb.alt : '';
        dialogCap.textContent = link.getAttribute('data-caption') || '';
        dialog.showModal();
      });
    });
    $('.lightbox-close', dialog).addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', function () { dialogImg.removeAttribute('src'); });
  }

  /* ---- Copy email to clipboard ---- */
  $$('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (!navigator.clipboard) {
        window.location.href = 'mailto:' + text;
        return;
      }
      navigator.clipboard.writeText(text).then(function () {
        btn.classList.add('is-copied');
        announce('Email address copied to clipboard');
        window.setTimeout(function () { btn.classList.remove('is-copied'); }, 2000);
      }, function () {
        window.location.href = 'mailto:' + text;
      });
    });
  });

  /* ---- Current year in the footer ---- */
  $$('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
