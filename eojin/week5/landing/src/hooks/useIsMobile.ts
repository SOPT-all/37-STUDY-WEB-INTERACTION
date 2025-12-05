import { useState, useEffect } from 'react';

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia('(max-width: 1024px)');

    const handleMediaQueryChange = (event: MediaQueryListEvent): void => {
      setIsMobile(event.matches);
    };

    // 초기값 설정
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mediaQuery.matches);

    // 이벤트 리스너 등록
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // 클린업 함수 반환
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return isMobile;
};
