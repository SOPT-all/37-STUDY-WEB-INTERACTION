import { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ICameraControllerProps {
  playerPosition: THREE.Vector3;
}

// CameraController: 카메라 동작을 제어하는 컴포넌트
const CameraController = ({ playerPosition }: ICameraControllerProps) => {
  const cameraOffset = useRef(new THREE.Vector3(7, 5, 7)); // 카메라와 캐릭터 위치 사이의 거리 설정
  const cameraLookAtOffset = useRef(new THREE.Vector3(0, 0.5, 0)); // 카메라가 바라보는 지점 설정

  const { camera, size } = useThree();

  useEffect(() => {
    // camera, size를 가져와 변경 시에 적절히 시야 범위 조정
    const updateCamera = () => {
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
    // 윈도우 크기 resize시 카메라 업데이트
    window.addEventListener("resize", updateCamera);
    return () => window.removeEventListener("resize", updateCamera);
  }, [camera, size]);

  // 매 프레임마다 lerp 메서드로 카메라 부드럽게 이동
  useFrame(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      // 카메라 위치 업데이트
      const cameraPosition = new THREE.Vector3().addVectors(
        playerPosition,
        cameraOffset.current
      );
      camera.position.lerp(cameraPosition, 0.1); // 부드럽게 이동
      const lookAtPosition = new THREE.Vector3().addVectors(
        playerPosition,
        cameraLookAtOffset.current
      );
      camera.lookAt(lookAtPosition); // 캐릭터를 바라보도록 설정
    }
  });

  return null;
};

export default CameraController;
