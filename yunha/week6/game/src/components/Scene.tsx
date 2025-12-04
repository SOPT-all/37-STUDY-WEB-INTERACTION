import Player from "./Player";
import Light from "./Light";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import Floor from "./Floor";
import CameraController from "./CameraController";
import { OrthographicCamera } from "@react-three/drei";

const PLAYER_INITIAL_Y = 0.3;

const Scene = () => {
  const floorRef = useRef<THREE.Mesh>(null);

  const [playerPosition, setPlayPosition] = useState(
    new THREE.Vector3(0, PLAYER_INITIAL_Y, 0)
  );

  return (
    <>
      <Light />
      <OrthographicCamera makeDefault />
      <OrbitControls />
      <Player modelSrc="/manman.glb" />
      <Floor ref={floorRef} textureUrl="/grass.png" />
      <CameraController playerPosition={playerPosition} />
    </>
  );
};

export default Scene;
