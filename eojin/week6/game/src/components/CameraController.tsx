import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ICameraControllerProps {
  playerPosition: THREE.Vector3;
}

const CameraController: React.FC<ICameraControllerProps> = ({
  playerPosition,
}) => {
  // 카메라와 화면 크기 정보를 가져옴
  const { camera, size } = useThree();

  // 카메라 오프셋 값 설정
  const cameraOffset = useRef(new THREE.Vector3(7, 5, 7));

  // 카메라가 바라보는 지점 오프셋 값 설정
  const cameraLookAtOffset = useRef(new THREE.Vector3(0, 0.5, 0));

  useEffect(() => {
    // 카메라 설정을 업데이트하는 함수
    const updateCamera = () => {
      // eslint-disable-next-line react-hooks/immutability
      if (camera instanceof THREE.OrthographicCamera) {
        // 화면 비율 계산
        const aspect = size.width / size.height;
        const newFrustumSize = 5 * Math.max(1, aspect);

        //
        camera.left = (-newFrustumSize * aspect) / 4;
        camera.right = (newFrustumSize * aspect) / 4;
        camera.top = newFrustumSize / 4;
        camera.bottom = -newFrustumSize / 4;
        camera.updateProjectionMatrix();
      }
    };

    // 초기 카메라 설정
    updateCamera();

    // 창 크기 변경 시 카메라 설정 업데이트
    window.addEventListener('resize', updateCamera);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('resize', updateCamera);
  }, [camera, size]);

  // 매 프레임마다 카메라 위치와 시점을 플레이어에 맞게 업데이트
  useFrame(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      const cameraPosition = new THREE.Vector3().addVectors(
        playerPosition,
        cameraOffset.current
      );
      camera.position.lerp(cameraPosition, 0.1);
      const lookAtPosition = new THREE.Vector3().addVectors(
        playerPosition,
        cameraLookAtOffset.current
      );
      camera.lookAt(lookAtPosition);
    }
  });

  return null;
};

export default CameraController;
