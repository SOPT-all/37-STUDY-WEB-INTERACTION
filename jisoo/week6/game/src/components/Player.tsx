import React, { useRef, useState, useEffect, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { setAngle } from "../utils/utils";

enum AnimationState {
  IDLE = 0,
  WALK = 1,
}

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
  const { scene, animations } = useGLTF(modelSrc);

  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const modelRef = useRef<THREE.Group>(null);

  const [actions, setActions] = useState<THREE.AnimationAction[]>([]);
  const [currentAnimation, setCurrentAnimation] = useState<AnimationState>(
    AnimationState.IDLE
  );

  // 현재 위치 관리
  const currentPosition = useRef(new THREE.Vector3(0, 0, 0));

  const { camera } = useThree();

  // 3D 모델 설정
  const setupModel = useCallback((model: THREE.Object3D) => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }, []);

  // 모델의 애니메이션 초기화
  const setupAnimations = useCallback(() => {
    if (modelRef.current) {
      mixerRef.current = new THREE.AnimationMixer(modelRef.current);
      const newActions = animations.map((clip) =>
        mixerRef.current!.clipAction(clip)
      );
      setActions(newActions);

      if (newActions[AnimationState.IDLE]) {
        newActions[AnimationState.IDLE].play();
      }
    }
  }, [animations]);

  // 목표 위치에 따라 플레이어 위치 업데이트
  const updatePosition = useCallback(
    (delta: number) => {
      const distance = currentPosition.current.distanceTo(targetPosition);

      if (distance > 0.1) {
        const direction = targetPosition
          .clone()
          .sub(currentPosition.current)
          .normalize();
        const movement = direction.multiplyScalar(movementSpeed * delta);
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
    [targetPosition, movementSpeed, rotationSpeed]
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
      case isMoving:
        nextAnimationState = AnimationState.WALK;
        break;
      default:
        nextAnimationState = AnimationState.IDLE;
    }

    setAnimationState(nextAnimationState);
  }, [targetPosition, currentAnimation, actions]);

  // 플레이어를 따라 카메라 위치 업데이트
  const updateCameraPosition = (
    camera: THREE.Camera,
    playerPosition: THREE.Vector3
  ) => {
    camera.position.x = playerPosition.x + 5;
    camera.position.z = playerPosition.z + 5;
    camera.lookAt(playerPosition);
  };

  useEffect(() => {
    if (modelRef.current) {
      setupModel(modelRef.current);
      setupAnimations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, animations]);

  // 매 프레임마다 실행되는 메인 업데이트 루프
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
