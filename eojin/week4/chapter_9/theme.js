import { get$, getAll$ } from './utils.js';

const ThemeManager = () => {
  const themes = {
    flower: { background: '#ffc8f9', highlight: '#a84b99' },
    bluebird: { background: '#e6e6fa', highlight: '#2e6cb6' },
    heart: { background: '#ffd1dc', highlight: '#e64333' },
    banana: { background: '#fff2d4', highlight: '#fcc000' },
    orange: { background: '#ffeade', highlight: '#ff9861' },
  };

  const setActiveNavLink = (theme) => {
    getAll$('.navigation .active').forEach(($section) =>
      $section.classList.remove('active')
    );
    get$(`.navigation [href="#${theme}"]`)?.classList.add('active');
  };

  const activateSection = (hashName) => {
    const $targetSection = document.getElementById(hashName);
    getAll$('.section.active').forEach(($section) =>
      $section.classList.remove('active')
    );
    $targetSection?.classList.add('active');
  };

  const scrollToSection = (hashName) => {
    const $targetSection = document.getElementById(hashName);
    if ($targetSection) {
      setTimeout(() => {
        $targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 1000 * 0.5);
    }
  };

  const applyTheme = (theme) => {
    if (!themes[theme]) return;
    const { background, highlight } = themes[theme];
    document.documentElement.style.setProperty(
      '--color-background',
      background
    );
    document.documentElement.style.setProperty('--color-highlight', highlight);
    setActiveNavLink(theme);
    activateSection(theme);
  };

  return { applyTheme, scrollToSection };
};

export default ThemeManager;
