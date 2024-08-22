import axios from "axios";
import Common from "../common/Common";
const LoginAxios = {
  // 회원가입
  memberSignUp: async (email, pwd, name, registrationNumber) => {
    const member = {
      email: email,
      pwd: pwd,
      name: name,
      registrationNumber: registrationNumber,
    };
    return await axios.post(Common.CreditOnly_DOMAIN + "/auth/signup", member);
  },
  // 아이디 중복확인
  emailIsExist: async (email) => {
    const emailObject = {
      email: email,
    };
    return await axios.post(
      Common.CreditOnly_DOMAIN + "/auth/email",
      emailObject
    );
  },
  // 로그인
  login: async (email, pwd) => {
    const member = {
      email: email,
      pwd: pwd,
    };
    return await axios.post(Common.CreditOnly_DOMAIN + "/auth/login", member);
  },
  //아이디 찾기
  findIdResult: async (name, registrationNumber) => {
    const member = {
      name: name,
      registrationNumber: registrationNumber,
    };
    return await axios.post(
      Common.CreditOnly_DOMAIN + "/auth/findIdResult",
      member
    );
  },
  //패스워드 찾기
  findPwdResult: async (email, name, registrationNumber) => {
    const member = {
      email: email,
      name: name,
      registrationNumber: registrationNumber,
    };
    return await axios.post(
      Common.CreditOnly_DOMAIN + "/auth/findPwdResult",
      member
    );
  },
  //패스워드 수정
  updatePwd: async(email,pwd)=>{
    const member = {
      email:email,
      pwd:pwd
    };
    return await axios.post(
      Common.CreditOnly_DOMAIN + "/auth/updatePwd",
      member
    );
  }
};
export default LoginAxios;
