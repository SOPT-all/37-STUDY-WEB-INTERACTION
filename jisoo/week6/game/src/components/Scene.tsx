import React, { useRef, useState } from "react";
import * as THREE from "three";
import Player from "./Player";
import Floor from "./Floor";
import Light from "./Light";
import CameraController from "./CameraController";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";

const PLAYER_INITIAL_Y = 0.3;

const Scene: React.FC = () => {
  const floorRef = useRef<THREE.Mesh>(null);
  const [playerPosition, setPlayerPosition] = useState(
    new THREE.Vector3(0, PLAYER_INITIAL_Y, 0)
  );

  return (
    <>
      <Light />
      <OrthographicCamera makeDefault />
      <Floor ref={floorRef} textureUrl="/grass.png" />
      <OrbitControls /> {/* 카메라 컨트롤러 */}
      <Player modelSrc="/manman.glb" />
      <CameraController playerPosition={playerPosition} />
    </>
  );
};

export default Scene;
