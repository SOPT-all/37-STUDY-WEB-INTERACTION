"use strict";

const DELAY = 1000 * 1.5;

const show = ($elem) => ($elem.style.display = "block");

const hide = ($elem) => ($elem.style.display = "none");

const showItems = ($elem, $loader, idx) => {
  setTimeout(() => {
    hide($loader);
    $elem.classList.remove("hidden");
  }, DELAY * (idx + 1));
};

// skeletion 초기화
const initSkeleton = ($elem, idx) => {
  // 1. skeleton 복제(자식까지 다~)
  const $skeleton = document.querySelector(".skeleton").cloneNode(true);
  // 2. skeleton 보여주기
  show($skeleton);

  // 3. card에 skeleton 추가
  $elem.appendChild($skeleton);

  // 4. skeleton 제거 & 실제 아이템 보여주기
  showItems($elem, $skeleton, idx);
};

document.addEventListener("DOMContentLoaded", () => {
  [...document.querySelectorAll(".card_list .card")].forEach(
    ($element, index) => initSkeleton($element, index)
  );
});
