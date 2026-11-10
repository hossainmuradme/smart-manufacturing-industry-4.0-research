/* Murad Hossain portfolio — navigation, filters and progress indicator.
 * EDITING: HTML holds text/cards, CSS holds design, JS controls behavior.
 * No external JavaScript libraries required.
 */
'use strict';

function setupMobileMenu() {
  const button = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-links');
  if (!button || !menu) return;

  button.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupCardFilters() {
  document.querySelectorAll('[data-filter-group]').forEach((group) => {
    const filterButtons = group.querySelectorAll('[data-filter]');
    const selector = group.getAttribute('data-filter-group');
    const cards = document.querySelectorAll(selector);

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        filterButtons.forEach((item) => item.classList.toggle('active', item === button));
        cards.forEach((card) => {
          const categories = (card.getAttribute('data-category') || '').split(' ');
          card.hidden = !(filter === 'all' || categories.includes(filter));
        });
      });
    });
  });
}

function setCopyrightYear() {
  document.querySelectorAll('[data-year]').forEach((item) => {
    item.textContent = new Date().getFullYear();
  });
}

function setupScrollProgress() {
  const progress = document.querySelector('.scroll-progress');
  if (!progress) return;

  function updateProgress() {
    const travel = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = travel > 0 ? (window.scrollY / travel) * 100 : 0;
    progress.style.width = `${percentage}%`;
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupCardFilters();
  setCopyrightYear();
  setupScrollProgress();
});
