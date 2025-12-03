import { Suspense, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Pretzel } from "./Pretzel";
import { SpotLight } from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Scene = ({ isMobile }: { isMobile: boolean }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 3);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#wrap",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // 데스크탑 카메라 애니메이션
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
    } else {
      // 모바일 카메라 애니메이션
      tl.to(camera.position, {
        y: -0.5,
        z: 3.5,
      });
    }
  }, [camera, isMobile]);

  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.8} />
      <pointLight position={[-5, -5, -5]} intensity={1.5} />
      <SpotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1.8}
        castShadow
      />
      <color attach="background" args={["#ff8c42"]} />

      <Suspense fallback={null}>
        <Pretzel url="/Pretzel.glb" isMobile={isMobile} />
      </Suspense>
    </>
  );
};
