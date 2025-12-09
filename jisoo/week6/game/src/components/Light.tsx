import React from "react";

const Light: React.FC = () => {
  return (
    <>
      {/* 환경광 -> 전체 조명 */}
      <ambientLight intensity={0.6} />
      {/* 방향광 -> 주요 조명, 그림자 */}
      <directionalLight position={[50, 50, -25]} intensity={1} castShadow />
    </>
  );
};

export default Light;
