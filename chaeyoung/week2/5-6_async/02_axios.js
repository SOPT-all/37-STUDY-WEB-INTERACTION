"use strict";

const axios = window.axios;

// spinner 요소
const setLoader = (isShow) => {
  const $spinner = document.createElement("div");
  $spinner.classList.add("spinner");
  // spinner 요소 없을 시 .result에 spinner 요소 추가
  if (isShow && null === document.querySelector(".spinner")) {
    document.querySelector(".result").appendChild($spinner);
  } else {
    // 있으면 .spinner 요소 찾아서 삭제
    document.querySelector(".spinner")?.remove();
  }
};

// data 집어넣어서 렌더링하는 함수
const renderHTML = (data) => {
  const $result = document.querySelector(".result");
  $result.innerHTML = data;
};

const fetchAPI = () => {
  setLoader(true);
  // fetch로 api 접근, then해서 바
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((json) => {
      setLoader(false);
      renderHTML(json.body);
    })
    .catch((error) => console.error("Fetch Error:", error));
};

const axiosAPI = () => {
  setLoader(true);
  axios
    .get("https://jsonplaceholder.typicode.com/post/2")
    .then((response) => {
      setLoader(false);
      renderHTML(response.data.body);
    })
    .catch((error) => console.error("Axios Error:", error));
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".js-fetch").addEventListener("click", fetchAPI);
  document.querySelector(".js-axios").addEventListener("click", axiosAPI);
});
