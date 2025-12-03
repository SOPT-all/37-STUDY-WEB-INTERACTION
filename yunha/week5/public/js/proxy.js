const state = {
  currentState: null, // 현재 상태
  callbackFunc: null, // 상태 변경 시 호출될 콜백 함수
};

const stateProxy = new Proxy(state, {
  set(target, property, value) {
    console.log(
      `Property ${property} 변경: from ${target[property]} to ${value}`
    );
    target[property] = value;

    if (
      "currentState" === property &&
      typeof target.callbackFunc === "function"
    ) {
      target.callbackFunc(value);
    }
    return true;
  },
});

export { state, stateProxy };
