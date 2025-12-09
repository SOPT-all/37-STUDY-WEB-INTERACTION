import React from "react";
import Player from "./Player";
import Light from "./Light";
import { OrbitControls } from "@react-three/drei";

const Scene: React.FC = () => {
  return (
    <>
      <Light />
      <OrbitControls /> {/* 카메라 컨트롤러 */}
      <Player modelSrc="/manman.glb" />
    </>
  );
};

export default Scene;
