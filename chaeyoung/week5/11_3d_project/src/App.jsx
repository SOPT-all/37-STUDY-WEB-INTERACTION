import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

function Box(props) {
  const meshRef = useRef();

  // useFrame: Three.js 컨텍스트의 상태 가져올 수 있음
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    // mesh: 무대!!
    <mesh {...props} ref={meshRef}>
      {/* boxGeometry: 정육면체 지오메트리 생성 */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="skyblue" roughness={1} metalness={1.5}/>
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <spotLight
        position={[5, 5, 5]}
        angle={0.35}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <Box position={[0, 0, 0]} />
    </>
  );
}

export default function App() {
  return (
    <Canvas>
      <Scene />
      {/* OrbitControls: 카메라 컨트롤 기능, 사용자가 3d 장면을 직관적으로 탐색하여 카메라가 중심점 주위를 돌게 해줌, 확대, 축소, 이동 사용할 수 있게! */}
      <OrbitControls />
      <Environment preset="sunset" background />
    </Canvas>
  );
}
