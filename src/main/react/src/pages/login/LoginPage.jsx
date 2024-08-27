import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import kakao from "../../img/loginImg/kakako.png";
import { useEffect, useState, useContext } from "react";
import LoginAxios from "../../axiosapi/LoginAxios";
import Common from "../../common/Common";
import Modal from "../../common/utils/ImageModal";
import GoogleAndNaverNotLogin from "../../img/loginImg/구글,네이버 간편 로그인.gif";
import LoginModal from "../../common/utils/Modal";
import KakaoLogin from "react-kakao-login";
import logoImg from "../../img/background/CreditOnlyLogo.png";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";
const LoginDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 500px) {
    order: ${({ order }) => order || 0};
  }
`;
const InputContainer = styled.div`
  width: 60%;
  height: 5vh;
  font-size: 30px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const InputDiv = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 20px;
  border: none;
  border-bottom: 0.21vh solid gray;
  background-color: transparent;
  font-size: 20px;
  font-weight: bolder;
  outline: none;
  &::placeholder {
    text-align: center;
    color: gray;
    font-weight: normal;
    font-style: italic;
  }
`;
const Message = styled.div`
  width: 100%;
  font-size: 15px;
  display: flex;
  justify-content: center;
  color: ${({ isCorrect }) => (isCorrect ? "green" : "red")};
`;

const FindDiv = styled.div`
  width: 82%;
  height: 10%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-style: italic;
  gap: 20px;

  @media screen and (max-width: 500px) {
    order: ${({ order }) => order || 0};
  }
`;

const Signin = styled.div`
  width: 40%;
  height: 100%;
  font-size: 20px;
  color: #367ee9;
  font-weight: 500;
  display: flex;
  justify-content: first baseline;
  align-items: center;
  padding-left: 10px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
    font-size: 21px;
  }

  @media screen and (max-width: 500px) {
  }
`;
const SigninDiv = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    order: ${({ order }) => order || 0};
  }
`;
const ForgotBtn = styled.div`
  width: 34%;
  min-width: 80px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #367ee9;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }

  @media screen and (max-width: 500px) {
    width: 50%;
    height: 80%;
  }
`;
const ButtonDiv = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 500px) {
    order: ${({ order }) => order || 0};
  }
`;

const LoginButton = styled.div`
  width: 70%;
  height: calc(10px + 5vh);
  background-color: ${({ isActive }) =>
    isActive ? "rgba(99, 56, 255, 0.4)" : "#367EE9"};
  border-radius: 12px;
  font-size: 25px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-style: italic;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.1)"};
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const SimpleLogin = styled.div`
  width: 100%;
  height: 13%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
  @media screen and (max-width: 500px) {
    order: ${({ order }) => order || 0};
    flex-direction: column;
    height: 18%;
    gap: 20px;
  }
`;

const CircleSide = styled.div`
  width: 50px;
  aspect-ratio: 1 / 1;
  border: none;
  border-radius: 50%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px) {
    width: 40px;
  }
`;
const GoogleIcon = styled(FcGoogle)`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;
const HiddenKakaoLogin = styled(KakaoLogin)`
  display: none;
`;
const KakaoIcon = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${kakao});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;
// 전체 화면을 감싸는 컨테이너
const Screen = styled.div`
  background-color: #87cefa;
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬 */
  align-items: center; /* 가로 방향으로 중앙 정렬 */
  justify-content: center; /* 세로 방향으로 중앙 정렬 */
  width: 100vw; /* 전체 화면 너비 */
  height: 100vh; /* 전체 화면 높이 */
  overflow: hidden; /* 내용이 화면을 넘어가지 않도록 */
`;

// 상위 래퍼
const OverlapGroupWrapper = styled.div`
  background-color: #87cefa;
  height: 100%;
  width: 100%; /* 화면 너비에 맞게 조정 */
  display: flex;
  justify-content: center; /* 가로 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */

  @media screen and (max-width: 500px) {
    /* background-color: #ffffff; */
  }
`;

// 오버랩 그룹
const OverlapGroup = styled.div`
  height: 100%;
  width: 100%; /* 화면 너비에 맞게 조정 */
  max-width: 4000px; /* 최대 너비 설정 */
  display: flex;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
// 사각형
const Rectangle = styled.div`
  background-color: #ffffff;
  border-top-right-radius: 38px;
  border-bottom-right-radius: 38px;
  height: 100%;
  width: 60%;
  display: flex;
  /* left: calc(40%);  */
  flex-direction: column; /* 세로 방향으로 정렬 */
  align-items: center; /* 가로 방향으로 중앙 정렬 */
  justify-content: center; /* 세로 방향으로 중앙 정렬 */

  @media screen and (max-width: 500px) {
    order: ${({ order }) => order || 0};
    width: 100%;
    border-radius: 38px 38px 0 0;
  }
`;
const LoginTitle = styled.div`
  width: 100%;
  height: 10%;
  font-size: 40px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  @media screen and (max-width: 500px) {
    order: ${({ order }) => order || 0};
    justify-content: center;
    align-items: center;
  }
`;
const LoginWrap = styled.div`
  width: 70%;
  min-width: 230px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SimpleLoginBtn = styled.div`
  width: 300px;
  height: 70px;
  border: 1px solid gray;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: scale(0.9);
    box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.4);
  }

  @media screen and (max-width: 500px) {
  }
