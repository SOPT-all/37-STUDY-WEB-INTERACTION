/**
 * setAngle
 - 각도 설정 -> 부드러운 회전 적용
 *
 */
export const setAngle = (start: number, end: number, t: number): number => {
  let diff = end - start;

  if (diff > Math.PI) diff -= Math.PI * 2;
  if (diff < -Math.PI) diff += Math.PI * 2;

  return start + diff * t;
};
