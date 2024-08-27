import styled, { keyframes } from "styled-components";
import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginAxios from "../../axiosapi/LoginAxios";
import emailjs from "emailjs-com";
import Modal from "../../common/utils/Modal";
import Common from "../../common/Common";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";
import logoImg from "../../img/background/CreditOnlyLogo.png";

const LogoImgDiv = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  @media screen and (max-width: 1200px) {
    min-width: 200px;
  }
  @media screen and (max-width: 700px) {
    display: none;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    width: 50%;
    height: 20%;
  }
`;

const LogoImg = styled.div`
  width: 250px;
  height: 190px;
  background-image: url(${logoImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 23%;
  display: flex;
  justify-content: first baseline;
  align-items: center;
  font-size: 40px;
  font-weight: 900;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #000;
  @media screen and (max-width: 1200px) {
    font-size: 35px;
  }
`;
const InputDiv = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const InputDetailDiv = styled.div`
  width: 100%;
  height: 27%;
  gap: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > .InputClass {
    width: 100%;
    height: 70%;
    padding-left: 20px;
    border: none;
    border-bottom: 0.21vh solid gray;
    background-color: transparent;
    font-size: 23px;
    font-weight: bolder;
    outline: none;
    @media screen and (max-width: 1200px) {
      font-size: 21px;
    }
    @media screen and (max-width: 500px) {
      font-size: 18px;
    }
    &::placeholder {
      font-size: clamp(20px, 2.5vw, 27px);
      color: #808080;
      font-weight: normal;
      font-style: italic;
      opacity: 0.5;
      @media screen and (max-width: 1200px) {
        font-size: 22px;
      }
      @media screen and (max-width: 500px) {
        font-size: 16px;
      }
    }
  }
  & > .InputEmail,
  .InputCode {
    width: 100%;
    height: 70%;
    padding-left: 20px;
    border: none;
    border-bottom: 0.21vh solid gray;
    background-color: transparent;
    font-size: 23px;
    font-weight: bolder;
    outline: none;
    @media screen and (max-width: 1200px) {
      font-size: 21px;
    }
    @media screen and (max-width: 500px) {
      font-size: 18px;
    }
    &::placeholder {
      font-size: clamp(15px, 2.5vw, 27px);
      color: gray;
      font-weight: normal;
      font-style: italic;
      opacity: 0.5;
      @media screen and (max-width: 1200px) {
        font-size: 22px;
      }
      @media screen and (max-width: 500px) {
        font-size: 16px;
      }
    }
  }
`;
const Empty = styled.div`
  width: 2%;
  height: 2vh;
`;
const EmailAthouized = styled.div`
  width: 15%;
  min-width: 50px;
  max-width: 100px;
  height: 65%;
  border-radius: 10px;
  border: none;
  background-color: ${({ isActive }) => (isActive ? "#367EE9" : "#fff")};
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  color: ${({ isActive }) => (isActive ? "#fff" : "gray")};
  font-weight: 600;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#fff" : "#367EE9")};
    color: ${({ isActive }) => (isActive ? "gray" : "#fff")};
  }
  @media screen and (max-width: 1200px) {
    font-size: 15px;
  }
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;
const RegisterationInput1 = styled.input`
  width: 45%;
  height: 70%;
  padding-left: 20px;
  border: none;
  border-bottom: 0.21vh solid gray;
  background-color: transparent;
  font-size: 23px;
  font-weight: bolder;
  outline: none;
  @media screen and (max-width: 1200px) {
    font-size: 21px;
  }
  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
  &::placeholder {
    font-size: clamp(20px, 2.5vw, 27px);
    color: gray;
    font-weight: normal;
    font-style: italic;
    opacity: 0.5;
    @media screen and (max-width: 1200px) {
      font-size: 22px;
    }
    @media screen and (max-width: 500px) {
      font-size: 16px;
    }
  }
`;
const Text = styled.div`
  width: 3%;
  height: 70%;
  font-weight: bolder;
  font-size: 15px;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RegisterationInput2 = styled.input`
  width: 52%;
  height: 70%;
  padding-left: 20px;
  border: none;
  border-bottom: 0.21vh solid gray;
  background-color: transparent;
  font-size: 23px;
  font-weight: bolder;
  outline: none;
  @media screen and (max-width: 1200px) {
    font-size: 21px;
  }
  @media screen and (max-width: 500px) {
    font-size: 18px;
  }
  &::placeholder {
    font-size: clamp(20px, 2.5vw, 27px);
    color: gray;
    font-weight: normal;
    font-style: italic;
    opacity: 0.5;
    @media screen and (max-width: 1200px) {
      font-size: 22px;
    }
    @media screen and (max-width: 500px) {
      font-size: 16px;
    }
  }
`;
const TermsText = styled.div`
  font-size: clamp(13px, 2.5vw, 30px);
  font-weight: 600;
  color: gray;
  display: flex;
  align-items: center;
  font-style: italic;
  opacity: 0.7;
`;
const ButtonDiv = styled.div`
  width: 100%;
  height: 17%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SignupButton = styled.div`
  width: 70%;
  height: calc(10px + 5vh);
  background-color: ${({ isActive }) =>
    isActive ? "rgba(99, 56, 255, 0.4)" : "#367EE9"};
  border-radius: 12px;
  font-size: clamp(22px, 2.5vw, 30px);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-style: italic;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 600;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.1)"};
  }
  @media screen and (max-width: 1200px) {
    font-size: 23px;
  }
  @media screen and (max-width: 500px) {
    font-size: 20px;
  }
`;
const InputDetailDiv2 = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;

  & > .lookBtn {
    width: 40%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > .lookBtn > div {
    width: 80%;
    height: 90%;
  }
`;
const Message = styled.div`
  width: 100%;
  font-size: 15px;
  display: flex;
  justify-content: center;
  color: ${({ isCorrect }) => (isCorrect ? "green" : "red")};
  @media screen and (max-width: 1200px) {
    font-size: 13px;
  }
  @media screen and (max-width: 500px) {
    font-size: 12px;
  }
`;
const TermsForm = styled.div`
  width: 70%;
  height: 80%;
  border-radius: 10px;
  padding: 30px;
  position: absolute;
  overflow-y: auto;
  background-color: aliceblue;
  @media screen and (max-width: 500px) {
    padding: 20px;
  }
`;
// focus-in-expand 애니메이션 정의
const focusInExpand = keyframes`
0% {
  transform: scale(0.5);
  opacity: 0;
}
100% {
  transform: scale(1);
  opacity: 1;
}
`;
const TermImgDiv = styled.div`
  width: 60%;
  height: 100%;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  min-width: 400px;
  justify-content: center;
  align-items: center;
  position: absolute;
  flex-direction: column;
  animation: ${focusInExpand} 0.5s ease-in-out; /* 애니메이션 적용 */
`;

const TermsTitle = styled.div`
  font-size: 24px; /* Adjust size as needed */
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const TermsContent = styled.div`
  font-size: 15px; /* Adjust size as needed */
  font-weight: 500;
  line-height: 1.4;
  color: #333; /* Darker text color */
  overflow-y: auto;
  width: 100%;
  height: 20%;
  max-height: 200px;
  /* background-color: aqua; */
  /* border: 1px solid black; */
`;

const TermsActions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > .termAgree {
    height: auto;
    display: flex;
    height: auto;
  }
`;

const TermsCheckbox = styled.input`
  margin-right: 10px;
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #4a90e2;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:checked {
    background-color: #4a90e2;
    position: relative;
  }

  &:checked::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 14px;
  }

  &:hover {
    border-color: #2a70c2;
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.3);
  }
