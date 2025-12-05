import Player from "./Player";
import Light from "./Light";
import { OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import Floor from "./Floor";
import CameraController from "./CameraController";
import Ball from "./Ball";
import { OrthographicCamera } from "@react-three/drei";
import { useThree, type ThreeEvent } from "@react-three/fiber";

const PLAYER_INITIAL_Y = 0.3;
const SPOT_POSITION = { x: 2, y: 0.01, z: 2 };
const BALL_VISIBILITY_THRESHOLD = 1.5;
const CLICK_DELAY = 200;

const Scene = () => {
  const floorRef = useRef<THREE.Mesh>(null);
  const { raycaster, gl, camera } = useThree();

  const [playerPosition, setPlayerPosition] = useState(
    new THREE.Vector3(0, PLAYER_INITIAL_Y, 0)
  );
  const [playerTargetPosition, setPlayerTargetPosition] = useState(
    new THREE.Vector3(0, PLAYER_INITIAL_Y, 0)
  );
  const [isBallVisible, setIsBallVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const clickTimeout = useRef<number | null>(null);

  const updatePointerPosition = (event: ThreeEvent<PointerEvent>) => {
    const canvas = gl.domElement;
    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    const intersects = raycaster.intersectObject(floorRef.current!, true);

    if (intersects.length > 0) {
      const point = intersects[0].point;
      return new THREE.Vector3(point.x, PLAYER_INITIAL_Y, point.z);
    }
    return null;
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (isDragging && event.isPrimary) {
      const newPosition = updatePointerPosition(event);
      if (newPosition) setPlayerTargetPosition(newPosition);
    }
  };

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (clickTimeout.current) clearTimeout(clickTimeout.current);

    clickTimeout.current = window.setTimeout(() => {
      if (event.isPrimary) {
        setIsDragging(true);
        const newPosition = updatePointerPosition(event);
        if (newPosition) setPlayerTargetPosition(newPosition);
      }
    }, CLICK_DELAY);
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
    if (event.isPrimary) {
      setIsDragging(false);
      const newPosition = updatePointerPosition(event);
      if (newPosition) setPlayerTargetPosition(newPosition);
    }
  };

  const handlePointerLeave = () => {
    setIsDragging(false);
  };

  return (
    <>
      <group
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
      >
        <Light />
        <OrthographicCamera makeDefault />
        <OrbitControls />
        <Player
          modelSrc="/manman.glb"
          targetPosition={playerTargetPosition}
          onPositionUpdate={(position) => {
            setPlayerPosition(position);
            const distanceToBall = position.distanceTo(
              new THREE.Vector3(
                SPOT_POSITION.x,
                SPOT_POSITION.y,
                SPOT_POSITION.z
              )
            );
            setIsBallVisible(distanceToBall < BALL_VISIBILITY_THRESHOLD);
          }}
        />
        <Floor ref={floorRef} textureUrl="/grass.png" />
        <Ball
          modelSrc="/ball.glb"
          position={SPOT_POSITION}
          visible={isBallVisible}
        />
        <CameraController playerPosition={playerPosition} />
      </group>
    </>
  );
};

export default Scene;
