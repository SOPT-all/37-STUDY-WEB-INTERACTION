import { forwardRef } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface IFloorProps {
  textureUrl: string;
}

/*
Floor: 바닥 컴포넌트
- forwardRef를 사용해서 컴포넌트 상위에서 접근할 수 있도록
- useLoader 사용해서 텍스처를 비동기적으로 실행하고, RepeatWrapping 설정(100x100 반복)
 */
const Floor = forwardRef<THREE.Mesh, IFloorProps>(({ textureUrl }, ref) => {
  // 바닥 텍스처 로드
  const floorTexture = useLoader(THREE.TextureLoader, textureUrl);
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(100, 100);

  return (
    <mesh
      // 부모에게 받은 ref 전달
      ref={ref}
      rotation-x={-Math.PI / 2}
      receiveShadow
      position={[0, 0, 0]}
    >
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        map={floorTexture}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
});

export default Floor;
