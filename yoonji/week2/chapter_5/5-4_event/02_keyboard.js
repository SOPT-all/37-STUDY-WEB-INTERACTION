"use strict";

const $info = document.querySelector(".js-info");
const $refresh = document.querySelector(".js-refresh");

/*
* DOMContentLoaded - HTML DOM 트리가 렌더링이 완료 된 다음, 추가적인 스크립트가 다운로드되고 실행될 때 발생합니다.
* @see
* https://developer.mozilla.org/ko/docs/Web/API/Document/DOMContentLoaded_event
*/

document.addEventListener("DOMContentLoaded", () => {
  // 여러 개의 컨테이너를 선택 (querySelectorAll 사용)
  const $keyContainers = document.querySelectorAll(".key_container");
  const keys = ["Q", "W", "E", "R", "A", "S", "D", "F", "Z", "X", "C", "V"];
  const KEY_COUNT = 4;

  // forEach를 컨테이너들에 대해 실행
  $keyContainers.forEach((container, containerIndex) => {
    for (let i = 0; i < KEY_COUNT; i++) {
      const keyIndex = containerIndex * KEY_COUNT + i;
      
      if (keyIndex < keys.length) {
        const key = keys[keyIndex];

        const button = document.createElement("button");
        button.textContent = key;
        button.setAttribute("type", "button");

        button.dataset.key = key.toLowerCase();
        container.appendChild(button);
      }
    }
  });
});

// keyDown 이벤트 리스너
document.addEventListener("keydown", (event) => {
  const allowKeys = [
    ...document.querySelectorAll('[data-type="keydown"] button'),
  ].map((key) => key.dataset.key);

  if ($info) {
    $info.textContent = `type = ${event.type}, key = ${event.key}`;
  }
  console.log("KeyDown:", event.key);

  if (!allowKeys.includes(event.key)) {
    return;
  }

  const $target = document.querySelector(`[data-type="keydown"] [data-key="${event.key}"]`);
  if ($target) {
    $target.classList.toggle("pressed");
  }
});

// keyPress 이벤트 리스너 - 비표준!
// document.addEventListener("keypress", (event) => {
//   const allowKeys = [
//     ...document.querySelectorAll('[data-type="keypress"] button'),
//   ].map((key) => key.dataset.key);
  
//   if ($info) {
//     $info.textContent = `type = ${event.type}, key = ${event.key}`;
//   }
//   console.log("KeyPress:", event.key);
  
//   if (!allowKeys.includes(event.key)) {
//     return;
//   }

//   const $target = document.querySelector(`[data-type="keypress"] [data-key="${event.key}"]`);
//   if ($target) {
//     $target.classList.toggle("pressed");
//   }
// });

// keyUp 이벤트 리스너
document.addEventListener("keyup", (event) => {
  const allowKeys = [
    ...document.querySelectorAll('[data-type="keyup"] button'),
  ].map((key) => key.dataset.key);

  if ($info) {
    $info.textContent = `type = ${event.type}, key = ${event.key}`;
  }
  console.log("KeyUp:", event.key);

  if (!allowKeys.includes(event.key)) {
    return;
  }

  const $target = document.querySelector(`[data-type="keyup"] [data-key="${event.key}"]`);
  if ($target) {
    $target.classList.toggle("pressed");
  }
});

// 새로고침 버튼 클릭 이벤트 리스너
if ($refresh) {
  $refresh.addEventListener("click", () => {
    [...document.querySelectorAll("[data-type] button")].forEach((key) => {
      key.classList.remove("pressed");
    });
    if ($info) {
      $info.textContent = "-";
    }
  });
}