`;

const TermsLabel = styled.label`
  display: block;
  width: 150px;
  font-size: 15px; /* Adjust size as needed */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TermsButton = styled.button`
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 17px; /* Adjust size as needed */
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "#8e3636" : "rgba(0, 0, 0, 0.2)"};
  }
`;

const TermsScrollableContent = styled.div`
  /* max-height: calc(100% - 100px); */
  overflow-y: auto;
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
    flex-direction: column;
  }
`;

// 오버랩 그룹
const OverlapGroup = styled.div`
  height: 100%;
  width: 100%; /* 화면 너비에 맞게 조정 */
  max-width: 4000px; /* 최대 너비 설정 */
  position: relative;
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

// 사각형
const Rectangle = styled.div`
  background-color: #ffffff;
  border-top-left-radius: 38px;
  border-bottom-left-radius: 38px;
  height: 100%;
  width: 72%;
  display: flex;
  left: calc(40%); /* 중앙 배치: 좌우 중앙 */
  flex-direction: column; /* 세로 방향으로 정렬 */
  align-items: center; /* 가로 방향으로 중앙 정렬 */
  justify-content: center; /* 세로 방향으로 중앙 정렬 */
  @media screen and (max-width: 1200px) {
    min-width: 500px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    min-width: 300px;
    border-radius: 38px 38px 0 0;
  }
`;
const LoginWrapping = styled.div`
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 500px) {
    width: 75%;
  }
`;
const SubTitle = styled.div`
  width: 100%;
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  justify-content: first baseline;
  align-items: center;
