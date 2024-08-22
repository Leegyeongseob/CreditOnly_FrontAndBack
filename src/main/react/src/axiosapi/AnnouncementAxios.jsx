import AxiosInstance from "./AxiosInstance";
const AnnouncementAxios = {
  // 문의 데이터를 서버로 전송하는 비동기 함수
  postBoard: async (postData) => {
    return await AxiosInstance.post("/announcement/send", postData);
  },

  // 공지사항 세부사항 가져오기
  getAllBoards: async (classTitle) => {
    return await AxiosInstance.get(`/announcement/getAll`, {
      params: { classTitle },
    });
  },
  // 특정 classTitle에 해당하는 공지사항 가져오기
  getNoticesByClassTitle: async (classTitle) => {
    return await AxiosInstance.get(`/announcement/getAll`, {
      params: { classTitle },
    });
  },

  // 특정 이메일에 대한 알림 목록 가져오기
  getNotificationsByEmail: async (email) => {
    return await AxiosInstance.get("/announcement/notifications", {
      params: { email },
    });
  },

  // 알림을 읽음 처리
  markAsRead: async (id, email) => {
    return await AxiosInstance.post(`/announcement/markAsRead`, null, {
      params: { id, email },
    });
  },

  // 공지사항 삭제
  deleteAnnouncement: async (id) => {
    return await AxiosInstance.delete(`/announcement/delete/${id}`);
  },

  //공지사항 수정
  updateAnnouncement: async (id, data) => {
    return await AxiosInstance.put(`/announcement/update/${id}`, data);
  },
};
export default AnnouncementAxios;
