import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

const Box = () => {
  // 3D 메시에 대한 참조
  const meshRef = useRef();

  // 목표 회전 수
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  // 현재 얼마나 회전했는지
  const currentRotationRef = useRef({ x: 0, y: 0 });

  /* 스크롤 이벤트 */
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setTargetRotation({
        x: progress * Math.PI * 2,
        y: progress * Math.PI * 2,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    // 부드럽게 회전 애니메이션 적용
    if (meshRef.current) {
      // 현재 회전을 목표 회전에 조금씩 다가가게 함
      currentRotationRef.current.x +=
        (targetRotation.x - currentRotationRef.current.x) * 0.1;
      currentRotationRef.current.y +=
        (targetRotation.y - currentRotationRef.current.y) * 0.1;
      // 회전 값을 라디안 단위로 변환하여 적용
      meshRef.current.rotation.x =
        (currentRotationRef.current.x / (Math.PI / 2)) * Math.PI;
      meshRef.current.rotation.y =
        (currentRotationRef.current.y / (Math.PI / 2)) * Math.PI;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {/* 박스 지오메트리 (가로, 세로, 깊이) */}
      <boxGeometry args={[1, 1, 1]} />
      {/* 재질 설정 */}
      <meshStandardMaterial color="violet" roughness={0.5} metalness={0.5} />
    </mesh>
  );
};

const Scene = () => {
  // Three.js의 카메라 가져오기
  const { camera } = useThree();

  // 카메라 위치 설정 (마운트 시 1번 실행함)
  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={1} /> {/* 주변광 설정 */}
      <Box />
      <Environment preset="night" background />
    </>
  );
};

export default function App() {
  return (
    <>
      {/* 3D 캔버스 */}
      <Canvas
        shadows
        style={{
          position: 'fixed', // 스크롤시 화면에 고정 (따라다니도록)
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Scene />
      </Canvas>
      {/* 스크롤 영역 */}
      <div
        id="wrap"
        style={{ position: 'relative', width: '100%', height: '500vh' }} // 5배 길이까지 스크롤 가능
      >
        <p
          style={{
            position: 'absolute',
            top: '50vh',
            width: '100%',
            color: 'white',
            mixBlendMode: 'overlay', // 배경과 섞이는 효과
          }}
        >
          스크롤 하세요.
        </p>
        <p
          style={{
            position: 'absolute',
            top: '300vh',
            width: '100%',
            color: 'white',
            mixBlendMode: 'overlay',
          }}
        >
          계속 스크롤 해보세요.
        </p>
        <p
          style={{
            position: 'absolute',
            top: '400vh',
            width: '100%',
            color: 'white',
            mixBlendMode: 'overlay',
          }}
        >
          거의 다 왔어요.
        </p>
      </div>
    </>
  );
}
