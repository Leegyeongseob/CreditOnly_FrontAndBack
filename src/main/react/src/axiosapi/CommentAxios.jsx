
import axiosInstance from "./AxiosInstance";

const CommentAxios = {
  // 모든 댓글 조회 (관리자용)
  fetchAllComments: async () => {
    try {
      const response = await axiosInstance.get("/api/comments");
      return response.data;
    } catch (error) {
      console.error("모든 댓글 데이터 불러오기 실패", error);
      throw error;
    }
  },

  // 댓글 생성
  createComment: async (commentReqDto) => {
    try {
      const response = await axiosInstance.post("/api/comments", commentReqDto);
      return response.data;
    } catch (error) {
      console.error("댓글 생성 실패", error);
      throw error;
    }
  },

  // 댓글 수정
  updateComment: async (id, commentReqDto) => {
    try {
      const response = await axiosInstance.put(`/api/comments/${id}`, commentReqDto);
      return response.data;
    } catch (error) {
      console.error(`id가 ${id}인 댓글 업데이트 실패`, error);
      throw error;
    }
  },

  // 댓글 삭제
  deleteComment: async (id) => {
    try {
      await axiosInstance.delete(`/api/comments/${id}`);
    } catch (error) {
      console.error(`id가 ${id}인 댓글 삭제 실패`, error);
      throw error;
    }
  },

  // 정보 ID로 댓글 조회
  getCommentsByInformationId: async (informationId) => {
    try {
      const response = await axiosInstance.get(`/api/comments/information/${informationId}`);
      return response.data;
    } catch (error) {
      console.error(`정보 ID가 ${informationId}인 댓글 데이터 불러오기 실패`, error);
      throw error;
    }
  },
};

export default CommentAxios;
