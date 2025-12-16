import { forwardRef } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface IFloorProps {
  textureUrl: string;
}

const Floor = forwardRef<THREE.Mesh, IFloorProps>(({ textureUrl }, ref) => {
  const floorTexture = useLoader(THREE.TextureLoader, textureUrl);
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(100, 100);

  return (
    <mesh
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
