import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

function Box(props) {
  const meshRef = useRef();

  // 매 프레임마다 3d 박스를 회전시키는 애니메이션 효과
  useFrame((state, delta) => {
    // delta: 프레임 간의 시간 간격(초)로, 애니메이션 속도를 일정하게 유지하는 데 사용
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" roughness={0.3} metalness={1.5} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} /> {/* 주변 전체를 비추는 주변광 설정 */}
      <spotLight
        position={[5, 5, 5]}
        angle={0.35}
        penumbra={1} // 빛의 가장자리 부드러움(흐름) 설정
        intensity={1} // 빛의 세기 설정
        castShadow // 빛의 그림자
      />
      <Box position={[0, 0, 0]} />
    </>
  );
}
export default function App() {
  return (
    <Canvas>
      <Scene />
      <OrbitControls />
      <Environment preset="forest" background />
    </Canvas>
  );
}