`;
// 모든 요소를 포함하는 App 컴포넌트
const SignUp = () => {
  // 키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const [inputPwdCheck, setInputPwdCheck] = useState("");
  // 유효성 확인
  const [isId, setIsId] = useState("");
  const [isPwd, setIsPwd] = useState("");
  const [isPwdCheack, setIsPwdCheck] = useState("");
  const [isCode, setIsCode] = useState(false);
  //이메일 보낸 후 상태 저장.
  const [isEmailSent, setIsEmailSent] = useState(false);
  // 비교할 인증코드
  const [certificationCode, setCertificationCode] = useState("");
  //인증코드 저장
  const [inputCertificationCode, setInputCertificationCode] = useState(null);
  //인증 확인 상태
  const [isEmail, setIsEmail] = useState(false);
  // 에러 메세지
  const [idMessage, setIdMessage] = useState("");
  const [pwdMessage, setPwMessage] = useState("");
  //비밀번호 확인 메세지
  const [pwdCheckMessage, setPwdCheckMessage] = useState("");
  //주민등록번호 표현 상태 변수
  const [rrnFirstPart, setRrnFirstPart] = useState("");
  const [rrnSecondPart, setRrnSecondPart] = useState("");
  // 유효한 주민등록번호인지 확인
  const [isRrnValid, setIsRrnValid] = useState(false);
  //주민등록번호 메세지
  const [isRrnValidMessage, setIsRrnValidMessage] = useState("");
  // 이름 입력
  const [inputName, setInputName] = useState("");
  // 약관 보기 버튼 클릭 상태 변수
  const [isTermClickBtn, setIsTermClickBtn] = useState(false);
  // 약관 동의 체크 버튼
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isTermAccepted, setIsTermAccepted] = useState({
    term1: false,
    term2: false,
    term3: false,
    term4: false,
  });
  // 모달 내용 변경
  const [modalContent, setModalContent] = useState("");
  // 모달 해더
  const [headerContents, SetHeaderContents] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  //ContextApi로 email관리하기
  const { setEmail, setKakaoImgUrl } = useContext(UserEmailContext);

  const navigate = useNavigate();
  //카카오 로그인 props
  const location = useLocation();
  const { kakaoProp, kakaoEmail, kakaopwd, kakaoName, kakaoUrl } =
    location.state || {};
  const closeModal = () => {
    setModalOpen(false);
  };
  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setInputEmail(e.target.value);
    if (!emailRegex.test(e.target.value)) {
      setIdMessage("이메일 형식이 올바르지 않습니다.");
      setIsId(false);
    } else {
      emailIsExist(e.target.value);
    }
  };
  // // 이메일 중복 체크하는 함수
  const emailIsExist = async (input) => {
    const response = await LoginAxios.emailIsExist(input);
    if (response.data) {
      setIdMessage("중복된 이메일입니다.");
      setIsId(false);
    } else {
      setIdMessage("올바른 형식 입니다.");
      setIsId(true);
    }
  };

  // 비밀번호 8자리 이상.
  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPwd(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPwMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPwd(false);
    } else {
      setPwMessage("안전한 비밀번호입니다.)");
      setIsPwd(true);
    }
  };
  // 비밀번호 일치 확인
  const onCheckPw = (e) => {
    const passwordInput = e.target.value;
    setInputPwdCheck(passwordInput);
    if (passwordInput !== inputPwd) {
      setPwdCheckMessage("일치하지 않습니다.");
      setIsPwdCheck(false);
    } else {
      setPwdCheckMessage("일치합니다.");
      setIsPwdCheck(true);
    }
  };
  //주민등록번호 앞 6자리 숫자 유효성검사
  const handleRrnFirstPartChange = (e) => {
    const inputValue = e.target.value;

    if (/^[0-9]*$/.test(inputValue) && inputValue.length <= 6) {
      setRrnFirstPart(inputValue);
      vaildRrn(inputValue, rrnSecondPart);
    }
  };
  //주민등록번호 뒤 1자리 숫자 유효성검사 후 6자리 입력
  const handleRrnSecondPartChange = (e) => {
    const inputValue = e.target.value;

    if (/^[1-4]?[0-9]*$/.test(inputValue) && inputValue.length <= 7) {
      setRrnSecondPart(inputValue);
      vaildRrn(rrnFirstPart, inputValue);
    }
  };
  // 유효성 검사 로직 추가
  const vaildRrn = (rrnFirstPartValue, rrnSecondPartValue) => {
    if (rrnFirstPartValue.length === 6 && rrnSecondPartValue.length === 7) {
      setIsRrnValid(true);
      setIsRrnValidMessage("유효합니다.");
    } else {
      setIsRrnValid(false);
      setIsRrnValidMessage("값이 유효하지 않습니다.");
    }

    if (rrnSecondPartValue === "" && rrnFirstPartValue === "") {
      setIsRrnValidMessage("");
    }
  };
  // 버튼 클릭 상태 업데이트
  const handleTermLookBtnClick = () => {
    setIsTermClickBtn(true);
  };

  const handleAllCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsAllChecked(isChecked);
    setIsTermAccepted({
      term1: isChecked,
      term2: isChecked,
      term3: isChecked,
      term4: isChecked,
    });
  };

  // 체크박스 상태 업데이트
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setIsTermAccepted((prev) => {
      const updatedTerms = {
        ...prev,
        [name]: checked,
      };
      const allTermsChecked = Object.values(updatedTerms).every(Boolean);
      setIsAllChecked(allTermsChecked);
      return updatedTerms;
    });
  };

  // 동의 버튼 클릭 핸들러
  const handleAgreeButtonClick = () => {
    if (isTermAccepted) {
      setIsTermClickBtn(false);
    }
  };
  // 이름 변수에 저장
  const handleInputName = (e) => {
    setInputName(e.target.value);
  };

  //주민등록번호 따로 받은 자리 합치는 함수
  const combineRRN = (firstPart, secondPart) => {
    // 계산 수행
    return firstPart + secondPart;
  };
  //회원가입 비동기 함수
  const signUpAxios = async (
    inputEmail,
    inputPwd,
    inputName,
    rrnFirstPart,
    rrnSecondPart
  ) => {
    const combinedRnn = combineRRN(rrnFirstPart, rrnSecondPart);
    try {
      const response = await LoginAxios.memberSignUp(
        inputEmail,
        inputPwd,
        inputName,
        combinedRnn
      );
      if (
        response.data === "Success" &&
        isEmail &&
        isCode &&
        isPwd &&
        isPwdCheack &&
        rrnFirstPart &&
        rrnSecondPart &&
        inputName &&
        isAllChecked
      ) {
        navigate("/login");
      } else if (
        response.data === "Success" &&
        rrnFirstPart &&
        rrnSecondPart &&
        isAllChecked
      ) {
        kakaoLogin(kakaoEmail, kakaopwd);
        setKakaoImgUrl(kakaoUrl);
        navigate("/mainpage");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //카카오로 온 경로
  const kakaoBtnOnClickHandler = () => {
    if (isRrnValid && isAllChecked) {
      signUpAxios(kakaoEmail, kakaopwd, kakaoName, rrnFirstPart, rrnSecondPart);
    }
  };
  //카카오 바로 로그인
  const kakaoLogin = async (kakoEmailvalue, kakaoPwdValue) => {
    try {
      const response = await LoginAxios.login(kakoEmailvalue, kakaoPwdValue);
      if (response.data.grantType === "bearer") {
        console.log("accessToken : ", response.data.accessToken);
        console.log("refreshToken : ", response.data.refreshToken);
        Common.setAccessToken(response.data.accessToken);
        Common.setRefreshToken(response.data.refreshToken);
        setEmail(kakoEmailvalue);
      } else {
        setModalOpen(true);
        SetHeaderContents("로그인 에러");
        setModalContent("암호화에 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
      setModalOpen(true);
      SetHeaderContents("로그인 에러");
      setModalContent("계정이 없습니다.");
    }
  };
  // 인증 코드 입력 처리 함수 수정
  const handleCertificationCodeInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 6) {
      setInputCertificationCode(value);
    }
  };
  // 회원가입 버튼을 클릭했을 경우 함수
  const signupBtnOnclickHandler = () => {
    if (
      isEmail &&
      isCode &&
      isPwd &&
      isPwdCheack &&
      isRrnValid &&
      inputName &&
      isAllChecked
    ) {
      signUpAxios(inputEmail, inputPwd, inputName, rrnFirstPart, rrnSecondPart);
    }
  };

  // 이메일 인증 버튼 handler
  const emailCertificationBtnHandler = () => {
    if (isId) {
      sendVerificationEmail(inputEmail);
    }
  };
  // 이메일 전송시 파라미터 넘기는 함수
  const sendVerificationEmail = async (toEmail) => {
    const generatedCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    setCertificationCode(generatedCode);
    // 이메일 보내기
    // 여기서 정의해야 하는 것은 위에서 만든 메일 템플릿에 지정한 변수({{ }})에 대한 값을 담아줘야 한다.
    const templateParams = {
      toEmail: toEmail, // 수신 이메일
      toName: "고객님",
      certificationCode: generatedCode,
    };
    try {
      const response = await emailjs.send(
        "service_lwk6ny9", // 서비스 ID
        "service_lwk6ny9", // 템플릿 ID
        templateParams,
        "VKzT47hXDU3sC3R13" // public-key
      );
      console.log("이메일이 성공적으로 보내졌습니다:", response);
      setIdMessage("이메일이 성공적으로 보내졌습니다!");
      setIsId(true);
      setIsEmailSent(true);
      // 이메일 전송 성공 처리 로직 추가
    } catch (error) {
      console.error("이메일 보내기 실패:", error);
      setIdMessage("이메일 보내기 실패했습니다!");
      setIsId(false);
      setIsEmailSent(false);
      // 이메일 전송 실패 처리 로직 추가
    }
  };
  // 코드 확인 버튼 이벤트
  const emailCertificationCodeOnClick = () => {
    if (inputCertificationCode === certificationCode) {
      SetHeaderContents("인증코드확인");
      setModalOpen(true);
      setModalContent("확인되었습니다.");
      setIsCode(true);
    } else {
      SetHeaderContents("인증코드확인");
      setModalOpen(true);
      setModalContent("인증코드가 다릅니다.");
      setIsCode(false);
    }
  };
  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeModal();
    setIsEmail(true);
  };
  return (
    <Screen>
      <OverlapGroupWrapper>
        <LogoImgDiv>
          <LogoImg />
        </LogoImgDiv>
        <OverlapGroup>
          <Rectangle>
            <LoginWrapping>
              <TitleDiv>{kakaoProp ? "Write More" : "Create Account"}</TitleDiv>
              <Modal
                open={modalOpen}
                header={headerContents}
                type={true}
                confirm={codeModalOkBtnHandler}
              >
                {modalContent}
              </Modal>
              <InputDiv>
                {!kakaoProp && (
                  <>
                    <InputDetailDiv>
                      <input
                        className="InputEmail"
                        value={inputEmail}
                        onChange={onChangeEmail}
                        placeholder="Email Address"
                      />
                      <Empty></Empty>
                      <EmailAthouized
                        isActive={isId}
                        onClick={emailCertificationBtnHandler}
                      >
                        Send
                      </EmailAthouized>
                    </InputDetailDiv>
                    {inputEmail && (
                      <Message isCorrect={isId}>{idMessage}</Message>
                    )}
                  </>
                )}
                {isEmailSent && (
                  <InputDetailDiv>
                    <input
                      className="InputCode"
                      maxLength={6}
                      // value={saveCertificationCode}
                      placeholder="Email Code"
                      onChange={handleCertificationCodeInput}
                    />
                    <Empty></Empty>
                    <EmailAthouized
                      isActive={isEmailSent}
                      onClick={emailCertificationCodeOnClick}
                    >
                      check
                    </EmailAthouized>
                  </InputDetailDiv>
                )}
                {!kakaoProp && (
                  <>
                    <InputDetailDiv>
                      <input
                        type="password"
                        placeholder="Password"
                        className="InputClass"
                        value={inputPwd}
                        onChange={onChangePw}
                      />
                    </InputDetailDiv>
                    {inputPwd && (
                      <Message isCorrect={isPwd}>{pwdMessage}</Message>
                    )}
                  </>
                )}
                {!kakaoProp && (
                  <>
                    <InputDetailDiv>
                      <input
                        type="password"
                        placeholder="Password Check"
                        className="InputClass"
                        value={inputPwdCheck}
                        onChange={onCheckPw}
                      />
                    </InputDetailDiv>
                    {inputPwdCheck && (
                      <Message isCorrect={isPwdCheack}>
                        {pwdCheckMessage}
                      </Message>
                    )}
                  </>
                )}
                {!kakaoProp && (
                  <InputDetailDiv>
                    <input
                      className="InputClass"
                      placeholder="Full Name"
                      value={inputName}
                      onChange={handleInputName}
                    />
                  </InputDetailDiv>
                )}
                <InputDetailDiv>
                  <RegisterationInput1
                    pattern="[0~9]+"
                    value={rrnFirstPart}
                    placeholder="Social"
                    onChange={handleRrnFirstPartChange}
                  />
                  <Text> - </Text>
                  <RegisterationInput2
                    pattern="[0~9]+"
                    type="password"
                    value={rrnSecondPart}
                    placeholder="Security Number"
                    onChange={handleRrnSecondPartChange}
                  />
                </InputDetailDiv>
                <Message isCorrect={isRrnValid}>{isRrnValidMessage}</Message>
                <InputDetailDiv2>
                  <TermsText>View Terms</TermsText>
                  <Empty />
                  <div className="lookBtn">
                    <EmailAthouized
                      isActive={true}
                      onClick={handleTermLookBtnClick}
                    >
                      Check
                    </EmailAthouized>
                  </div>
                </InputDetailDiv2>
                <TermImgDiv isOpen={isTermClickBtn}>
                  <TermsForm>
                    <TermsTitle>계정 사용에 관한 약관</TermsTitle>
                    <TermsScrollableContent>
                      <SubTitle>신용만 프로젝트 개인정보 처리 방침서</SubTitle>
                      <TermsContent>
                        1. 개인정보 처리 방침 목차 개인정보의 수집 항목 및 수집
                        방법 개인정보의 이용 목적 개인정보의 보관 기간
                        개인정보의 제3자 제공 정보주체의 권리 및 행사 방법
                        개인정보 보호를 위한 안전성 확보 조치 개인정보
                        보호책임자 개인정보 처리방침의 변경 1. 개인정보의 수집
                        항목 및 수집 방법 회사는 개인정보 보호법 제15조 및
                        제22조에 근거하여 다음과 같은 개인정보를 수집할 수
                        있습니다. 개인정보는 정보통신망 이용촉진 및 정보보호
                        등에 관한 법률 제50조에 따라 주로 웹 크롤링과 머신러닝을
                        통해 자동으로 수집됩니다. 수집 항목: 이름, 이메일 주소,
                        전화번호, 신용정보 등 수집 방법: 웹사이트 및 모바일
                        애플리케이션을 통한 자동 수집 1. 개인정보의 이용 목적
                        회사는 개인정보 보호법 제15조 제1항에 따라 수집한
                        개인정보를 다음의 목적을 위해 이용합니다. 서비스 제공 및
                        유지 고객 지원 및 문의 처리 서비스 개선 및 개인 맞춤
                        서비스 제공 마케팅 및 홍보 (정보통신망법 제50조 제1항에
                        따른 동의 획득 시) 1. 개인정보의 보관 기간 회사는
                        개인정보 보호법 제21조에 따라 법령에 명시된 보유기간
                        또는 정보주체로부터 동의받은 보유기간 동안 개인정보를
                        처리 및 보유합니다. 회원 탈퇴 시까지 보관 상법,
                        전자상거래 등에서의 소비자보호에 관한 법률 등 관련법령의
                        규정에 따른 보존 기간 1. 개인정보의 제3자 제공 회사는
                        개인정보 보호법 제17조 및 제18조에 따라 원칙적으로
                        정보주체의 동의 없이 개인정보를 제3자에게 제공하지
                        않습니다. 다만, 다음의 경우에는 예외로 합니다.
                        정보주체의 동의를 받은 경우 법률에 특별한 규정이 있거나
                        법령상 의무를 준수하기 위하여 불가피한 경우 공공기관이
                        법령 등에서 정하는 소관 업무의 수행을 위하여 불가피한
                        경우 1. 정보주체의 권리 및 행사 방법 정보주체는 개인정보
                        보호법 제35조부터 제38조까지의 규정에 따라 개인정보에
                        대한 다음의 권리를 행사할 수 있습니다. 개인정보 열람
                        요구 오류 등이 있을 경우 정정 요구 삭제 요구 처리정지
                        요구 1. 개인정보 보호를 위한 안전성 확보 조치 회사는
                        개인정보 보호법 제29조에 따라 다음과 같은 안전성 확보
                        조치를 취하고 있습니다. 개인정보의 암호화 해킹 등에
                        대비한 기술적 대책 개인정보에 대한 접근 제한 개인정보
                        취급 직원의 최소화 및 교육 1. 개인정보 보호책임자(추후
                        수정 필요) 회사는 개인정보 보호법 제31조 제1항에 따라
                        개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
                        처리와 관련한 정보주체의 불만처리 및 피해구제 등을
                        위하여 아래와 같이 개인정보 보호책임자를 지정하고
                        있습니다. 개인정보 보호책임자: 김아무개 연락처: [연락처
                        정보 입력] 1. 개인정보 처리방침의 변경 이 개인정보
                        처리방침은 2024년 8월 1일부터(추후 수정 필요)
                        적용됩니다. 법령 및 방침에 따른 변경내용의 추가, 삭제 및
                        정정이 있는 경우에는 변경사항의 시행 7일 전부터
                        공지사항을 통하여 고지할 것입니다. 이 개인정보
                        처리방침은 개인정보 보호법, 정보통신망 이용촉진 및
                        정보보호 등에 관한 법률 등 관련 법령을 준수하며, 법령의
                        개정이나 서비스 변경 등에 따라 내용의 추가, 삭제 및
                        수정이 있을 시에는 시행하기 최소 7일 전에 홈페이지를
                        통해 변경사유 및 내용 등을 공지하겠습니다.
                      </TermsContent>
                      <TermsActions>
                        <div className="termAgree">
                          <TermsCheckbox
                            type="checkbox"
                            name="term1"
                            checked={isTermAccepted.term1}
                            onChange={handleCheckboxChange}
                          />
                          <TermsLabel>약관에 동의합니다.</TermsLabel>
                        </div>
                      </TermsActions>
                      <SubTitle>
                        신용만 프로젝트 데이터 보호 및 보안 정책 정책
                      </SubTitle>
                      <TermsContent>
                        1. 목적 2. 데이터 수집 3. 데이터 이용 4. 데이터 저장 및
                        보호 5. 데이터 접근 관리 6. 데이터 제3자 제공 7. 데이터
                        보안 사고 대응 8. 정보주체의 권리 9. 정책의 변경 10.
                        목적 본 정책은 「개인정보 보호법」 및 「신용정보의 이용
                        및 보호에 관한 법률」에 따라 회사명의 데이터 보호 및
                        보안 조치를 규정합니다. 11. 데이터 수집 회사는
                        「개인정보 보호법」 제15조 및 제22조에 근거하여 다음과
                        같은 방법으로 데이터를 수집합니다: 웹 크롤링 및
                        머신러닝을 통한 자동 수집 사용자의 자발적 제공 1. 데이터
                        이용 수집된 데이터는 「개인정보 보호법」 제15조 제1항에
                        따라 다음 목적으로 이용됩니다: 서비스 제공 및 개선
                        사용자 지원 통계 분석 및 연구 법적 의무 이행 1. 데이터
                        저장 및 보호 회사는 「개인정보 보호법」 제29조에 따라
                        다음과 같은 안전성 확보 조치를 취합니다: 데이터 암호화
                        보안 시스템 구축 및 운영 정기적인 보안 점검 1. 데이터
                        접근 관리 「개인정보 보호법」 제28조에 따라 다음과 같이
                        접근을 통제합니다: 최소 인원에게만 접근 권한 부여 접근
                        기록 보관 및 점검 1. 데이터 제3자 제공 「개인정보
                        보호법」 제17조 및 제18조에 따라 원칙적으로 제3자 제공을
                        금지하며, 다음의 경우에만 예외적으로 허용합니다:
                        정보주체의 동의가 있는 경우 법령에 따른 의무 이행을 위해
                        불가피한 경우 1. 데이터 보안 사고 대응 「개인정보
                        보호법」 제34조에 따라 다음과 같이 대응합니다: 즉시 대응
                        및 피해 최소화 개인정보보호위원회 또는
                        한국인터넷진흥원에 신고 정보주체에게 통지 1. 정보주체의
                        권리 「개인정보 보호법」 제35조부터 제38조에 따라
                        정보주체는 다음 권리를 행사할 수 있습니다: 개인정보 열람
                        요구 오류 등이 있을 경우 정정 요구 삭제 요구 처리정지
                        요구 1. 정책의 변경 본 정책의 변경 시 「개인정보
                        보호법」 제30조에 따라 변경 내용을 공지하고, 변경된
                        정책은 공지한 시점부터 효력이 발생합니다. 2. 개인정보
                        보호책임자 「개인정보 보호법」 제31조에 따라 다음과 같이
                        개인정보 보호책임자를 지정합니다: <br />
                        성명: 유승용 <br />
                        직책: 보호책임자 <br />
                        연락처: 98tmddyddl@gmail.com <br />
                        시행일: 2024년 8월 1일
                      </TermsContent>
                      <TermsActions>
                        <div className="termAgree">
                          <TermsCheckbox
                            type="checkbox"
                            name="term2"
                            checked={isTermAccepted.term2}
                            onChange={handleCheckboxChange}
                          />
                          <TermsLabel>약관에 동의합니다.</TermsLabel>
                        </div>
                      </TermsActions>
                      <SubTitle>신용만 프로젝트의 법적 고지 사항</SubTitle>
                      <TermsContent>
                        3. 법적 고지 사항 1. 일반 사항 2. 책임의 제한 3. 보증의
                        부인 4. 외부 링크에 대한 책임 5. 법적 고지 사항의 변경
                        6. 준거법 및 관할 7. 연락처 8. 일반 사항 본 법적 고지
                        사항은 회사명이 제공하는 모든 서비스 이용에 적용되며,
                        「전자상거래 등에서의 소비자보호에 관한 법률」 제13조 및
                        「약관의 규제에 관한 법률」 제3조에 따라 명시됩니다. 9.
                        책임의 제한 회사는 「정보통신망 이용촉진 및 정보보호
                        등에 관한 법률」 제44조의2에 따라 다음 각 호의 경우
                        책임을 지지 않습니다: 천재지변, 전쟁 등 불가항력으로
                        인한 서비스 제공 중단 사용자의 귀책사유로 인한 서비스
                        이용의 장애 제3자의 고의적인 서비스 방해로 인한 손해
                        기타 회사의 고의 또는 과실이 없는 사유로 인한 손해 1.
                        보증의 부인 회사는 「민법」 제580조 및 「전자상거래
                        등에서의 소비자보호에 관한 법률」 제17조에 따라 다음
                        사항을 명시합니다: 서비스는 '있는 그대로' 제공되며,
                        상품성, 특정 목적에의 적합성, 준법성에 대한 묵시적
                        보증을 포함한 모든 명시적 또는 묵시적 보증을 부인합니다.
                        회사는 서비스의 중단, 오류, 누락, 데이터 손실에 대해
                        보증하지 않습니다. 1. 외부 링크에 대한 책임 「정보통신망
                        이용촉진 및 정보보호 등에 관한 법률」 제44조에 따라,
                        회사는 서비스 내 제3자 웹사이트 링크의 내용에 대해
                        책임을 지지 않습니다. 사용자는 외부 사이트 이용 시 해당
                        사이트의 정책을 따라야 합니다. 2. 법적 고지 사항의 변경
                        회사는 「약관의 규제에 관한 법률」 제3조 제3항에 따라 본
                        고지 사항을 변경할 수 있으며, 변경 시 그 적용일자 7일
                        전부터 서비스 내에 공지합니다. 변경된 고지 사항에
                        동의하지 않는 사용자는 서비스 이용을 중단해야 합니다. 3.
                        준거법 및 관할 본 법적 고지 사항과 관련된 분쟁은
                        대한민국 법률에 따라 규율되며, 「민사소송법」 제2조 및
                        제3조에 따른 관할법원에서 해결합니다. <br />
                        4. 연락처 (98tmddyddl@gmail.com) 본 법적 고지 사항에
                        관한 문의는 다음 연락처로 해주시기 바랍니다: <br />
                        담당자: 유승용 <br />
                        연락처: 98tmddyddl@gmail.com <br />
                        시행일: 2024년 8월 1일
                      </TermsContent>
                      <TermsActions>
                        <div className="termAgree">
                          <TermsCheckbox
                            type="checkbox"
                            name="term3"
                            checked={isTermAccepted.term3}
                            onChange={handleCheckboxChange}
                          />
                          <TermsLabel>약관에 동의합니다.</TermsLabel>
                        </div>
                      </TermsActions>
                      <SubTitle>신용만 프로젝트의 이용약관</SubTitle>
                      <TermsContent>
                        목차 목적 정의 약관의 명시와 개정 서비스의 제공 및 변경
                        서비스 이용계약의 성립 회원의 의무 회사의 의무
                        개인정보보호 게시물의 관리 서비스 이용의 제한 계약해제,
                        해지 등 손해배상 분쟁해결 준거법 및 관할법원 1. 목적 이
                        약관은 회사명이 제공하는 신용정보 데이터 분석 기반,
                        신용평가 모형 추출 및 시각화 서비스(이하 "서비스")의
                        이용조건 및 절차에 관한 기본적인 사항을 규정함을
                        목적으로 합니다. 2. 정의 이 약관에서 사용하는 용어의
                        정의는 다음과 같습니다. "신용만"란 회사(추후 수정
                        필요)가 제공하는 모든 온라인 서비스를 의미합니다.
                        "회원"이란 회사와 서비스 이용계약을 체결하고 이용자
                        아이디를 부여받은 자를 말합니다. "아이디(ID)"란 회원의
                        식별과 서비스 이용을 위하여 회원이 정하고 회사가
                        승인하는 문자와 숫자의 조합을 말합니다. 1. 약관의 명시와
                        개정 회사는 이 약관을 회원가입 화면 및 초기화면에
                        게시하여 이용자가 쉽게 알 수 있도록 합니다. 회사는
                        「약관의 규제에 관한 법률」, 「정보통신망 이용촉진 및
                        정보보호 등에 관한 법률」 등 관련법을 위배하지 않는
                        범위에서 이 약관을 개정할 수 있습니다. 회사가 약관을
                        개정할 경우에는 적용일자 및 개정사유를 명시하여
                        현행약관과 함께 제1항의 방식에 따라 그 개정약관의
                        적용일자 7일 전부터 적용일자 전일까지 공지합니다. 1.
                        서비스의 제공 및 변경 회사는 다음과 같은 서비스를
                        제공합니다. a) 신용정보 데이터 분석 서비스 b) 신용평가
                        모형 추출 및 시각화 서비스 c) 기타 회사가 추가
                        개발하거나 제휴계약 등을 통해 회원에게 제공하는 일체의
                        서비스 회사는 서비스의 품질향상을 위하여 예고 없이
                        서비스의 내용을 변경할 수 있으며, 이에 대하여 관련법에
                        특별한 규정이 없는 한 회원에게 별도의 보상을 하지
                        않습니다. 1. 서비스 이용계약의 성립 서비스 이용계약은
                        회원이 되고자 하는 자(이하 "가입신청자")가 약관의 내용에
                        대하여 동의를 한 다음 회원가입신청을 하고 회사가 이러한
                        신청에 대하여 승낙함으로써 체결됩니다. 회사는
                        「전자상거래 등에서의 소비자보호에 관한 법률」 제13조
                        제2항에 따라 다음 각 호에 해당하는 경우 회원가입을
                        거절할 수 있습니다. 1. 회원의 의무 회원은 다음 행위를
                        하여서는 안 됩니다. 신청 또는 변경 시 허위내용의 등록
                        타인의 정보도용 회사가 게시한 정보의 변경 회사와 기타
                        제3자의 저작권 등 지적재산권에 대한 침해 회사 및 기타
                        제3자의 명예를 손상시키거나 업무를 방해하는 행위 1.
                        회사의 의무 회사는 관련법과 이 약관이 금지하거나
                        미풍양속에 반하는 행위를 하지 않으며, 계속적이고
                        안정적으로 서비스를 제공하기 위하여 최선을 다하여
                        노력합니다. 회사는 회원이 안전하게 서비스를 이용할 수
                        있도록 개인정보(신용정보 포함)보호를 위해 보안시스템을
                        갖추어야 하며 개인정보처리방침을 공시하고 준수합니다. 1.
                        개인정보보호 회사는 「개인정보 보호법」, 「신용정보의
                        이용 및 보호에 관한 법률」 등 관련 법령을 준수하며,
                        회원의 개인정보를 보호하기 위하여 노력합니다. 개인정보의
                        보호 및 사용에 대해서는 관련법 및 회사의
                        개인정보처리방침이 적용됩니다. 1. 게시물의 관리 회사는
                        다음 각 호에 해당하는 게시물이나 자료를 사전통지 없이
                        삭제하거나 이동 또는 등록 거부를 할 수 있습니다. 다른
                        회원 또는 제3자에게 심한 모욕을 주거나 명예를 손상시키는
                        내용인 경우 공공질서 및 미풍양속에 위반되는 내용을
                        유포하거나 링크시키는 경우 불법복제 또는 해킹을 조장하는
                        내용인 경우 영리를 목적으로 하는 광고성 내용인 경우
                        범죄와 결부된다고 객관적으로 인정되는 내용일 경우 1.
                        서비스 이용의 제한 회사는 회원이 이 약관의 의무를
                        위반하거나 서비스의 정상적인 운영을 방해한 경우, 경고,
                        일시정지, 영구이용정지 등으로 서비스 이용을 단계적으로
                        제한할 수 있습니다. 2. 계약해제, 해지 등 회원은 언제든지
                        서비스초기화면의 고객센터 또는 내 정보 관리 메뉴 등을
                        통하여 이용계약 해지 신청을 할 수 있으며, 회사는 관련법
                        등이 정하는 바에 따라 이를 즉시 처리하여야 합니다.
                        회사는 회원이 다음 각 호의 사유에 해당하는 경우
                        이용계약을 해지할 수 있습니다. a) 타인의 서비스 이용을
                        방해하거나 그 정보를 도용하는 등 전자상거래 질서를
                        위협하는 경우 b) 서비스를 이용하여 법령 또는 이 약관이
                        금지하거나 공서양속에 반하는 행위를 하는 경우 1.
                        손해배상 회사와 회원은 서비스 이용과 관련하여 고의 또는
                        과실로 상대방에게 손해를 끼친 경우에는 「민법」 등 관계
                        법령에 따라 그 손해를 배상할 책임이 있습니다. 회사는
                        무료로 제공되는 서비스와 관련하여 관련법에 특별한 규정이
                        없는 한 책임을 지지 않습니다. 1. 분쟁해결 회사는
                        회원으로부터 제출되는 불만사항 및 의견은 우선적으로 그
                        사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는
                        회원에게 그 사유와 처리일정을 즉시 통보해 드립니다.
                        회사와 회원 간에 발생한 전자상거래 분쟁과 관련하여
                        회원의 피해구제신청이 있는 경우에는 공정거래위원회 또는
                        시·도지사가 의뢰하는 분쟁조정기관의 조정에 따를 수
                        있습니다. 1. 준거법 및 관할법원 이 약관의 해석은
                        대한민국 법률에 따릅니다. 회사와 회원 간에 발생한 분쟁에
                        관한 소송은 「민사소송법」에 따른 관할법원에 제기합니다.
                        본 약관은 2024년 8월 1일부터 적용됩니다.
                      </TermsContent>
                      <TermsActions>
                        <div className="termAgree">
                          <TermsCheckbox
                            type="checkbox"
                            name="term4"
                            checked={isTermAccepted.term4}
                            onChange={handleCheckboxChange}
                          />
                          <TermsLabel>약관에 동의합니다.</TermsLabel>
                        </div>
                      </TermsActions>
                    </TermsScrollableContent>
                    <TermsActions>
                      <div className="termAgree">
                        <TermsCheckbox
                          type="checkbox"
                          name="AllCheck"
                          checked={isAllChecked}
                          onChange={handleAllCheckboxChange}
                        />
                        <TermsLabel>전체약관에 동의합니다.</TermsLabel>
                      </div>
                      <TermsButton
                        onClick={handleAgreeButtonClick}
                        disabled={!isAllChecked}
                        isActive={isAllChecked}
                      >
                        동의
                      </TermsButton>
                    </TermsActions>
                  </TermsForm>
                </TermImgDiv>
              </InputDiv>
              <Empty />
              {kakaoProp ? (
                <ButtonDiv>
                  <SignupButton
                    isActive={isRrnValid && isAllChecked}
                    onClick={kakaoBtnOnClickHandler}
                  >
                    Credit Account
                  </SignupButton>
                </ButtonDiv>
              ) : (
                <ButtonDiv>
                  <SignupButton
                    isActive={
                      isEmail &&
                      isCode &&
                      isPwd &&
                      isPwdCheack &&
                      isRrnValid &&
                      inputName &&
                      isAllChecked
                    }
                    onClick={signupBtnOnclickHandler}
                  >
                    Credit Account
                  </SignupButton>
                </ButtonDiv>
              )}
            </LoginWrapping>
          </Rectangle>
        </OverlapGroup>
      </OverlapGroupWrapper>
    </Screen>
  );
};

export default SignUp;
