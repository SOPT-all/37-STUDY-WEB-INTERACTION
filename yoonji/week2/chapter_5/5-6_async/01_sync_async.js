"use strict";
const syncFunction = ($result) => {
  const startTime = new Date().getTime();
  while (new Date().getTime() < startTime + 1000);
  $result.innerHTML += "<br/> 동기 끝 ";
};

document.addEventListener("DOMContentLoaded", () => {
  const $result = document.querySelector(".result");
  document.querySelector(".js-sync").addEventListener("click", () => {
    $result.innerText = "동기 시작";
    setTimeout(() => syncFunction($result), 1000);
  });
  document
    .querySelector(".js-async")
    .addEventListener("click", () => asyncFunction($result, true));
});

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

  setTimeout(() => {
    $result.innerHTML += "<br/> 이벤트 루프 끝! 다른 작업도 실행됨";
  }, 1000);
};
