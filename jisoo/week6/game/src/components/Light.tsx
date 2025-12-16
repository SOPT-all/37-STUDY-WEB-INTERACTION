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
        castShadow // 그림자 생성 활성화
        shadow-mapSize-width={4096} // 그림자 맵 가로 해상도
        shadow-mapSize-height={4096} // 그림자 맵 세로 해상도
        shadow-camera-far={200} // 그림자 카메라의 원거리 평면
        shadow-camera-left={-100} // 그림자 카메라의 좌측 평면
        shadow-camera-right={100} // 그림자 카메라의 우측 평면
        shadow-camera-top={100} // 그림자 카메라의 상단 평면
        shadow-camera-bottom={-100} // 그림자 카메라의 하단 평면
        shadow-bias={-0.0001}
      />
    </>
  );
};

export default Light;
