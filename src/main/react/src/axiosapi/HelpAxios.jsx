import AxiosInstance from "./AxiosInstance";
const HelpAxios = {
  // 문의 데이터를 서버로 전송하는 비동기 함수
  postHelpSend: async (helpData) => {
    return await AxiosInstance.post("/help/send", helpData);
  },

  // 이메일로 문의 내역 가져오기
  getHelpRequests: async (email) => {
    return await AxiosInstance.get("/help/getAll", {
      params: { email },
    });
  },
};
export default HelpAxios;
