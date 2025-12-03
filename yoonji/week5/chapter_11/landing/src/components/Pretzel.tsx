import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "gsap";

interface IPretzel {
  url: string;
  isMobile: boolean;
}

interface IRotation {
  x: number;
  y: number;
  z: number;
}

interface IMousePosition {
  x: number;
  y: number;
}

export const Pretzel: React.FC<IPretzel> = ({ url, isMobile }) => {
  const { scene } = useGLTF(url);

  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef<IRotation>({ x: 0, y: 0, z: 0 });

  // 마우스 드래그 관련
  const isMouseDownRef = useRef<boolean>(false);
  const lastMousePositionRef = useRef<IMousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        child.material.roughness = 0.2;
        child.material.metalness = 0.1;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    const tl = gsap.timeline();
    const startX = isMobile ? 0 : 1.2;
    const endX = isMobile ? 0 : 0.5;

    if (groupRef.current) {
      tl.fromTo(
        groupRef.current.position,
        { x: startX, y: -0.5, z: -0.25 },
        { x: endX, y: 0.5, z: -0.25 }
      )
        .to(groupRef.current.scale, { x: 0.9, y: 0.9, z: 0.9 }, "<")
        .to(
          rotationRef.current,
          { x: Math.PI, y: Math.PI * 2, z: Math.PI },
          "<"
        )
        .to(groupRef.current.position, {
          y: 0,
          x: endX,
          z: 0,
        })
        .to(
          groupRef.current.scale,
          {
            x: 1.3,
            y: 1.3,
            z: 1.3,
          },
          "<"
        )
        .to(rotationRef.current, { x: Math.PI / 2, y: 0, z: 0 }, "<");
    }
  }, [scene, isMobile]);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      isMouseDownRef.current = true;
      lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseDownRef.current && groupRef.current) {
        const delta = {
          x: e.clientX - lastMousePositionRef.current.x,
          y: e.clientY - lastMousePositionRef.current.y,
        };

        const rotationSpeed = 0.01;

        groupRef.current.rotation.y += delta.x * rotationSpeed;
        groupRef.current.rotation.x += delta.y * rotationSpeed;

        lastMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [scene]);

  useFrame(() => {
    if (!isMouseDownRef.current && groupRef.current) {
      groupRef.current.rotation.x +=
        (rotationRef.current.x - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y +=
        (rotationRef.current.y - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.z +=
        (rotationRef.current.z - groupRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <group ref={rotationRef} rotation={[-Math.PI / 60, -30, 0]}>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
};
