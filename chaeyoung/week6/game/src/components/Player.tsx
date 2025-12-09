import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface IPlayerProps {
  modelSrc: string;
}

const Player: React.FC<IPlayerProps> = ({ modelSrc }) => {
  const { scene } = useGLTF(modelSrc);
  const modelRef = useRef<THREE.Group>(null);

  return <primitive object={scene} ref={modelRef} scale={[1, 1, 1]} />;
};

export default Player;
