"use strict";

const DELAY = 1000 * 1;

// 요소를 보여주도록 하는 함수
const show = ($elem) => {
  $elem.style.display = "block";
};

// 요소를 보여주지 않도록 하는 함수
const hide = ($elem) => {
  $elem.style.display = "none";
};

// 카드 UI 아이템들을 delay에 따라서 순차적으로 보여주는 함수
const showItems = ($elem, $loader, idx) => {
  setTimeout(() => {
    hide($loader);
    $elem.classList.remove("hidden");
  }, DELAY * (idx + 1));
};

const initSpinner = ($elem, idx) => {
  // 여러 개의 원이 순환하며 움직이고 크기가 변하는 효과!
  const $spinner = document.querySelector(".svg_loader2").cloneNode(true);
  
  show($spinner);
  $elem.appendChild($spinner);
  showItems($elem, $spinner, idx);
};

document.addEventListener("DOMContentLoaded", () => {
  [...document.querySelectorAll(".card_list .card")].forEach(
    ($element, index) => initSpinner($element, index)
  );
});