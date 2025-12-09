const Light = () => {
  return (
    <>
      {/* 환경광: 전체적인 기본 조명 */}
      <ambientLight intensity={0.6} />

      {/* 방향광: 특정 방향에서 비추는 조명 */}
      <directionalLight castShadow position={[50, 50, -25]} intensity={1} />
    </>
  );
};

export default Light;