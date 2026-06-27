/* ── FAQ accordion ─────────────────────────────────────── */
function initFAQ() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ── Mobile nav ─────────────────────────────────────────── */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  const nav    = document.querySelector('.nav');

  if (toggle && links) {
    // Hamburger toggle
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      // animate hamburger → X
      toggle.classList.toggle('is-open', open);
    });

    // Close on nav link click (mobile)
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('is-open');
      });
    });

    // Close on outside tap
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        links.classList.remove('open');
        toggle.classList.remove('is-open');
      }
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        links.classList.remove('open');
        toggle.classList.remove('is-open');
      }
    });
  }

  // Scroll shadow
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Active link highlight
  const page = location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || href === './' + page) a.classList.add('active');
  });
}

/* ── Smooth scroll for anchor links ─────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Lazy-load images ───────────────────────────────────── */
function initLazyImages() {
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    document.querySelectorAll('img[data-src]').forEach(img => obs.observe(img));
  }
}

/* ── Hamburger X animation ──────────────────────────────── */
const hamburgerStyle = document.createElement('style');
hamburgerStyle.textContent = `
  .nav-toggle.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-toggle.is-open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav-toggle.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .nav-toggle span { transition: transform 0.25s, opacity 0.2s; }
`;
document.head.appendChild(hamburgerStyle);

/* ── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  initNav();
  initSmoothScroll();
  initLazyImages();
});
