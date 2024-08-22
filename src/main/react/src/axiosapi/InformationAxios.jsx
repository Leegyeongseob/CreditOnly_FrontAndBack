import axiosInstance from "./AxiosInstance";

const InformationAxios = {
  // 정보 생성
  createInformation: async (informationReqDto) => {
    try {
      const response = await axiosInstance.post("/api/informations", informationReqDto);
      return response.data;
    } catch (error) {
      console.error("정보 생성 실패:", error);
      throw error;
    }
  },

  // 정보 수정
  updateInformation: async (id, informationReqDto) => {
    try {
      const response = await axiosInstance.put(`/api/informations/${id}`, informationReqDto);
      return response.data;
    } catch (error) {
      console.error(`정보 수정 실패 (ID: ${id}):`, error);
      throw error;
    }
  },

  // 정보 삭제
  deleteInformation: async (id) => {
    try {
      await axiosInstance.delete(`/api/informations/${id}`);
    } catch (error) {
      console.error(`정보 삭제 실패 (ID: ${id}):`, error);
      throw error;
    }
  },

  // 정보 ID로 조회
  getInformationById: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/informations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`정보 조회 실패 (ID: ${id}):`, error);
      throw error;
    }
  },

  // 모든 정보 조회 (페이지 네이션 제거)
  getAllInformation: async () => {
    try {
      const response = await axiosInstance.get("/api/informations");
      return response.data;
    } catch (error) {
      console.error("모든 정보 조회 실패:", error);
      throw error;
    }
  },

  // 카테고리별 정보 조회 (페이지 네이션 제거)
  getInformationByCategory: async (category) => {
    try {
      const response = await axiosInstance.get(`/api/informations/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`카테고리별 정보 조회 실패 (Category: ${category}):`, error);
      throw error;
    }
  }
};

export default InformationAxios;
