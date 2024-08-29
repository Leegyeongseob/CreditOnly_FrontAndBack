import AxiosInstance from "./AxiosInstance";
const ChatDataFetch = {
  //ChatBot 데이터 받아오기
  searchChatBotDataFetch: async (activeTopic,message) => {
    return await AxiosInstance.get(`/chatbot/fetch?activeTopic=${activeTopic}&message=${message}`);
  },
};
export default ChatDataFetch;
