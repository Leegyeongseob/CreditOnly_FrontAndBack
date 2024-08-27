import axiosInstance from "./AxiosInstance";

const BoardAxios = {
  fetchBoardData: async (page, size) => {
    try {
      const response = await axiosInstance.get("/boards/load", {
        params: {
          page: page,
          size: size,
        },
      });
      return response.data;
    } catch (error) {
      console.error("게시글 데이터 불러오기 실패", error);
      throw error;
    }
  },

  fetchBoardById: async (id) => {
    try {
      const idobj = {
        id: id,
      };
      return await axiosInstance.post("/boards/fetchBoardById", idobj);
    } catch (error) {
      console.error(`id가 ${id}인 게시글 데이터 불러오기 실패`, error);
      throw error;
    }
  },
  createBoard: async (boardReqDto, coupleName) => {
    try {
      console.log("aixos 확인", boardReqDto);
      const response = await axiosInstance.post(
        `/boards/save/${coupleName}`,
        boardReqDto
      );
      return response.data;
    } catch (error) {
      console.error("게시글 생성 실패:", error);
      throw error;
    }
  },

  updateBoard: async (id, boardReqDto) => {
    try {
      const response = await axiosInstance.put(
        `/boards/update/${id}`,
        boardReqDto
      );
      return response.data;
    } catch (error) {
      console.error(`id가 ${id}인 게시글 업데이트 실패`, error);
      throw error;
    }
  },

  deleteBoard: async (id) => {
    try {
      await axiosInstance.delete(`/boards/delete?id=${id}`);
    } catch (error) {
      console.error(`id가 ${id}인 게시글 삭제 실패`, error);
      throw error;
    }
  },
  getCoupleName: async (coupleName) => {
    const getCoupleName = await axiosInstance.get(
      `/boards/couple/${coupleName}`
    );
    return getCoupleName;
  },
};

export default BoardAxios;
