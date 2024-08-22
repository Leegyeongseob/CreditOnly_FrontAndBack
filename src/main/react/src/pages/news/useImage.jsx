import { useCallback } from "react";

// 훅 정의
const useImageErrorHandler = () => {
  const handleImageError = useCallback((e, id) => {
    e.target.onerror = null; // 무한 루프 방지
    const imgIndex = id % 27; // 인덱스를 1부터 24까지 반복하도록 설정
    e.target.src = require(`../../img/news/img${imgIndex}.jpg`);
  }, []);

  return handleImageError;
};

export default useImageErrorHandler;
