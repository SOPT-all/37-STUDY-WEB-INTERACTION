'use strict';

// DOM 요소 선택
const $canvas = document.querySelector('.js-painter');
const $context = $canvas.getContext('2d');
const $colorPicker = document.querySelector('.js-colorPicker input');
const $pencilRange = document.querySelector('.js-pencilRange input');
const $eraseAll = document.querySelector('.js-eraseAll');
const mouse = {
  isDown: false,
  x: 0,
  y: 0,
};
const initialValue = {
  color: '#3c3c3c',
  width: 10,
  lineCap: 'round',
};

/**
 * DOMContentLoaded - HTML DOM 트리가 렌더링이 완료 된 다음, 추가적인 스크립트가 다운로드되고 실행될 때 발생합니다.
 * @see
 * https://developer.mozilla.org/ko/docs/Web/API/Document/DOMContentLoaded_event
 */
document.addEventListener('DOMContentLoaded', () => {
  const { lineCap, color, width } = initialValue;
  $context.lineCap = lineCap;
  $context.strokeStyle = color;
  $context.lineWidth = width;
  $colorPicker.value = color;
  $pencilRange.value = width;
  $eraseAll.dispatchEvent(new Event('click'));
  $colorPicker.dispatchEvent(new Event('change'));
  $pencilRange.dispatchEvent(new Event('input'));
});

// change 이벤트를 바인딩
$colorPicker.addEventListener('change', (event) => {
  const color = event.target.value; // 선택된 색상 값을 가져옴
  event.target.parentElement.querySelector('.current_color_picker').innerHTML = color; // 해당 클래스를 가진 요소의 텍스트를 선택된 색상 값으로 업데이트
  $context.strokeStyle = color; // canvas의 context 객체의 strokeStyle(선 색상)을 선택된 색상으로 변경
});

// input 이벤트를 바인딩
$pencilRange.addEventListener('input', (event) => {
  const width = event.target.value; // 선택된 범위 값을 가져옴
  event.target.parentElement.querySelector('.current_pencil_range').innerHTML = width + 'px'; // 해당 클래스를 가진 요소의 텍스트를 선택된 값에 'px'를 붙여 업데이트
  $context.lineWidth = width; // canvas의 context 객체의 lineWidth(선 굵기)를 선택된 값으로 변경
});

// 캔버스를 벗어나거나 마우스 버튼을 떼면 그리기 중지
$canvas.addEventListener('mousedown', (event) => {
  mouse.isDown = true;
  [mouse.x, mouse.y] = [event.offsetX, event.offsetY];
});

$canvas.addEventListener('mouseup', () => {
  mouse.isDown = false;
});

$canvas.addEventListener('mouseout', () => {
  mouse.isDown = false;
});

// Early Return 패턴 적용
$canvas.addEventListener('mousemove', (event) => {
  if (false === mouse.isDown) {
    return;
  }
  const [drawX, drawY] = [event.offsetX, event.offsetY];
  $context.beginPath(); // 그리기 시작
  $context.moveTo(mouse.x, mouse.y); // 시작점 지정
  $context.lineTo(drawX, drawY); // 끝점 지정
  $context.stroke(); // 선 그리기
  mouse.x = drawX;
  mouse.y = drawY;
});

// 모두 지우기 버튼 클릭 시 캔버스 초기화
$eraseAll.addEventListener('click', () => {
  $context.clearRect(0, 0, $canvas.width, $canvas.height);
});

document.addEventListener('contextmenu', (event) => {
  event.preventDefault(); // 브라우저의 기본 우클릭 메뉴 차단
  mouse.isDown = false;
  if (false === confirm('초기화 하시겠습니까?')) {
    return;
  }
  const { lineCap, color, width } = initialValue;
  $context.lineCap = lineCap;
  $context.strokeStyle = color;
  $context.lineWidth = width;
  $colorPicker.value = color;
  $pencilRange.value = width;
  // 이벤트 디스패치로 초기화 트리거
  $eraseAll.dispatchEvent(new Event('click'));
  $colorPicker.dispatchEvent(new Event('change'));
  $pencilRange.dispatchEvent(new Event('input'));
});
