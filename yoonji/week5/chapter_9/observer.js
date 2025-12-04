import { stateProxy } from "./proxy.js";

const observerOptions = {
  root: null, // 뷰포트를 기준으로 설정
  rootMargin: "0px", // 루트 마진은 0px
  threshold: 0.5, // 요소가 50% 화면에 보이면 콜백 함수 실행
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // 요소가 화면에 교차하는 경우
    if (entry.isIntersecting) {
      const newHash = `#${entry.target.id}`; // 교차하는 요소의 ID를 해시로 사용
      // 현재 URL의 해시와 새로운 해시가 다르다면 URL 업데이트
      if (newHash != window.location.hash) {
        history.pushState(null, null, newHash); // 브라우저 히스토리에 새로운 상태를 추가
        stateProxy.currentState = newHash;
      }
    }
  });
}, observerOptions);

export { observer };
