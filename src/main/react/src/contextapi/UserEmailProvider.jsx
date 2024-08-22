import { createContext, useEffect, useState } from "react";
import MemberAxiosApi from "../axiosapi/MemberAxiosApi";

// Context 생성
export const UserEmailContext = createContext();

// Context Provider 컴포넌트
const UserEmailProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [authority, setAuthority] = useState(""); // 권한을 관리할 상태 추가
  const [adminEmails, setAdminEmails] = useState([]); // 관리자 이메일 목록을 빈 배열로 초기화
  const [isCreditEvaluation, setIsCreditEvaluation] = useState(false); // 신용평가 상태변수
  const [isLoading, setIsLoading] = useState(false);
  const [kakaoImgUrl,setKakaoImgUrl] = useState("");
  useEffect(() => {
    // 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
      try {
        const response = await MemberAxiosApi.getEmail();
        setEmail(response.data);

        // 데이터에서 배열을 올바르게 추출하여 상태를 업데이트
        const userInfoResponse = await MemberAxiosApi.getAdminEmails();
        const adminEmailsArray = userInfoResponse.data; // data 속성에서 배열 추출
        setAdminEmails(Array.isArray(adminEmailsArray) ? adminEmailsArray : []);
        console.log("관리자 이메일:", adminEmailsArray); // 디버깅용
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <UserEmailContext.Provider
      value={{
        email,
        setEmail,
        imgUrl,
        setImgUrl,
        authority,
        setAuthority,
        adminEmails,
        isCreditEvaluation,
        setIsCreditEvaluation,
        isLoading,
        setIsLoading,
        kakaoImgUrl,
        setKakaoImgUrl
      }}
    >
      {children}
    </UserEmailContext.Provider>
  );
};

export default UserEmailProvider;
