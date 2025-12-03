import { getAll$ } from "../public/js/utils.js";
import { stateProxy } from "../public/js/proxy.js";
import { observer } from "../public/js/observer.js";
import ThemeManager from "../public/js/theme.js";

const themeManager = ThemeManager();

const handleHashChange = (hash) => {
  const theme = hash.replace("#", "");
  themeManager.applyTheme(theme);
};

stateProxy.callbackFunc = handleHashChange;

const themes = {
  flower: { background: "#ffc8f9", highlight: "#a84b99" },
  bluebird: { background: "#e6e6fa", highlight: "#2e6cb6" },
  heart: { background: "#ffd1dc", highlight: "#e64333" },
  banana: { background: "#fff2d4", highlight: "#fcc000" },
  orange: { background: "#ffeade", highlight: "#ff9861" },
};

window.addEventListener("hashchange", () => {
  const theme = window.location.hash.replace("#", "");
  if (!themes[theme]) return;

  const { background, highlight } = themes[theme];
  document.documentElement.style.setProperty("--color-background", background);
  document.documentElement.style.setProperty("--color-highlight", highlight);
});

window.addEventListener("DOMContentLoaded", () => {
  getAll$(".section").forEach(($section) => observer.observe($section));
  handleHashChange(window.location.hash);
  document.body.style.opacity = 1;
});

window.addEventListener("hashchange", () => {
  stateProxy.currenState = window.location.hash;
});

window.addEventListener("popstate", () => {
  themeManager.scrollToSection(window.location.hash.replace("#", ""));
});
