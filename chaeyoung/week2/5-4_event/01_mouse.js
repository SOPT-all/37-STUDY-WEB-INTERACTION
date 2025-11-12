"use strict";

const $canvas = document.querySelector(".js-painter");
const $context = $canvas.getContext("2d"); // canvas에 컨텍스트라는 개념이 있군.
const $colorPicker = document.querySelector(".js-colorPicker input");
const $pencilRange = document.querySelector(".js-pencilRange input");
const $eraseAll = document.querySelector(".js-eraseAll");
// 마우스 객체 초기화
const mouse = {
  isDown: false,
  x: 0,
  y: 0,
};

// 초기 값 설정
const initialValue = {
  color: "#3c3c3c",
  width: 10,
  lineCap: "round",
};

/**
 * DOMContentLoaded - HTML DOM 트리가 렌더링이 완료 된 다음, 추가적인 스크립트가 다운로드되고 실행될 때 발생합니다.
 * @see
 * https://developer.mozilla.org/ko/docs/Web/API/Document/DOMContentLoaded_event
 */
// 초기화인 셈~
document.addEventListener("DOMContentLoaded", () => {
  const { lineCap, color, width } = initialValue; // 구조 분해 할당
  $context.lineCap = lineCap;
  $context.strokeStyle = color;
  $context.lineWidth = width;
  $colorPicker.value = color;
  $pencilRange.value = width;
  $eraseAll.dispatchEvent(new Event("click"));
  $colorPicker.dispatchEvent(new Event("change"));
  $pencilRange.dispatchEvent(new Event("input"));
});

// 색상 변경 이벤트
$colorPicker.addEventListener("change", (event) => {
  const color = event.target.value;
  event.target.parentElement.querySelector(".current_color_picker").innerHTML =
    color; // 텍스트로 표시
  $context.strokeStyle = color; // 실제로 적용
});

// 펜 굵기 변경 이벤트
$pencilRange.addEventListener("input", (event) => {
  const width = event.target.value;
  event.target.parentElement.querySelector(".current_pencil_range").innerHTML =
    width + "px";
  $context.lineWidth = width;
});

// 마우스 누를 때 위치 추적!!
$canvas.addEventListener("mousedown", (event) => {
  mouse.isDown = true;
  [mouse.x, mouse.y] = [event.offsetX, event.offsetY];
});

$canvas.addEventListener("mouseup", () => {
  mouse.isDown = false;
});

$canvas.addEventListener("mouseout", () => {
  mouse.isDown = false;
});

$canvas.addEventListener("mousemove", (event) => {
  // 누른 채로 움직이는 경우에만 이벤트 적용
  if (false === mouse.isDown) {
    return;
  }

  // 그리는 부분
  const [drawX, drawY] = [event.offsetX, event.offsetY];
  $context.beginPath();
  $context.moveTo(mouse.x, mouse.y);
  $context.lineTo(drawX, drawY);
  $context.stroke();
  mouse.x = drawX;
  mouse.y = drawY;
});

$eraseAll.addEventListener("click", () => {
  $context.clearRect(0, 0, $canvas.width, $canvas.height);
});

document.addEventListener("contextmenu", (event) => {
  event.preventDefault(); // 기본 우클릭 차단(그럼.. 우클릭이 이벤트로 인식되는 것인가?)
  mouse.isDown = false;
  if (false === confirm("초기화 하시겠습니까?")) {
    return;
  }
  // 싹~ 초기화
  const { lineCap, color, width } = initialValue;
  $context.lineCap = lineCap;
  $context.strokeStyle = color;
  $context.lineWidth = width;
  $colorPicker.value = color;
  $pencilRange.value = width;
  $eraseAll.dispatchEvent(new Event("click"));
  $colorPicker.dispatchEvent(new Event("change"));
  $pencilRange.dispatchEvent(new Event("input"));
});
