import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import type { IPosition } from '../types/type';

interface IBallProps {
  modelSrc: string;
  position: IPosition;
  visible: boolean;
}

// Ball 컴포넌트
const Ball: React.FC<IBallProps> = ({ modelSrc, position, visible }) => {
  const { x, y, z } = position;
  // Three.js 씬에 접근
  const { scene: threeScene } = useThree();
  // 모델의 참조를 저장합니다.
  const modelRef = useRef<THREE.Object3D | null>(null);
  // 축구공 모델 로드
  const { scene } = useGLTF(modelSrc);
  // 모델 초기화 및 씬에 추가
  useEffect(() => {
    if (scene.children[0]) {
      // 모델의 첫 번째 자식 복사하여 할당
      const modelMesh = scene.children[0].clone();

      // 모델의 모든 메시에 대해 그림자 설정 및 재질 적용
      modelMesh.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // 메시에 그림자 설정을 적용
          child.castShadow = true;
          child.receiveShadow = true;

          // 재질이 없는 경우 기본 재질을 생성
          if (!child.material) {
            child.material = new THREE.MeshStandardMaterial();
          }
        }
      });

      // 모델의 초기 위치를 설정합니다.
      modelMesh.position.set(x, y - 1, z);
      modelRef.current = modelMesh;
      // 씬에 모델을 추가합니다.
      threeScene.add(modelMesh);

      // 컴포넌트가 언마운트될 때 씬에서 모델을 제거합니다.
      return () => {
        threeScene.remove(modelMesh);
      };
    }
  }, [scene, x, y, z, threeScene]);

  // visible 상태에 따라 위치와 크기 애니메이션 적용
  useEffect(() => {
    if (modelRef.current) {
      // 목표 Y 위치와 크기 계산
      const targetY = visible ? y + 2 : y - 3;
      const targetScale = visible ? 1 : 0.8;

      // 위치 애니메이션
      gsap.to(modelRef.current.position, {
        y: targetY,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      });

      // 크기 애니메이션
      gsap.to(modelRef.current.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }
  }, [visible, y]);

  // 매 프레임마다 공 회전
  useFrame((_, delta) => {
    if (modelRef.current && visible) {
      // 공이 보일 때만 회전
      modelRef.current.rotation.y += delta * 2;
    }
  });

  return null;
};

export default Ball;
