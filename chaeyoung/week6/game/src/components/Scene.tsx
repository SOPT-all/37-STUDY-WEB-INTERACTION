import Player from "./Player";
import Light from "./Light";
import { OrbitControls } from "@react-three/drei";

const Scene = () => {
  return (
    <>
      <Light />
      {/* OrbitControls: 마우스로 데굴데굴 가능 */}
      <OrbitControls /> 
      <Player modelSrc="/manman.glb" />
    </>
  );
};

export default Scene;
