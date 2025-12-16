import React from "react";
import type { IPosition } from "../types/type";

interface ISpotProps {
  position: IPosition;
}

const Spot: React.FC<ISpotProps> = ({ position }) => {
  return (
    <mesh
      position={[position.x, position.y, position.z]}
      rotation-x={-Math.PI / 2}
      receiveShadow
    >
      <circleGeometry args={[1.2, 20]} />
      <meshBasicMaterial color="red" transparent opacity={0.5} />
    </mesh>
  );
};
export default Spot;
