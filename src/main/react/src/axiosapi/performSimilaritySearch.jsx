import axiosInstance from "./AxiosInstance";

// 유사도 검색 요청을 수행하는 함수 (실제 필요한 데이터만 가져오는 통합 함수)
export const performSimilaritySearch = async (query) => {
  try {
    console.log("performSimilaritySearch - Sending query:", query);
    const response = await axiosInstance.post(
      "/api/elastic/similarity_search",
      { query }
    );
    console.log("performSimilaritySearch - Response received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error performing similarity search:", error);
    throw error; // 오류가 발생하면 여기서 예외를 던져 처리
  }
};

// 에러 처리 함수 정의 및 내보내기
export const handleError = (error, operation) => {
  console.error(`Error ${operation}:`, error);
  throw error;
};
