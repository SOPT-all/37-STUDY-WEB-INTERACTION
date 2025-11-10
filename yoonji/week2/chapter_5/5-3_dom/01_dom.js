// 색상 변경
document.getElementsByClassName('example_class')[0].style.color = 'blue';
document.getElementsByClassName('example_class')[1].style.color = 'purple';

// 속성 추가
document.getElementsByClassName('example_class')[1].setAttribute('data-id', 'test-data');

// document.getElementByTagName - 스타일, 속성, 클래스 추가
document.getElementsByTagName('p')[0].style.backgroundColor = 'lightgray';
document.getElementsByTagName('p')[1].setAttribute('data-id', 'test-color');
document.getElementsByTagName('p')[1].classList.add('test-color');

// document.querySelector - 속성 값 제거
document.querySelector('.test-class').removeAttribute('type');
document.querySelector('.test-class').setAttribute('id', 'data-id');

[...document.querySelectorAll('[data-id="test"]')].map(($element, index) => {
  if (index === 0) {
    $element.removeAttribute('data-id');
    $element.setAttribute('data-query', 'test');
    return $element;
  }
})

document.querySelectorAll('[data-id="test"]')[1].setAttribute('data-query', 'test');