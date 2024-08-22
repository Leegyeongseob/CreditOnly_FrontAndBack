import AxiosInstance from "./AxiosInstance";
const SettingAxios = {
  //본인 성별 가져오는 비동기 함수
  getUserInfo: async (email) => {
    return await AxiosInstance.get("/setting/getInfo", {
      params: {
        email: email,
      },
    });
  },
};
export default SettingAxios;
