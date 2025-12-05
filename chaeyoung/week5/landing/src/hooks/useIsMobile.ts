import { useState, useEffect } from "react";

// 모바일 화면 여부를 판단하는 커스텀 훅
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(max-width: 1024px)");

    const handleMediaQueryChange = (event: MediaQueryListEvent): void => {
      setIsMobile(event.matches);
    };

    // 초기 상태 설정
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mediaQuery.matches);

    // 리스너 등록
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // 클린업 함수
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return isMobile;
};
