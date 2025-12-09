import Player from "./Player";
import Light from "./Light";
import Floor from "./Floor";
// import { OrbitControls } from "@react-three/drei";
import { OrthographicCamera } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";
import CameraController from "./CameraController";

const PLAYER_INITIAL_Y = 0.3;

const Scene = () => {
  const floorRef = useRef<THREE.Mesh>(null);
  const [playerPosition, setPlayerPosition] = useState(
    new THREE.Vector3(0, PLAYER_INITIAL_Y, 0)
  );
  return (
    <>
      <Light />
      {/* OrbitControls: 마우스로 데굴데굴 가능 */}
      {/* <OrbitControls /> */}

      {/* OrthographicCamera: 직교 카메라, makeDefault 설정 시 기본 카메라로 설정됨. */}
      <OrthographicCamera makeDefault />
      <Player modelSrc="/manman.glb" />
      <CameraController playerPosition={playerPosition} />
      <Floor ref={floorRef} textureUrl="/ganadi.jpeg" />
    </>
  );
};

export default Scene;
