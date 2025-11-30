import { getAll$ } from './utils.js';
import { observer } from './observer.js';
import { stateProxy } from './proxy.js';
import ThemeManager from './theme.js';

const themeManager = ThemeManager();

const handleHashChange = (hash) => {
  const theme = hash.replace('#', '');
  themeManager.applyTheme(theme);
};

stateProxy.callbackFunc = handleHashChange;

window.addEventListener('hashchange', () => {
  stateProxy.currentState = window.location.hash;
});

window.addEventListener('popstate', () => {
  themeManager.scrollToSection(window.location.hash.replace('#', ''));
});

window.addEventListener('DOMContentLoaded', () => {
  handleHashChange(window.location.hash);
  getAll$('.section').forEach(($section) => observer.observe($section));
  document.body.style.opacity = 1;
});
