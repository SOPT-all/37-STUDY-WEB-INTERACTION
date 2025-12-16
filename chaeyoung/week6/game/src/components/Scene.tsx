import Player from "./Player";
import Light from "./Light";
import Floor from "./Floor";
import Ball from "./Ball";
import Spot from "./Spot";
// import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";
import CameraController from "./CameraController";

// 상수 정의
const PLAYER_INITIAL_Y = 0.3;
const SPOT_POSITION = { x: 2, y: 0.01, z: 2 };
const BALL_VISIBILITY_THRESHOLD = 1.5;
const CLICK_DELAY = 200;

const Scene = () => {
  const floorRef = useRef<THREE.Mesh>(null);
  // raycaster: 3D 공간에서 광선(ray)를 사용해 객체와의 교차점을 찾는 기술
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

  // 포인터 위치 업데이트
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

  // 포인터 다운 이벤트 핸들러
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

  // 포인터 이동 이벤트 핸들러
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

  // 포인터 리브 이벤트 핸들러
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
        {/* OrbitControls: 마우스로 데굴데굴 가능 */}
        {/* <OrbitControls /> */}
        {/* OrthographicCamera: 직교 카메라 */}
        <OrthographicCamera makeDefault />
        <Floor ref={floorRef} textureUrl="/ganadi.jpeg" />
        <Spot position={SPOT_POSITION} />
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
