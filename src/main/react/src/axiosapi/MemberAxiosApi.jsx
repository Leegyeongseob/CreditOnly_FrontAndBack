import AxiosInstance from "./AxiosInstance";

const MemberAxiosApi = {
  //토큰으로 이메일 불러오기
  getEmail: async () => {
    return await AxiosInstance.get("/member/getEmail");
  },

  //회원수정을 위한 계정을 불러오기 위한 axois
  memberAxios: async (email) => {
    const member = { email: email };
    return await AxiosInstance.post("/member/info", member);
  },
  //회원 수정 Axios
  memberModify: async (email, updateEmail, pwd, name, nickName, coupleName) => {
    const member = {
      email: email,
      updateEmail: updateEmail,
      pwd: pwd,
      name: name,
      nickName: nickName,
      coupleName: coupleName,
    };
    return await AxiosInstance.post("/member/modify", member);
  },
  //회원 삭제 Axois
  memberDelete: async (email) => {
    const member = {
      email: email,
    };
    return await AxiosInstance.post("/member/delete", member);
  },
  //프로필url 저장 Axios
  profileUrlSave: async (email, url) => {
    return await AxiosInstance.get(
      `/member/profileUrlSave?email=${email}&url=${url}`
    );
  },
  //이메일로 프로필 url 가져오기
  searchProfileUrl: async (email) => {
    return await AxiosInstance.get(`/member/searchProfileUrl?email=${email}`);
  },

  // 관리자 이메일 가져오기
  getAdminEmails: async () => {
    return await AxiosInstance.get("/member/adminEmails");
  },
};

export default MemberAxiosApi;
