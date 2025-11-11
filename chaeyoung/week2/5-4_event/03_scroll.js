"use strict";

const COLORS = ["blue", "purple", "pink"];

// scroll 이벤트
window.addEventListener("scroll", function () {
  // scroll_item 요소들 선택
  const $elements = document.querySelectorAll(".scroll_item");
  $elements.forEach(($element, index) => {
    // 요소 위치 정보 get
    const elementPos = $element.getBoundingClientRect();
    // console.log("elementPos.top", elementPos.top);
    // console.log("elementPos.bottom", elementPos.bottom);
    // console.log("window.innerHeight", window.innerHeight);

    // 요소의 top 위치가 화면 높이보다 작으면, 즉 화면에 보이면
    // &&
    // 요소의 bottom 위치가 0보다 크면, 즉 화면 위로 완전히 벗어나지 않으면
    if (elementPos.top < window.innerHeight && elementPos.bottom >= 0) {
      $element.classList.add("animated");
      $elements[index].classList.add(COLORS[index]);
    }
  });
});

/**
 * IntersectionObserver API
 */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // 단순히 스크롤로 이벤트로 구현했을 때 스크롤 하는 내내 console이 찍혀서 성능적으로 매우 안 좋았음
      // intersectionObserver API는 관찰 대상이 교차할 때만 콜백이 실행되므로 성능적으로 훨씬 좋음
      console.log("intersectionObserver API", entry);
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        entry.target.classList.add(entry.target.dataset.color);
      }
    });
  },
  { threshold: 0.8 }
);

document.querySelectorAll(".intersection_item").forEach(($element, index) => {
  $element.dataset.color = COLORS[index];
  observer.observe($element);
});
