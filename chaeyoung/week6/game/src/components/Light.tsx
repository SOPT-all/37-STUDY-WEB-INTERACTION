import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const Light = () => {
  // const { scene } = useThree();
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);

  // helper 설정 가능: 빛의 방향과 범위를 시각적으로 표시
  // const helperRef = useRef<THREE.DirectionalLightHelper | null>(null);

  // useEffect(() => {
  //   if (directionalLightRef.current) {
  //     const helper = new THREE.DirectionalLightHelper(
  //       directionalLightRef.current,
  //       20
  //     );
  //     helperRef.current = helper;
  //     scene.add(helper); // 씬에 헬퍼 추가

  //     // 클린업 함수: 언마운트 시 helper 제거
  //     return () => {
  //       if (helperRef.current) {
  //         scene.remove(helperRef.current);
  //       }
  //     };
  //   }
  // }, [scene]);

  return (
    <>
      {/* 환경광: 전체적인 기본 조명 */}
      <ambientLight intensity={0.6} />

      {/* 방향광: 특정 방향에서 비추는 조명 */}
      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={[50, 50, 25]}
        intensity={1}
      />
    </>
  );
};

export default Light;
