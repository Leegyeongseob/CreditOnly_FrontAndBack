import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import emailjs from "emailjs-com";
import LoginAxios from "../../axiosapi/LoginAxios";
import Modal from "../../common/utils/ImageModal";
import findpwdImg from "../../img/loginImg/패스워드찾기.gif";

const InputDiv = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const NavigateDiv = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  @media screen and (max-width: 610px) {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const ButtonDiv = styled.div`
  width: 110%;
  height: 30%;
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  align-items: center;

  @media screen and (max-width: 610px) {
    height: 33%;
  }
`;
const FindButtonDiv = styled.div`
  width: 50%;
  height: 100%;
  /* background-color: aliceblue; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FindButton = styled.div`
  width: 100%;
  min-width: 110px;
  height: 50%;
  min-height: 64px;
  background-color: ${({ isActive }) => (isActive ? "#1A8350" : "#fff")};
  border-radius: 12px;
  font-size: clamp(22px, 2vw, 30px);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-style: italic;
  color: ${({ isActive }) => (isActive ? "#fff" : "#5a3092")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  @media screen and (max-width: 610px) {
    font-size: 20px;
  }
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "#105D38" : "rgba(0, 0, 0, 0.1)"};
  }
`;
const InputDetailDiv = styled.div`
  width: 100%;
  height: 27%;
  display: flex;
  gap: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > .InputClass {
    width: 100%;
    height: 70%;
    border-radius: 0.521vw;
    border: 1px solid #000;
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 5px;
    font-size: 3vh;
    padding-left: 10px;
    font-weight: 600;
    &::placeholder {
      text-align: center;
      font-size: clamp(11px, 3vw, 20px);
      color: #5a3092;
      opacity: 0.5;
      font-weight: normal;
      font-style: italic;
    }
  }
  & > .InputEmail,
  .InputCode {
    width: 83%;
    height: 70%;
    border-radius: 0.521vw;
    border: 1px solid #000;
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 5px;
    font-size: 3vh;
    padding-left: 10px;
    font-weight: 600;
    &::placeholder {
      text-align: center;
      font-size: clamp(11px, 3vw, 20px);
      color: #5a3092;
      opacity: 0.5;
      font-weight: normal;
      font-style: italic;
    }
  }
