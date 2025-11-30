import { stateProxy } from './proxy.js';

const observerOptions = {
  root: null, // 뷰포트를 기준으로 설정
  rootMargin: '0px', // 루트 마진은 0px
  threshold: 0.5, // 요소가 50% 화면에 보이면 콜백 함수 실행
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // 요소가 뷰포트와 교차하는 경우
    if (entry.isIntersecting) {
      const newHash = `#${entry.target.id}`;
      if (newHash !== window.location.hash) {
        history.pushState(null, null, newHash);
        stateProxy.currentState = newHash;
      }
    }
  });
}, observerOptions);

export { observer };
