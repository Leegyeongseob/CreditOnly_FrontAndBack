import axiosInstance from "./AxiosInstance";
import { performSimilaritySearch, handleError } from "./apiUtils";

const DartAxios = {
  // DART 데이터를 POST 요청으로 전송
  postDartData: async (requestBody, query) => {
    try {
      console.log(
        "postDartData - Performing similarity search with query:",
        query
      );
      await performSimilaritySearch(query);

      console.log(
        "postDartData - Sending DART data request with body:",
        requestBody
      );
      const response = await axiosInstance.post(
        "/api/elastic/company/dart",
        requestBody,
        {
          params: { query },
        }
      );

      console.log("postDartData - Response received:", response.data);
      return response.data;
    } catch (error) {
      handleError(error, "posting DART data");
    }
  },

  // DART 데이터를 GET 요청으로 가져옴
  getDartData: async () => {
    try {
      console.log("getDartData - Fetching DART data");
      const response = await axiosInstance.get("/api/elastic/company/get_dart");

      console.log("getDartData - Response received:", response.data);
      return response.data;
    } catch (error) {
      handleError(error, "fetching DART data");
    }
  },
};

export default DartAxios;
