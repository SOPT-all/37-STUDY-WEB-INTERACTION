import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Light: React.FC = () => {
  const { scene } = useThree();
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const helperRef = useRef<THREE.DirectionalLightHelper | null>(null);

  useEffect(() => {
    if (directionalLightRef.current) {
      const helper = new THREE.DirectionalLightHelper(
        directionalLightRef.current, // 실제 방향광
        20
      );
      helperRef.current = helper;
      scene.add(helper);
      return () => {
        if (helperRef.current) {
          scene.remove(helperRef.current);
        }
      };
    }
  }, [scene]);

  return (
    <>
      {/* 환경광 -> 전체 조명 */}
      <ambientLight intensity={0.6} />
      {/* 방향광 -> 주요 조명, 그림자 */}
      <directionalLight
        ref={directionalLightRef}
        position={[50, 50, -25]}
        intensity={1}
        castShadow
      />
    </>
  );
};

export default Light;
