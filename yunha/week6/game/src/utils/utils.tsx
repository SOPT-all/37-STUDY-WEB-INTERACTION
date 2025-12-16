export const setAngle = (start: number, end: number, t: number): number => {
  // 시작 각도와 목표 각도의 차이 계산
  let diff = end - start;

  if (diff > Math.PI) diff -= Math.PI * 2;
  if (diff < -Math.PI) diff += Math.PI * 2;

  // 선형 보간을 사용하여 새로운 각도 계산
  return start + diff * t;
};
