import { getAll$, get$ } from "../../public/js/utils.js";

const ThemeManager = () => {
  const themes = {
    flower: { background: "#ffc8f9", highlight: "#a84b99" },
    bluebird: { background: "#e6e6fa", highlight: "#2e6cb6" },
    heart: { background: "#f8b0a9ff", highlight: "#e64333" },
    banana: { background: "#fff2d4", highlight: "#fcc000" },
    orange: { background: "#ffeade", highlight: "#ff9861" },
  };

  const applyTheme = (theme) => {
    if (!themes[theme]) return;
    const { background, highlight } = themes[theme];
    document.documentElement.style.setProperty("--color-background", background);
    document.documentElement.style.setProperty("--color-highlight", highlight);
    setActiveNavLink(theme);
    activateSection(theme);
  };

  const scrollToSection = (hashName) => {
    const $targetSection = document.getElementById(hashName);
    if ($targetSection) {
      setTimeout(() => {
        $targetSection.scrollIntoView({behavior:'smooth', block:'start'});
      }, 1000*0.5);
    }
  };

  const setActiveNavLink = (theme) => {
    getAll$('.navigation .active').forEach(($section) => $section.classList.remove('active'));
    get$(`.navigation a[href="#${theme}"]`)?.classList.add('active');
  }

  const activateSection = (hashName) => {
    const $targetSection = document.getElementById(hashName);
    getAll$('.section.active').forEach(($section) => $section.classList.remove('active'));
    $targetSection?.classList.add('active');
  };
  
  return { applyTheme, scrollToSection, setActiveNavLink, activateSection };
};

export default ThemeManager;
