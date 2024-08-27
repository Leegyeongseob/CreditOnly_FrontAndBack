import axiosInstance from "./AxiosInstance";
import { performSimilaritySearch, handleError } from "./apiUtils";

const EcosAxios = {
  // ECOS 데이터를 GET 요청으로 가져옴
  getEcosData: async (keyword, query) => {
    try {
      console.log(
        "getEcosData - Performing similarity search with query:",
        query
      );
      await performSimilaritySearch(query);

      console.log("getEcosData - Fetching ECOS data with keyword:", keyword);
      const response = await axiosInstance.get("/api/elastic/ecos", {
        params: { keyword, query },
      });

      console.log("getEcosData - Response received:", response.data);
      return response.data;
    } catch (error) {
      handleError(error, "fetching ECOS data");
    }
  },
};

export default EcosAxios;
