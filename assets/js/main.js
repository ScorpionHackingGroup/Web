/* ScorpionYug - Main JS */

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
menuToggle?.addEventListener('click', () => {
  siteNav?.classList.toggle('open');
});

// Copy share button
document.querySelectorAll('.share-copy').forEach(btn => {
  btn.addEventListener('click', async () => {
    const url = btn.dataset.url;
    try {
      await navigator.clipboard.writeText(url);
      const orig = btn.querySelector('span').textContent;
      btn.querySelector('span').textContent = 'Copied!';
      setTimeout(() => { btn.querySelector('span').textContent = orig; }, 2000);
    } catch (e) {
      console.error('Copy failed', e);
    }
  });
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.post-card, .stat-card').forEach(el => {
  observer.observe(el);
});

// Header shadow on scroll
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header?.classList.add('scrolled');
  } else {
    header?.classList.remove('scrolled');
  }
});

console.log('%c⬢ ScorpionYug', 'color: #b8472a; font-size: 24px; font-weight: bold;');
console.log('%cHey there, fellow hacker 👋', 'color: #6b7280; font-size: 14px;');
