import { getAll$ } from "../../public/js/utils.js";
import { observer } from "./observer.js";
import { stateProxy } from "./proxy.js";
import ThemeManager from './theme.js';

const themeManager = ThemeManager();

// Proxy가 상태 변경을 감지했을 때 실행
const handleHashChange = (hash) => {
  if (!hash) return;
  const theme = hash.replace('#', '');
  
  themeManager.applyTheme(theme);
};

// Proxy에 콜백 함수 연결
// stateProxy.currentState 값이 바뀌면 handleHashChange 실행
stateProxy.callbackFunc = handleHashChange;

window.addEventListener("hashchange", () => {
  stateProxy.currentState = window.location.hash;
});

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = '1';
  getAll$('.section').forEach(($section) => {
    observer.observe($section);
  });

  if (window.location.hash) {
    stateProxy.currentState = window.location.hash;
  }
});

// popstate: 브라우저 뒤로가기/앞으로가기 버튼 클릭 시(세션 히스토리 변경 시 실행)
window.addEventListener('popstate', () => {
  themeManager.scrollToSection(window.location.hash.replace('#', ''));
});