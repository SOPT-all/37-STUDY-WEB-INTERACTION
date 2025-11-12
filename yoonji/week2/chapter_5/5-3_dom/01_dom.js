// 색상 변경
document.getElementsByClassName("example_class")[0].style.color = "blue";
document.getElementsByClassName("example_class")[1].style.color = "purple";

// 속성 추가
document
  .getElementsByClassName("example_class")[1]
  .setAttribute("data-id", "test-data");

// document.getElementByTagName - 스타일, 속성, 클래스 추가
document.getElementsByTagName("p")[0].style.backgroundColor = "lightgray";
document.getElementsByTagName("p")[1].setAttribute("data-id", "test-color");
document.getElementsByTagName("p")[1].classList.add("test-color");

// document.querySelector - 속성 값 제거
document.querySelector(".test-class").removeAttribute("type");
document.querySelector(".test-class").setAttribute("id", "data-id");

[...document.querySelectorAll('[data-id="test"]')].map(($element, index) => {
  if (index === 0) {
    $element.removeAttribute("data-id");
    $element.setAttribute("data-query", "test");
    return $element;
  }
});

document
  .querySelectorAll('[data-id="test"]')[1]
  .setAttribute("data-query", "test");

document.querySelectorAll('[data-id="test"]')[1].removeAttribute("data-id");

/** 오류- querySelectorAll은 배열이 아니므로 map 메서드를 사용할 수 없음
 * = 유사 배열 객체 -> 전개 연산자 (...) or Array.from()을 사용하여 배열로 변환 필요
 * document.querySelectorAll('[data-id="test"]').map(($element) => {
 * $element.classList.add('test');
 * });
 **/

[...document.querySelectorAll('[data-id="test"]')].map(($element, index) => {
  if (0 === index) {
    // 인덱스가 0인 요소에만 data-id 속성 제거 및 data-query 속성 추가 & 반환
    $element.removeAttribute("data-id");
    $element.setAttribute("data-query", "test");
    return $element;
  }
}); // 나머지 요소는 아무 작업도 X, 즉 해당 배열 map 연산의 결과는 [첫 번째 요소, undefined, undefined, ...] 형태가 됨

const $spanTag = document.createElement("span");
$spanTag.classList.add("color-purple");
$spanTag.innerText = " 노드 조작 메서드로 생성된 span 태그입니다.";
document.querySelector(".node_manipulation .create_element").append($spanTag);

// appendChild - div 요소 생성해서 appendChild로 추가
const $divTag = document.createElement("div");
$divTag.innerText = "노드 조작 메서드로 생성된 div 태그입니다.";
document.querySelector(".appendChild").appendChild($divTag);

// removeChild - 자식 노드 span 삭제
const $childTag = document.querySelector(".removeChild span");
document.querySelector(".removeChild").removeChild($childTag);

// removeAttribute - 태그의 class 속성 제거
document
  .getElementsByClassName("removeAttribute")[0]
  .removeAttribute("data-id");

// createTextNode - 텍스트 노드 생성 및 추가
const $textNode = document.createTextNode(
  " createTextNode로 생성된 텍스트 노드입니다."
);
const $fragment = document.createDocumentFragment();
// ▼▼▼ 오류 수정 ▼▼▼ (textNode -> $textNode)
$fragment.appendChild($textNode);
document.querySelector(".createTextNode").appendChild($fragment);

// cloneNode - 노드 복제 및 추가
const $originNode = document.querySelector(".clone_node");
const $copyTag = $originNode.cloneNode(true); // true: 자식 노드까지 모두 복제
$originNode.appendChild($copyTag);

// node 트래버싱 - 형제 노드 간 스타일 변경
const $childChildElement = document.getElementById("child_child");
const $parentElement = $childChildElement.parentElement;
const $parentParentElement = $childChildElement.parentNode.parentNode;
$parentElement.setAttribute("data-traversing", "true");
$parentParentElement.setAttribute("data-traversing", "true");

// previousSibling/nextSibling, previousElementSibling/nextElementSibling
// 이전 노드 또는 다음 노드 선택하기
const $current = document.querySelector(".current");
console.warn("previousSibling : ", $current.previousSibling);
console.warn("previousElementSibling : ", $current.previousElementSibling);

$current.previousElementSibling.setAttribute("data-traversing", true);
// previousSibling은 의 노드라면 어떤 것이든 접근함, 텍스트 노드(공백, 줄바꿈 등)도 포함하므로 의도한 요소를 선택하지 못할 수 있음
$current.nextElementSibling.setAttribute("data-traversing", true);

// firstChild/lastChild, firstElementChild/lastElementChild
// 첫번째 노드와 마지막 노드 선택하기
const $first_last = document.querySelector(".first_last");
console.warn("firstChild : ", $first_last.firstChild);
console.warn("lastChild : ", $first_last.lastChild);
$first_last.firstElementChild.style.color = "red";
$first_last.lastElementChild.style.color = "blue";

// 텍스트 노드를 조작하는 메서드
const contentsText = `<div>
<span style="display: none; color: red;">innerText</span>
</div>`;
const contentsHTML = `<div>
</div>
<span style="display: none; color: red;">innerText</span>
<span style="color: blue;">innerHTML</span>
</div>`;
const contentsTextContent = `<div>
<span style="color: purple;">textContent</span>
</div>`;

document.querySelector(".inner_text div").innerText = contentsText;
document.querySelector(".inner_html div").innerHTML = contentsHTML;
document.querySelector(".text_content div").textContent = contentsTextContent;


// 요소의 위치와 크기를 반환하는 메서드
// getBoundingClientRect() 메서드 사용
const $positionWidth = document.querySelector(".position_width");
const position_width = $positionWidth.getBoundingClientRect();

console.warn("position_width:", position_width);

// offsetLeft, offsetTop, clientLeft, clientTop
const $jsPosition = $positionWidth.querySelector('.js-position');
const $temp = document.createElement('div');

$temp.innerHTML = `
  <div>
    $jsPosition.offsetLeft: ${$jsPosition.offsetLeft},
    $jsPosition.offsetTop: ${$jsPosition.offsetTop}
  </div>
  <div>
    $jsPosition.clientLeft: ${$jsPosition.clientLeft},
    $jsPosition.clientTop: ${$jsPosition.clientTop}
  </div>
  <div>
    $jsPosition.clientLeft: ${$jsPosition.clientLeft},
    $jsPosition.clientTop: ${$jsPosition.clientTop}
  </div>`;
$jsPosition.appendChild($temp);

// offsetWidth, offsetHeight, clientWidth, clientHeight
const $jsSize = $positionWidth.querySelector('.js-size');
const $temp2 = document.createElement('div');

$temp2.innerHTML = `
  <div>
    $jsSize.offsetWidth: ${$jsSize.offsetWidth},
    $jsSize.offsetHeight: ${$jsSize.offsetHeight}
  </div>
  <div>
    $jsSize.clientWidth: ${$jsSize.clientWidth},
    $jsSize.clientHeight: ${$jsSize.clientHeight}
  </div>
  <div>
    $jsSize.clientWidth: ${$jsSize.clientWidth},
    $jsSize.clientHeight: ${$jsSize.clientHeight}
  </div>`;
$jsSize.appendChild($temp2);