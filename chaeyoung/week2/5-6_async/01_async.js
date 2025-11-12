"use strict";

// 동기: while문이 끝나야 innerHTML 실행
const syncFunction = ($result) => {
  const startTime = new Date().getTime();
  while (new Date().getTime() < startTime + 1000);
  $result.innerHTML += `<br/> 동기 끝`;
};

// 비동기: Promise 객체로 setTimeout을 감싸서 처리
// Promise 객체가 실행되는 동안 동시에 2번째 setTimeout 실행 가능
// 비동기 작업 완료 시, then 또는 catch 블록이 실행됨
const asyncFunction = ($result, isTrue) => {
  $result.innerHTML = "비동기 시작";

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isTrue) {
        resolve("비동기 성공");
      } else {
        reject("비동기 실패");
      }
    }, 2000);
  })
    .then((msg) => {
      $result.innerHTML += `<br/> msg : ${msg}`;
    })
    .catch((err) => {
      $result.innerHTML += `<br/> err : ${err}`;
    });

  // 비동기 작업이 진행되는 동안 다른 작업도 실행이 된다.
  setTimeout(() => {
    $result.innerHTML += "<br/> 다른 작업도 실행이 됩니다.";
  }, 1000);
};

document.addEventListener("DOMContentLoaded", () => {
  const $result = document.querySelector(".result");
  document.querySelector(".js-sync").addEventListener("click", () => {
    $result.innerText = `동기 시작`;
    setTimeout(() => syncFunction($result), 1000);
  });
  document
    .querySelector(".js-async")
    .addEventListener("click", () => asyncFunction($result, true));
});
