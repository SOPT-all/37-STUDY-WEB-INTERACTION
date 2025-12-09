export const setAngle = (start: number, end: number, t: number): number => {
  // 시작 각도와 목표 각도의 차이 계산
  let diff = end - start;

  // 각도 차이가 180도를 넘어가면 반대 방향으로 회전하는 것이 더 짧음
  // 이를 위해 각도 차이를 조정
  if (diff > Math.PI) diff -= Math.PI * 2;
  if (diff < -Math.PI) diff += Math.PI * 2;

  // 선형 보간(linear interpolation)을 사용하여 새로운 각도 계산
  return start + diff * t;
};
