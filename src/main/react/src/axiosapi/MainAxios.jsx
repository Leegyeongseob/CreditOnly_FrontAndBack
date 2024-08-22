import AxiosInstance from "./AxiosInstance";
const MainAxios = {
  //본인 성별 가져오는 비동기 함수
  mySexSearch: async (email) => {
    return await AxiosInstance.get(`/main/mySexSearch?email=${email}`);
  },
  // 검색으로 검색어 포함하는 데이터 받아오는 비동기 함수
  dataSearch: async (email, data) => {
    return await AxiosInstance.get(
      `/main/dataSearch?email=${email}&data=${data}`
    );
  },
};
export default MainAxios;
