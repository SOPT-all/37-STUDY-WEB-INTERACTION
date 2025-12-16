import React, { useRef, useState } from "react";
import * as THREE from "three";
import Player from "./Player";
import Floor from "./Floor";
import Light from "./Light";
import CameraController from "./CameraController";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useThree, type ThreeEvent } from "@react-three/fiber";
import Spot from "./Spot";
import Ball from "./Ball";

const PLAYER_INITIAL_Y = 0.3;
const CLICK_DELAY = 200;
const SPOT_POSITION = { x: 0, y: 0.01, z: 2 };
const BALL_VISIBILITY_THRESHOLD = 1.5;

const Scene: React.FC = () => {
  const floorRef = useRef<THREE.Mesh>(null);
  const { raycaster, gl, camera } = useThree();
  const [playerPosition, setPlayerPosition] = useState(
    new THREE.Vector3(0, PLAYER_INITIAL_Y, 0)
  );
  const [playerTargetPosition, setPlayerTargetPosition] = useState(
    new THREE.Vector3(0, PLAYER_INITIAL_Y, 0)
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isBallVisible, setIsBallVisible] = useState(false);

  const clickTimeout = useRef<number | null>(null);

  // 포인터 위치 3D 좌표로 변환
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

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (isDragging && event.isPrimary) {
      const newPosition = updatePointerPosition(event);
      if (newPosition) setPlayerTargetPosition(newPosition);
    }
  };

  // 포인터 업 이벤트 핸들러
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
        <Spot position={SPOT_POSITION} />
        <Ball
          modelSrc="/ball.glb"
          position={SPOT_POSITION}
          visible={isBallVisible}
        />
        <OrthographicCamera makeDefault />
        <Floor ref={floorRef} textureUrl="/grass.png" />
        <OrbitControls /> {/* 카메라 컨트롤러 */}
        <Player
          modelSrc="/manman.glb"
          targetPosition={playerTargetPosition}
          onPositionUpdate={(position) => {
            setPlayerPosition(position);
            // 플레이어가 특정 위치에 가까워지면 공을 보이게 함
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
        <CameraController playerPosition={playerPosition} />
      </group>
    </>
  );
};

export default Scene;
