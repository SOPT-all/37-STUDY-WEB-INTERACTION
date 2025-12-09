import React, { useState } from "react";
import * as THREE from "three";
import Player from "./Player";
import Light from "./Light";
import CameraController from "./CameraController";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";

const PLAYER_INITIAL_Y = 0.3;

const Scene: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState(
    new THREE.Vector3(0, PLAYER_INITIAL_Y, 0)
  );

  return (
    <>
      <Light />
      <OrthographicCamera makeDefault />
      <OrbitControls /> {/* 카메라 컨트롤러 */}
      <Player modelSrc="/manman.glb" />
      <CameraController playerPosition={playerPosition} />
    </>
  );
};

export default Scene;
