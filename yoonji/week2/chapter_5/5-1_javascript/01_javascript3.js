const clickBtn = document.querySelector(".clickBtn");

const clickEvent = () => {
  alert(
    "clickBtn 클래스 선택자를 사용해서 외부 스크립트로 클릭했네요!"
  );
};

clickBtn.addEventListener("click", clickEvent);
