import { useRef, useCallback, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface IPlayerProps {
  modelSrc: string;
}

const enum AnimationState {
  IDLE = 0,
  JUMP = 1,
  WALK = 2,
}

const Player = ({ modelSrc }: IPlayerProps) => {
  const { scene, animations } = useGLTF(modelSrc);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const modelRef = useRef<THREE.Group>(null);

  const setupModel = useCallback((model: THREE.Object3D) => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }, []);

  const setupAnimations = useCallback(() => {
    if (modelRef.current) {
      mixerRef.current = new THREE.AnimationMixer(modelRef.current);
      const newActions = animations.map((clip) =>
        mixerRef.current!.clipAction(clip)
      );

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
  }, [scene, animations]);

  useFrame((_, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta);
  });

  return <primitive object={scene} ref={modelRef} scale={[0.5, 0.5, 0.5]} />;
};

export default Player;
