
import axiosInstance from "./AxiosInstance";

const CommentLikeAxios = {
  // 댓글에 좋아요 또는 싫어요 추가/업데이트
  likeOrDislikeComment: async (commentId, likeType) => {
    try {
      const response = await axiosInstance.post("/api/comment-likes", {
        commentId,
        likeType
      });
      return response.data;
    } catch (error) {
      console.error("댓글 좋아요/싫어요 처리 실패", error);
      throw error;
    }
  },

  // 댓글의 좋아요 및 싫어요 수 조회
  getLikeDislikeCount: async (commentId) => {
    try {
      const response = await axiosInstance.get(`/api/comment-likes/${commentId}`);
      return response.data;
    } catch (error) {
      console.error(`id가 ${commentId}인 댓글 좋아요/싫어요 수 불러오기 실패`, error);
      throw error;
    }
  },
};

export default CommentLikeAxios;
