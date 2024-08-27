import axiosInstance from "./AxiosInstance";
import { performSimilaritySearch, handleError } from "./apiUtils";

const FinancialDataAxios = {
  getFinancialData: async (fncoNm, query) => {
    try {
      console.log(
        "getFinancialData - Performing similarity search with query:",
        query
      );
      await performSimilaritySearch(query);

      console.log(
        "getFinancialData - Fetching financial data for fncoNm:",
        fncoNm
      );
      const response = await axiosInstance.get(
        "/api/elastic/economic/financial_data",
        {
          params: { fncoNm, query },
        }
      );

      console.log("getFinancialData - Response received:", response.data);
      return response.data;
    } catch (error) {
      console.error("getFinancialData - Error fetching financial data:", error);
      handleError(error, "fetching financial data");
    }
  },
};

export default FinancialDataAxios;
