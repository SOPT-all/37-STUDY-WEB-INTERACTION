import { useThree, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ICametaControllerProps {
  playerPosition: THREE.Vector3;
}

const CameraController = ({ playerPosition }: ICametaControllerProps) => {
  const cameraOffset = useRef(new THREE.Vector3(7, 5, 7));
  const cameraLookAtOffset = useRef(new THREE.Vector3(0, 0.5, 0));

  const { camera, size } = useThree();

  useEffect(() => {
    const updateCamera = () => {
      if (camera instanceof THREE.OrthographicCamera) {
        const aspect = size.width / size.height;
        const newFrustumSize = 5 * Math.max(1, aspect);

        camera.left = (-newFrustumSize * aspect) / 4;
        camera.right = (newFrustumSize * aspect) / 4;
        camera.top = newFrustumSize / 4;
        camera.bottom = -newFrustumSize / 4;
        camera.updateProjectionMatrix();
      }
    };

    updateCamera();
    window.addEventListener("resize", updateCamera);
    return () => window.removeEventListener("resize", updateCamera);
  }, [camera, size]);

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
