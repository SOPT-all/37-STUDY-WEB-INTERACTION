import { useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Light: React.FC = () => {
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
      {/* 환경광: 전체적인 기본 조명 제공 */}
      <ambientLight intensity={0.6} />

      {/* 방향광: 주요 조명과 그림자 생성 */}
      <directionalLight
        ref={directionalLightRef}
        position={[50, 50, -25]} // 광원의 위치
        intensity={1} // 조명의 강도
        castShadow // 그림자 생성
        shadow-mapSize-width={4096} // 그림자 맵의 가로 해상도
        shadow-mapSize-height={4096} // 그림자 맵의 세로 해상도
        shadow-camera-fat={200} // 그림자 카메라의 원거리 평면
        shadow-camera-left={-100} // 그림자 카메라의 왼쪽 경계
        shadow-camera-right={100} // 그림자 카메라의 오른쪽 경계
        shadow-camera-top={100} // 그림자 카메라의 상단 경계
        shadow-camera-bottom={-100} // 그림자 카메라의 하단 경계
        shadow-bias={-0.0001} // 그림자 바이어스 조정
      />
    </>
  );
};

export default Light;
