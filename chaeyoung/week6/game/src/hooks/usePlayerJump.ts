import { useState, useCallback } from "react";
import * as THREE from "three";
import { AnimationState } from "../types/type";

// 점프의 높이와 지속 시간을 정의합니다.
const JUMP_HEIGHT = 1.5;
const JUMP_DURATION = 0.5;

/**
 * usePlayerJump
 - 플레이어의 점프 기능 관리
 */
const usePlayerJump = () => {
  const [isJumping, setIsJumping] = useState(false);

  // 실행 중인 애니메이션 종료
  const stopCurrentAnimation = (
    actions: THREE.AnimationAction[],
    currentAnimation: number
  ) => {
    actions[currentAnimation]?.stop();
  };

  // 점프 애니메이션 시작
  const startJumpAnimation = (actions: THREE.AnimationAction[]) => {
    actions[AnimationState.JUMP].reset().setLoop(THREE.LoopOnce, 1).play();
  };

  // 점프를 마무리하고 원래 상태로 돌아감
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

  /**
   * jumpHook
   - 플레이어 점프 동작 처리 
   */
  const jumpHook = useCallback(
    (
      modelRef: React.RefObject<THREE.Group>,
      actions: THREE.AnimationAction[],
      currentAnimation: number
    ) => {
      if (isJumping || !modelRef.current) return;

      setIsJumping(true);

      const startY = modelRef.current.position.y;
      const startTime = performance.now();

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
    isJumping,
    setIsJumping,
    jumpHook,
  };
};

export default usePlayerJump;
