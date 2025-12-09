// 애니메이션 상태 열거형 정의
export const enum AnimationState {
  IDLE = 0,
  JUMP = 1,
  WALK = 2,
}

// 3D 공간 내 위치 인터페이스 정의
export interface IPosition {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}
