import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface IPlyaerProps {
  modelSrc: string;
}

const Player: React.FC<IPlyaerProps> = ({ modelSrc }) => {
  const { scene } = useGLTF(modelSrc);
  const modelRef = useRef<THREE.Group>(null);

  return <primitive ref={modelRef} object={scene} scale={[1, 1, 1]} />;
};

export default Player;