`;

const RegisterationInput1 = styled.input`
  width: 44%;
  height: 70%;
  border-radius: 0.521vw;
  border: 1px solid #000;
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 5px;
  font-size: 3vh;
  padding-left: 10px;
  font-weight: 600;
  &::placeholder {
    text-align: center;
    font-size: clamp(11px, 3vw, 20px);
    color: #5a3092;
    opacity: 0.5;
    font-weight: normal;
    font-style: italic;
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
  width: 53%;
  height: 70%;
  border-radius: 0.521vw;
  border: 1px solid #000;
  outline: none;
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
  padding-left: 5px;
  font-size: 3vh;
  padding-left: 10px;
  font-weight: 600;
  &::placeholder {
    text-align: center;
    font-size: clamp(8px, 2.5vw, 20px);
    color: #5a3092;
    opacity: 0.5;
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
const FindByPwdWarp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;
const FindPwdText = styled.div`
  width: 100%;
  height: 40%;
  font-size: 55px;
  color: #fff;
  font-weight: bold;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  @media screen and (max-width: 610px) {
    font-size: 40px;
    display: flex;
    /* background-color: black; */
    margin-right: 10%;
  }
`;
const FindPwdTextDetail = styled.div`
  width: 100%;
  height: 20%;
  color: #fff;
  font-size: 22px;
  font-weight: 600;
`;
const FindPwdWarp = styled.div`
  width: 80%;
  min-width: 200px;
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 610px) {
    height: 90%;
  }
`;
const FindByPwd = styled.div`
  width: 100%;
  height: 20%;
  font-size: 20px;
  color: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #367ee9;
    font-size: 20px;
  }
`;
const GoToLoginPage = styled.div`
  width: 80%;
  height: 100%;
  margin-right: 30px;
  justify-content: center;
  /* background-color: aliceblue; */
  display: flex;
  align-items: end;
  flex-direction: column;
  & > .remember {
    width: 80%;
    height: 50%;
    display: flex;
    justify-content: end;
    align-items: end;
    text-align: end;
    font-size: 20px;
    @media screen and (max-width: 610px) {
      font-size: 17px;
    }
    @media screen and (max-width: 352px) {
      font-size: 15px;
    }
  }
  & > .backToLogin {
    width: 80%;
    min-width: 120px;
    height: 50%;
    display: flex;
    justify-content: end;
    align-items: first baseline;
    font-weight: 600;
    font-size: clamp(20px, 3vw, 35px);
    cursor: pointer;
    @media screen and (max-width: 610px) {
      font-size: 17px;
    }

    &:hover {
      color: #367ee9;
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
  color: ${({ isActive }) => (isActive ? "#fff" : "#5b3092a9")};
  font-weight: 600;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#fff" : "#88ff9c")};
    color: ${({ isActive }) => (isActive ? "#5b3092a9" : "#fff")};
  }
`;
const FindPassword = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [isId, setIsId] = useState("");
  const [name, setName] = useState("");
  // 에러 메세지
  const [idMessage, setIdMessage] = useState("");
  //주민등록번호 표현 상태 변수
  const [rrnFirstPart, setRrnFirstPart] = useState("");
  const [rrnSecondPart, setRrnSecondPart] = useState("");
  // 유효한 주민등록번호인지 확인
  const [isRrnValid, setIsRrnValid] = useState(false);
  //주민등록번호 메세지
  const [isRrnValidMessage, setIsRrnValidMessage] = useState("");
  // 찾은 결과 Pwd값 저장
  const [pwd, setPwd] = useState("");
  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  // 모달 해더
  const [headerContents, SetHeaderContents] = useState("");
  // 모달 내용
  const [modalContent, setModalContent] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isCode, setIsCode] = useState(false);
  // 비교할 인증코드
  const [certificationCode, setCertificationCode] = useState("");
  //인증코드 저장
  const [inputCertificationCode, setInputCertificationCode] = useState(null);

  const navigate = useNavigate();
  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeModal();
    if (pwd) {
      const propsToPass = {
        email: inputEmail,
      };

      navigate("/resetpwd", { state: propsToPass });
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const findPwdOnclickHandler = () => {
    if (isId && isCode && name && isRrnValid) {
      findPwdAxios();
    }
  };
  //주민등록번호 따로 받은 자리 합치는 함수
  const combineRRN = (firstPart, secondPart) => {
    return firstPart + secondPart;
  };
  // 비밀번호찾기 버튼 이벤트 및 결과 출력
  const findPwdAxios = async () => {
    const combinedRnn = combineRRN(rrnFirstPart, rrnSecondPart);
    try {
      const showUserPwd = await LoginAxios.findPwdResult(
        inputEmail,
        name,
        combinedRnn
      );
      SetHeaderContents("비밀번호 확인");
      setModalOpen(true);
      if (showUserPwd.data === "") {
        setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
      } else {
        setModalContent(
          "계정이 존재합니다. 비밀번호 재설정 페이지로 이동합니다."
        );
        setPwd(showUserPwd.data);
      }
      // console.log(showEmail);
    } catch (error) {
      console.log(error);
    }
  };

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
  const onChangeName = (e) => {
    setName(e.target.value);
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
  // 인증 코드 입력 처리 함수 수정
  const handleCertificationCodeInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 6) {
      setInputCertificationCode(value);
    }
  };
  return (
    <FindByPwdWarp>
      <Modal
        open={modalOpen}
        header={headerContents}
        type={true}
        confirm={codeModalOkBtnHandler}
        img={findpwdImg}
      >
        {modalContent}
      </Modal>
      <FindPwdWarp>
        <InputDiv>
          <FindPwdText>
            Forgot
            <br /> Password?
          </FindPwdText>
          <FindPwdTextDetail>Don't warry. we can help.</FindPwdTextDetail>
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
            {inputEmail && <Message isCorrect={isId}>{idMessage}</Message>}
          </>
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
          <InputDetailDiv>
            <input
              className="InputClass"
              placeholder="Full Name"
              onChange={onChangeName}
            />
          </InputDetailDiv>
          <>
            <InputDetailDiv>
              <RegisterationInput1
                placeholder="Social"
                value={rrnFirstPart}
                onChange={handleRrnFirstPartChange}
              />
              <Text> - </Text>
              <RegisterationInput2
                type="password"
                placeholder="Security Number"
                value={rrnSecondPart}
                onChange={handleRrnSecondPartChange}
              />
            </InputDetailDiv>
            <Message isCorrect={isRrnValid}>{isRrnValidMessage}</Message>
          </>
        </InputDiv>
        <ButtonDiv>
          <FindByPwd
            onClick={() => {
              navigate("/findbyemail");
            }}
          >
            I can't remember My login ID.
          </FindByPwd>
          <NavigateDiv>
            <GoToLoginPage>
              <div className="remember">Remembered your password?</div>
              <div
                className="backToLogin"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Back to Login
              </div>
            </GoToLoginPage>
            <FindButtonDiv>
              <FindButton
                isActive={isId && isCode && name && isRrnValid}
                onClick={findPwdOnclickHandler}
              >
                Continue
              </FindButton>
            </FindButtonDiv>
          </NavigateDiv>
        </ButtonDiv>
      </FindPwdWarp>
    </FindByPwdWarp>
  );
};
export default FindPassword;
