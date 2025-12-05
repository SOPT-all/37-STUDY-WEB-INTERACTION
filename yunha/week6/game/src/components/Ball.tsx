import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

interface IBallProps {
  modelSrc: string;
  position: IPosition;
  visible: boolean;
}

interface IPosition {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

const Ball = ({ modelSrc, position, visible }: IBallProps) => {
  const { x, y, z } = position;
  const { scene: threeScene } = useThree();
  const modelRef = useRef<THREE.Object3D | null>(null);
  const { scene } = useGLTF(modelSrc);
  useEffect(() => {
    if (scene.children[0]) {
      const modelMesh = scene.children[0].clone();

      modelMesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (!child.material) {
            child.material = new THREE.MeshStandardMaterial();
          }
        }
      });

      modelMesh.position.set(x, y - 1, z);
      modelRef.current = modelMesh;
      threeScene.add(modelMesh);

      return () => {
        threeScene.remove(modelMesh);
      };
    }
  }, [scene, x, y, z, threeScene]);

  useEffect(() => {
    if (modelRef.current) {
      const targetY = visible ? y + 2 : y - 3;
      const targetScale = visible ? 1 : 0.8;

      gsap.to(modelRef.current.position, {
        y: targetY,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });

      gsap.to(modelRef.current.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [visible, y]);

  useFrame((_, delta) => {
    if (modelRef.current && visible) {
      modelRef.current.rotation.y += delta * 2;
    }
  });

  return null;
};

export default Ball;
