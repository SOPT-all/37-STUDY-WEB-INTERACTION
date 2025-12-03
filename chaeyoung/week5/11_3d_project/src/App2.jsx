import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

// Box 컴포넌트
const Box = () => {
  // 3D 메시에 대한 참조 생성
  const meshRef = useRef();

  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });
  const currentRotationRef = useRef({ x: 0, y: 0 });

  // 컴포넌트가 마운트된 후 애니메이션 설정
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      // 현재 회전 값을 목표로 회전 값으로 부드럽게 보간
      currentRotationRef.current.x +=
        (targetRotation.x - currentRotationRef.current.x) * 0.1;
      currentRotationRef.current.y +=
        (targetRotation.y - currentRotationRef.current.y) * 0.1;

      // 메시의 회전 값 업데이트
      meshRef.current.rotation.x =
        (currentRotationRef.current.x / (Math.PI * 2)) * Math.PI * 2;
      meshRef.current.rotation.y =
        (currentRotationRef.current.y / (Math.PI * 2)) * Math.PI * 2;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="violet" roughness={0.5} metalness={0.5} />
    </mesh>
  );
};

// 3D 씬을 설정하는 컴포넌트
const Scene = () => {
  // Three.js의 카메라
  const { camera } = useThree();

  // 카메라 위치 설정
  useEffect(() => {
    camera.position.set(0, 0, 5);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={1} />
      <Box />
      <Environment preset="park" background />
    </>
  );
};

// 메인 App 컴포넌트
export default function App() {
  return (
    <>
      {/* 3D 캔버스 */}
      <Canvas
        shadows
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Scene />
      </Canvas>
      <div
        id="wrap"
        style={{ position: "relative", width: "100%", height: "500vh" }}
      >
        <p
          style={{
            position: "absolute",
            top: "50vh",
            width: "100%",
            color: "white",
            mixBlendMode: "overlay",
          }}
        >
          스크롤 하세요.
        </p>
        <p
          style={{
            position: "absolute",
            top: "300vh",
            width: "100%",
            color: "white",
            mixBlendMode: "overlay",
          }}
        >
          계속 스크롤 해보세요.
        </p>
        <p
          style={{
            position: "absolute",
            top: "400vh",
            width: "100%",
            color: "white",
            mixBlendMode: "overlay",
          }}
        >
          거의 다 왔어요.
        </p>
      </div>
    </>
  );
}
