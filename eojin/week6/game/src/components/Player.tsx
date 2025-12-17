import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { setAngle } from '../utils/utils';
import usePlayerJump from '../hooks/usePlayerJump';
import { AnimationState } from '../types/type';

interface IPlayerProps {
  modelSrc: string;
  targetPosition: THREE.Vector3;
  onPositionUpdate: (position: THREE.Vector3) => void;
  movementSpeed?: number;
  rotationSpeed?: number;
}

const Player: React.FC<IPlayerProps> = ({
  modelSrc,
  targetPosition,
  onPositionUpdate,
  movementSpeed = 3,
  rotationSpeed = 20,
}) => {
  // 3D 모델과 애니메이션 로드
  const { scene, animations } = useGLTF(modelSrc);

  // Three.js 객체에 대한 참조를 생성
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const modelRef = useRef<THREE.Group>(null);

  // 애니메이션 액션과 현재 애니메이션 상태를 관리
  const [actions, setActions] = useState<THREE.AnimationAction[]>([]);
  const [currentAnimation, setCurrentAnimation] = useState<AnimationState>(
    AnimationState.IDLE
  );

  // 현재 위치를 참조로 관리하여 불필요한 리렌더링 방지
  const currentPosition = useRef(new THREE.Vector3(0, 0, 0));

  // Three.js 카메라에 접근
  const { camera } = useThree();

  // 점프 기능을 위한 커스텀 훅 사용
  const { isJumping, jumpHook } = usePlayerJump();

  // 3D 모델의 설정 초기화
  const setupModel = useCallback((model: THREE.Object3D) => {
    // 모든 메시에 그림자 설정 적용
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }, []);

  // 애니메이션 초기화
  const setupAnimations = useCallback(() => {
    if (modelRef.current) {
      mixerRef.current = new THREE.AnimationMixer(modelRef.current);
      const newActions = animations.map((clip) =>
        mixerRef.current!.clipAction(clip)
      );
      setActions(newActions);

      // 기본 애니메이션 IDLE로 설정
      if (newActions[AnimationState.IDLE]) {
        newActions[AnimationState.IDLE].play();
      }
    }
  }, [animations]);

  // 점프 동작을 위한 콜백 함수
  const jump = useCallback(() => {
    jumpHook(
      modelRef as React.RefObject<THREE.Group>,
      actions,
      currentAnimation
    );
  }, [actions, currentAnimation, jumpHook]);

  // 목표 위치에 따라 플레이어의 위치 업데이트
  const updatePosition = useCallback(
    (delta: number) => {
      const distance = currentPosition.current.distanceTo(targetPosition);

      if (distance > 0.1) {
        const direction = targetPosition
          .clone()
          .sub(currentPosition.current)
          .normalize();
        const movement = direction.multiplyScalar(
          movementSpeed * delta * (isJumping ? 0.7 : 1)
        );
        currentPosition.current.add(movement);
        modelRef.current!.position.x = currentPosition.current.x;
        modelRef.current!.position.z = currentPosition.current.z;

        // 모델을 이동 방향으로 회전
        const targetAngle = Math.atan2(direction.x, direction.z);
        modelRef.current!.rotation.y = setAngle(
          modelRef.current!.rotation.y,
          targetAngle,
          rotationSpeed * delta
        );
      }
    },
    [targetPosition, movementSpeed, rotationSpeed, isJumping]
  );

  // 플레이어의 상태에 따라 현재 애니메이션 업데이트
  const updateAnimation = useCallback(() => {
    const isMoving = currentPosition.current.distanceTo(targetPosition) > 0.1;

    const setAnimationState = (newState: AnimationState) => {
      if (currentAnimation !== newState) {
        actions[currentAnimation]?.stop();
        actions[newState]?.play();
        setCurrentAnimation(newState);
      }
    };

    let nextAnimationState: AnimationState;

    switch (true) {
      case isJumping:
        nextAnimationState = AnimationState.JUMP;
        break;
      case isMoving:
        nextAnimationState = AnimationState.WALK;
        break;
      default:
        nextAnimationState = AnimationState.IDLE;
    }

    setAnimationState(nextAnimationState);
  }, [isJumping, targetPosition, currentAnimation, actions]);

  // 플레이어를 따라 카메라 위치 업데이트
  const updateCameraPosition = (
    camera: THREE.Camera,
    playerPosition: THREE.Vector3
  ) => {
    camera.position.x = playerPosition.x + 5;
    camera.position.z = playerPosition.z + 5;
    camera.lookAt(playerPosition); // 카메라가 플레이어를 바라보도록 설정
  };

  // 점프 액션(스페이스바)을 위한 이벤트 리스너를 설정
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  useEffect(() => {
    if (modelRef.current) {
      setupModel(modelRef.current);
      setupAnimations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, animations]);

  // 매 프레임마다 위치와 애니메이션 업데이트
  useFrame((_, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta);

    if (modelRef.current) {
      updatePosition(delta);
      updateAnimation();
      onPositionUpdate(modelRef.current.position);
      updateCameraPosition(camera, modelRef.current.position);
    }
  });

  // 3D 모델 렌더링
  return (
    <primitive
      object={scene}
      ref={modelRef}
      position={currentPosition.current}
      scale={[0.5, 0.5, 0.5]}
    />
  );
};

export default Player;
