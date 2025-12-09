import React, { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ICameraControllerProps {
  playerPosition: THREE.Vector3;
}

const CameraController: React.FC<ICameraControllerProps> = ({
  playerPosition,
}) => {
  const cameraOffset = useRef(new THREE.Vector3(7, 5, 7));
  const cameraLookAtOffset = useRef(new THREE.Vector3(0, 0.5, 0));
  const { camera, size } = useThree();

  useEffect(() => {
    // 카메라 설정 업데이트
    const updateCamera = () => {
      // eslint-disable-next-line react-hooks/immutability
      if (camera instanceof THREE.OrthographicCamera) {
        const aspect = size.width / size.height;
        const newFrustumSize = 5 * Math.max(1, aspect);

        // 카메라 프러스텀 업데이트
        camera.left = (-newFrustumSize * aspect) / 4;
        camera.right = (newFrustumSize * aspect) / 4;
        camera.top = newFrustumSize / 4;
        camera.bottom = -newFrustumSize / 4;
        camera.updateProjectionMatrix();
      }
    };

    updateCamera();
    window.addEventListener("resize", updateCamera);
    return () => {
      window.removeEventListener("resize", updateCamera);
    };
  }, [camera, size]);

  // 매 프레임마다 카메라 위치와 방향 업데이트
  useFrame(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      // 카메라의 목표 위치 계산
      const cameraPosition = new THREE.Vector3().addVectors(
        playerPosition,
        cameraOffset.current
      );
      // 카메라를 부드럽게 목표 위치로 이동 -> 위치 강제 세팅
      camera.position.lerp(cameraPosition, 0.1);

      // 카메라가 바라볼 위치 계산
      const lookAtPosition = new THREE.Vector3().addVectors(
        playerPosition,
        cameraLookAtOffset.current
      );
      // 카메라가 계산된 위치를 바라보도록 설정
      camera.lookAt(lookAtPosition);
    }
  });

  return null;
};

export default CameraController;
