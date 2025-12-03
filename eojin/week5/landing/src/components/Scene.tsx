import { Suspense, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Donut } from './Donut';
import { gsap } from 'gsap';

export const Scene = ({ isMobile }: { isMobile: boolean }) => {
  const { camera } = useThree();

  useEffect(() => {
    // 초기 카메라 위치 설정
    camera.position.set(0, 0, isMobile ? 4 : 3);

    // GSAP 타임라인 생성 및 스크롤 트리거 설정
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#wrap',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    // 데스크톱 환경에서의 카메라 애니메이션
    if (!isMobile) {
      tl.to(camera.position, {
        x: 1,
        y: 0.5,
        z: 3.5,
      })
        .to(camera.position, {
          x: -0.5,
          y: -0.5,
          z: 4,
        })
        .to(camera.position, {
          x: -0.5,
          y: -0.5,
          z: 2.5,
        });
      // 모바일 환경에서의 카메라 애니메이션
    } else {
      tl.to(camera.position, {
        y: -0.5,
        z: 3.5,
      });
    }
  }, [camera, isMobile]);

  // 매 프레임마다 카메라가 원점(0, 0, 0)을 바라보도록 설정
  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* 배경색 지정*/}
      <color attach="background" args={['#ff8c42']} />

      {/* 전체적인 밝기를 주는 환경광 */}
      <ambientLight intensity={1.5} />
      {/* 오른쪽에서 직사광 */}
      <directionalLight position={[5, 5, 5]} intensity={1.8} />
      {/* 왼쪽 아래에서 점광원 */}
      <pointLight position={[-5, -5, -5]} intensity={1.5} />
      {/* 오른쪽 위에서 스포트라이트 */}
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1.8}
        castShadow
      />

      {/* Suspense를 사용해 Donut 컴포넌트를 로드할 때 비동기적으로 처리 */}
      <Suspense fallback={null}>
        <Donut url="/donut.glb" isMobile={isMobile} />
      </Suspense>
    </>
  );
};
