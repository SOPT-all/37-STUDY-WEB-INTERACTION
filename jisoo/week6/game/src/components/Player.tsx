import React, { useRef, useState, useEffect, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const enum AnimationState {
  IDLE = 0,
  JUMP = 1,
  WALK = 2,
}

interface IPlayerProps {
  modelSrc: string;
}

const Player: React.FC<IPlayerProps> = ({ modelSrc }) => {
  const { scene, animations } = useGLTF(modelSrc);
  const modelRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const [actions, setActions] = useState<THREE.AnimationAction[]>([]);

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

      // 기본 애니메이션 시작
      if (newActions[AnimationState.IDLE]) {
        newActions[AnimationState.IDLE].play();
      }
    }
  }, [animations]);

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
  });

  return <primitive ref={modelRef} object={scene} scale={[0.5, 0.5, 0.5]} />;
};

export default Player;