`;
const SimpleLoginBtnText = styled.div`
  width: 65%;
  height: 100%;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px) {
  }
`;
const TextOr = styled.div`
  width: 100%;
  height: 10%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-style: italic;
  color: gray;

  @media screen and (max-width: 500px) {
    order: ${({ order }) => order || 0};
  }
`;
const SignUpText = styled.div`
  width: 55%;
  height: 100%;
  font-size: 25px;
  color: gray;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media screen and (max-width: 500px) {
    font-size: 16px;
    justify-content: center;
  }
`;
const LogoImgDiv = styled.div`
  width: 50%;
  min-width: 140px;
  height: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media screen and (max-width: 500px) {
    order: ${({ order }) => order || 0}; /* 기본값 0 */
  }
`;
const LogoImg = styled.div`
  width: 250px;
  height: 100%;
  background-image: url(${logoImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
// 모든 요소를 포함하는 App 컴포넌트
const LoginPage = () => {
  // 키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPwd, setIsPwd] = useState(false);
  // 패스워드 입력
  const [inputpwd, setInputPwd] = useState("");
  // 에러 메세지
  const [idMessage, setIdMessage] = useState("");
  // 모달 내용 변경
  const [modalContent, setModalContent] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  // 모달 헤더
  const [modalHeader, setModalheader] = useState("");
  // 모달 이미지
  const [modalImg, setModalImg] = useState();
  // 모달 변경
  const [isModalImg, setIsModalImg] = useState(false);
  // useContext로 email관리하기
  const { setEmail, setKakaoImgUrl } = useContext(UserEmailContext);
  const closeModal = () => {
    setModalOpen(false);
  };
  const navigate = useNavigate();
  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIdMessage("이메일 형식이 올바르지 않습니다.");
      setIsId(false);
    } else {
      setIdMessage("올바른 형식 입니다.");
      setIsId(true);
    }
  };
  const onChangePwd = (e) => {
    setInputPwd(e.target.value);
    setIsPwd(true);
  };

  const loginBtnHandler = () => {
    if (isId && isPwd) {
      setEmail(inputEmail);
      loginAxios(inputEmail, inputpwd);
    }
  };
  const loginAxios = async (email, pwd) => {
    try {
      const response = await LoginAxios.login(email, pwd);
      if (response.data.grantType === "bearer") {
        console.log("accessToken : ", response.data.accessToken);
        console.log("refreshToken : ", response.data.refreshToken);
        Common.setAccessToken(response.data.accessToken);
        Common.setRefreshToken(response.data.refreshToken);
        setEmail(email);

        navigate(`/mainpage`);
      } else {
        setModalOpen(true);
        setIsModalImg(false);
        setModalheader("로그인 에러");
        setModalContent("암호화에 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
      setModalOpen(true);
      setModalheader("로그인 에러");
      setIsModalImg(false);
      setModalContent("로그인에 실패했습니다.");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isId && isPwd) {
      loginBtnHandler();
    }
  };
  //카카오 간편 로그인 이벤트 함수
  const kakaoLoginOnClick = (onClick) => {
    return () => {
      if (onClick) onClick();
    };
  };
  const codeModalOkBtnHandler = () => {
    closeModal();
  };
  //모달 함수
  const modalClickHandler = () => {
    setModalOpen(true);
    setIsModalImg(true);
    setModalImg(GoogleAndNaverNotLogin);
    setModalContent("서비스를 지원하지 않습니다. 카카오 서비스만 지원합니다.");
  };
  // 카카오 로그인 관련
  const kakaoKey = "9882d2e72736aeb020df6d7f6057a331"; // 카카오 개발자 사이트에서 복사한 JavaScript 키

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }
  }, [kakaoKey]);

  const responseKakao = (response) => {
    console.log(response);
    KaKaoData(response);
  };
  const KaKaoData = async (response) => {
    try {
      const propsToPass = {
        kakaoProp: true,
        kakaoEmail: response.profile.kakao_account.email,
        kakaopwd: response.profile.id,
        kakaoName: response.profile.properties.nickname,
        kakaoUrl: response.profile.properties.profile_image,
      };
      console.log("kakaoEmail:" + propsToPass.kakaoEmail);
      console.log("kakaopwd:" + propsToPass.kakaopwd);
      console.log("kakaoName:" + propsToPass.kakaoName);
      console.log("kakaoImgUrl:" + propsToPass.kakaoUrl);
      //이메일 존재하는지 확인하는 부분
      const emailExist = await LoginAxios.emailIsExist(propsToPass.kakaoEmail);
      console.log("emailExist:" + emailExist.data);

      //이메일 존재하면 화면이동
      if (emailExist.data) {
        //엑세스 토큰 작업
        const res = await LoginAxios.login(
          propsToPass.kakaoEmail,
          propsToPass.kakaopwd
        );
        console.log("accessToken : ", res.data.accessToken);
        console.log("refreshToken : ", res.data.refreshToken);
        Common.setAccessToken(res.data.accessToken);
        Common.setRefreshToken(res.data.refreshToken);
        setEmail(propsToPass.kakaoEmail);
        setKakaoImgUrl(propsToPass.kakaoUrl);
        //이메일로 커플이름 찾는 비동기 함수
        const coupleNameSearchAxios = async (email) => {
          console.log(email);
          navigate(`/mainpage`);
        };
        coupleNameSearchAxios(propsToPass.kakaoEmail);
      }
      //아니면 여기로 이동
      else {
        console.log("else문까지는 와요!");
        console.log("Navigating to sign-up page with props:", propsToPass);
        navigate(`/signup`, { state: propsToPass });
      }
    } catch (error) {
      console.error("Error during Kakao login:", error);
    }
  };
  const onFail = (error) => {
    console.error(error);
  };
  return (
    <Screen>
      {isModalImg ? (
        <Modal
          open={modalOpen}
          header={modalHeader}
          type={true}
          confirm={codeModalOkBtnHandler}
          img={modalImg}
        >
          {modalContent}
        </Modal>
      ) : (
        <LoginModal
          open={modalOpen}
          header={modalHeader}
          type={true}
          confirm={codeModalOkBtnHandler}
        >
          {modalContent}
        </LoginModal>
      )}
      <OverlapGroupWrapper>
        <OverlapGroup>
          <Rectangle order={2}>
            <LoginWrap>
              <LoginTitle order={1}>Log in</LoginTitle>
              <SimpleLogin order={5}>
                <>
                  <SimpleLoginBtn onClick={() => modalClickHandler()}>
                    <CircleSide>
                      <GoogleIcon />
                    </CircleSide>
                    <SimpleLoginBtnText>sign up with Google</SimpleLoginBtnText>
                  </SimpleLoginBtn>
                  <SimpleLoginBtn>
                    <CircleSide>
                      <HiddenKakaoLogin
                        token={kakaoKey}
                        onSuccess={responseKakao}
                        onFail={onFail}
                        throughTalk={false} // 추가된 옵션: 브라우저를 통해 로그인을 시도
                        getProfile={true}
                        render={({ onClick }) => (
                          <KakaoIcon onClick={kakaoLoginOnClick(onClick)} />
                        )}
                      />
                    </CircleSide>
                    <SimpleLoginBtnText>sign up with Kakao </SimpleLoginBtnText>
                  </SimpleLoginBtn>
                </>
              </SimpleLogin>
              <TextOr order={4}>- OR -</TextOr>
              <LoginDiv order={2}>
                <>
                  <InputContainer>
                    <InputDiv
                      type="text"
                      placeholder="Email Address"
                      value={inputEmail}
                      onChange={onChangeEmail}
                    />
                  </InputContainer>
                  {inputEmail && (
                    <Message isCorrect={isId}>{idMessage}</Message>
                  )}
                </>
                <InputContainer>
                  <InputDiv
                    type="password"
                    placeholder="Password"
                    value={inputpwd}
                    onChange={onChangePwd}
                    onKeyDown={handleKeyDown} //패스워드를 입력하고 엔터를 눌렀을 경우
                  />
                </InputContainer>
              </LoginDiv>
              <FindDiv order={3}>
                {/* <ForgotBtn /> */}
                <ForgotBtn
                  onClick={() => {
                    navigate("/findbyemail");
                  }}
                >
                  Forgot ID
                </ForgotBtn>
                <ForgotBtn
                  onClick={() => {
                    navigate("/findbypwd");
                  }}
                >
                  Password?
                </ForgotBtn>
              </FindDiv>
              <ButtonDiv order={6}>
                <LoginButton isActive={isId && isPwd} onClick={loginBtnHandler}>
                  Log in
                </LoginButton>
              </ButtonDiv>
              <SigninDiv order={7}>
                <SignUpText>Are you first here?</SignUpText>
                <Signin
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </Signin>
              </SigninDiv>
            </LoginWrap>
          </Rectangle>
          <LogoImgDiv order={1}>
            <LogoImg />
          </LogoImgDiv>
        </OverlapGroup>
      </OverlapGroupWrapper>
    </Screen>
  );
};

export default LoginPage;
