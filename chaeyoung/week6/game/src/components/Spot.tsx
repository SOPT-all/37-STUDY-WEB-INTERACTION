import React from "react";
import type { IPosition } from "../types/type";

interface ISpotProps {
  position: IPosition;
}

/**
 * Spot
 - 원형 스팟 렌더링. 목표 지점이나 중요한 위치 표시 시 사용
 */
const Spot: React.FC<ISpotProps> = ({ position }) => {
  return (
    <mesh
      position={[position.x, position.y, position.z]}
      rotation-x={-Math.PI / 2}
      receiveShadow
    >
      <circleGeometry args={[1.2, 20]} />{" "}
      <meshStandardMaterial color="red" transparent opacity={0.5} />
    </mesh>
  );
};

export default Spot;
