"use strict";

const DELAY = 1000 * 1; // 가독성을 생각한 표현방식

// 요소를 보여주도록 하는 함수
const show = ($elem) => ($elem.style.display = "block");

// 요소를 보여주지 않도록 하는 함수
const hide = ($elem) => ($elem.style.display = "none");

// 카드 UI 아이템들을 DELAY에 따라서 순차적으로 보여주는 함수
const showItems = ($elem, $loader, idx) => {
  setTimeout(() => {
    // $loader, 즉 spinner 숨기고 $elem 보여주도록 구현
    hide($loader);
    $elem.classList.remove("hidden");
  }, DELAY * (idx + 1));
};

const initSpinner = ($elem, idx) => {
    // 처음엔 스피너 보이게 함
  const $spinner = document.querySelector(".spinner").cloneNode();
  show($spinner);
  $elem.appendChild($spinner);
  showItems($elem, $spinner, idx);
};

// 모듈화를 어마무시하게 했네 .. 신기하다
document.addEventListener("DOMContentLoaded", () => {
  [...document.querySelectorAll(".card_list .card")].forEach(
    ($element, index) => initSpinner($element, index)
  );
});
