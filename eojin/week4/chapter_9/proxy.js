const state = {
  currentState: null, // 현재 상태 (URL의 해시)
  callbackFunc: null, // 상태 변경 시 호출될 콜백 함수
};

const stateProxy = new Proxy(state, {
  set(target, property, value) {
    console.log(
      `Property ${property} 변경: from ${target[property]} to ${value}`
    );
    target[property] = value;

    // currentState 속성이 변경되었을 때 콜백 함수 실행
    if (
      'currentState' === property &&
      typeof target.callbackFunc === 'function'
    ) {
      target.callbackFunc(value);
    }
    return true;
  },
});

export { state, stateProxy };
