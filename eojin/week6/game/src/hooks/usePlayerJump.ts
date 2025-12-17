import { useState, useCallback } from 'react';
import * as THREE from 'three';
import { AnimationState } from '../types/type';

// 점프의 높이와 지속 시간 설정
const JUMP_HEIGHT = 1.5;
const JUMP_DURATION = 0.5;

// 플레이어 점프 훅
const usePlayerJump = () => {
  const [isJumping, setIsJumping] = useState(false);

  // 현재 실행 중인 애니메이션 중지
  const stopCurrentAnimation = (
    actions: THREE.AnimationAction[],
    currentAnimation: number
  ) => {
    actions[currentAnimation]?.stop();
  };

  // 점프 애니메이션 리셋 후 한 번만 재생
  const startJumpAnimation = (actions: THREE.AnimationAction[]) => {
    actions[AnimationState.JUMP].reset().setLoop(THREE.LoopOnce, 1).play();
  };

  // 점프 완료 후 상태 복원
  const finishJump = (
    modelRef: React.RefObject<THREE.Group>,
    actions: THREE.AnimationAction[],
    currentAnimation: number,
    startY: number
  ) => {
    if (!modelRef.current) return;

    setIsJumping(false);
    actions[AnimationState.JUMP].stop();
    modelRef.current.position.y = startY;
    actions[currentAnimation]?.reset().play();
    applyLandingEffect(modelRef);
  };

  // 착지 효과 적용
  const applyLandingEffect = (modelRef: React.RefObject<THREE.Group>) => {
    if (!modelRef.current) return;

    const originalScale = modelRef.current.scale.y;
    modelRef.current.scale.y *= 0.9;
    setTimeout(() => {
      if (modelRef.current) modelRef.current.scale.y = originalScale;
    }, 100);
  };

  // 점프 훅 함수
  const jumpHook = useCallback(
    (
      modelRef: React.RefObject<THREE.Group>,
      actions: THREE.AnimationAction[],
      currentAnimation: number
    ) => {
      if (isJumping || !modelRef.current) return;

      setIsJumping(true);

      const startY = modelRef.current.position.y;
      const startTime = performance.now(); // 점프 시작 시간

      stopCurrentAnimation(actions, currentAnimation);
      startJumpAnimation(actions);

      const animateJump = () => {
        if (!modelRef.current) return;

        const currentTime = performance.now();
        const elapsedTime = (currentTime - startTime) / 1000;
        const jumpProgress = Math.min(elapsedTime / JUMP_DURATION, 1);
        const heightOffset = Math.sin(jumpProgress * Math.PI) * JUMP_HEIGHT;
        modelRef.current.position.y = startY + heightOffset;

        if (jumpProgress < 1) {
          requestAnimationFrame(animateJump);
        } else {
          finishJump(modelRef, actions, currentAnimation, startY);
        }
      };

      requestAnimationFrame(animateJump);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isJumping]
  );

  return {
    isJumping, // 점프 상태 여부
    setIsJumping, // 점프 상태 설정
    jumpHook, // 점프 동작 수행
  };
};

export default usePlayerJump;
