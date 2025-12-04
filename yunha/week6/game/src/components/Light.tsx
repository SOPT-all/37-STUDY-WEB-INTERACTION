import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const Light = () => {
  const { scene } = useThree();
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const helperRef = useRef<THREE.DirectionalLightHelper | null>(null);

  useEffect(() => {
    if (directionalLightRef.current) {
      const helper = new THREE.DirectionalLightHelper(
        directionalLightRef.current,
        20
      );
      helperRef.current = helper;
      return () => {
        if (helperRef.current) {
          scene.remove(helperRef.current);
        }
      };
    }
  }, [scene]);

  return (
    <>
      {/* 환경광 전체적인 기본 조명 제공 */}
      <ambientLight intensity={0.6} />

      {/* 방향광 주요 조명과 그림자 생성 */}
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
