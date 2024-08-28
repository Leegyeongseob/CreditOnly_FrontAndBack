import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import emailjs from "emailjs-com";
import ImageModal from "../../common/utils/ImageModal";
import Modal from "../../common/utils/Modal";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import cry from "../../img/loginImg/울음.gif";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";

const Contain = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputDiv = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const InputDetailDiv = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  gap: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > .InputClass {
    width: 90%;
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
      font-size: 2.5vh;
      color: #5a3092;
      opacity: 0.5;
      font-weight: normal;
      font-style: italic;
    }
  }
  & > .InputEmail,
  .InputCode {
    width: 76%;
    height: 70px;
    border-radius: 0.521vw;
    border: 1px solid #000;
    outline: none;
    box-shadow: 0 6px 9px rgba(0, 0, 0, 0.3);
    padding-left: 5px;
    font-size: 2.1vh;
    padding-left: 10px;
    font-weight: 600;
    &::placeholder {
      text-align: center;
      font-size: 2.5vh;
      color: #5a3092;
      opacity: 0.5;
      font-weight: normal;
      font-style: italic;
    }
  }
`;
const Empty = styled.div`
  width: 2%;
  height: 2vh;
`;
const EmailAthouized = styled.div`
  width: 15%;
  height: 70px;
  border-radius: 10px;
  border: none;
  background-color: ${({ isActive }) => (isActive ? "#8afc9d" : "#fff")};
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
  @media screen and (max-width: 610px) {
    font-size: 13px;
  }
`;

const ButtonDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  align-items: center;
`;

const WithdrawalButton = styled.div`
  width: 200px;
  height: 50%;
  background-color: ${({ isActive }) => (isActive ? "#1A8350" : "#fff")};
  border-radius: 12px;
  padding: 5px;
  font-size: 25px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-style: italic;
  color: ${({ isActive }) => (isActive ? "#fff" : "#5a3092")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: ${({ isActive }) => (isActive ? "pointer" : "not-allowed")};
  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? "#105D38" : "rgba(0, 0, 0, 0.1)"};
  }
  @media screen and (max-width: 768px) {
    font-size: 21px;
  }
  @media screen and (max-width: 360px) {
    width: 110px;
    height: 40%;
    font-size: 18px;
  }
`;
const WithdrawalButtonDiv = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FindPwdText = styled.div`
  width: 100%;
  height: 30%;
  font-size: 50px;
  color: #fff;
  font-weight: bold;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  @media screen and (max-width: 1200px) {
    font-size: 40px;
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
    font-size: 21px;
  }
  @media screen and (max-width: 610px) {
    font-size: 18px;
  }
`;
const GoToLoginPage = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > .remember {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: flex-start;
    align-items: end;
    font-size: 20px;
    @media screen and (max-width: 610px) {
      font-size: 15px;
    }
    @media screen and (max-width: 360px) {
      font-size: 11px;
    }
  }
  & > .backToSetting {
    width: 100%;
    height: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: first baseline;
    font-weight: 600;
    font-size: 35px;
    cursor: pointer;
    &:hover {
      color: #367ee9;
      font-size: 36px;
    }
    @media screen and (max-width: 610px) {
      font-size: 28px;
    }
    @media screen and (max-width: 360px) {
      font-size: 20px;
    }
  }
`;
const NavigateDiv = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
`;
const Message = styled.div`
  width: 100%;
  font-size: 15px;
  display: flex;
  justify-content: center;
  color: ${({ isCorrect }) => (isCorrect ? "green" : "red")};
`;

const Contexts = styled.div`
  width: 100%;
  height: 30%;
  font-size: 28px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media screen and (max-width: 610px) {
    font-size: 23px;
  }
`;

const FindPwdTextDetail = styled.div`
  width: 100%;
  height: 10%;
  color: #fff;
  font-size: 22px;
  font-weight: 600;
`;
const Withdrawal = () => {
  const navigate = useNavigate();
  // 키보드 입력
  const [inputEmail, setInputEmail] = useState("");
  // 유효성 확인
  const [isId, setIsId] = useState("");
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

  // 모달 내용 변경
  const [modalContent, setModalContent] = useState("");
  // 모달 해더
  const [headerContents, SetHeaderContents] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  // 이미지 모달을 위한 상태변수
  const [isModalImg, setIsModalImg] = useState(false);
  //탈퇴 성공 변수
  const [isWithdrawal, setIsWithdrawal] = useState(false);
  const { email } = useContext(UserEmailContext);

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
      if (e.target.value === email) {
        setIdMessage("올바른 형식입니다.");
        setIsId(true);
      } else {
        setIdMessage("계정이 일치하지 않습니다.");
        setIsId(false);
      }
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
  // 이메일 인증 버튼 handler
  const emailCertificationBtnHandler = () => {
    if (isId) {
      sendVerificationEmail(inputEmail);
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
  const codeImgModalOkBtnHandler = () => {
    closeModal();
    if (isWithdrawal) {
      navigate("/");
    }
  };
  //회원 탈퇴하는 로직 함수
  const signuOutBtnOnclickHandler = () => {
    //DB에서 계정 삭제
    const memberDeleteAxios = async () => {
      const rsp = await MemberAxiosApi.memberDelete(inputEmail);
      console.log(rsp.data);
      setModalOpen(true);
      setIsModalImg(true);
      SetHeaderContents("회원탈퇴");
      if (rsp.data === "회원 정보가 성공적으로 삭제되었습니다.") {
        // 모달 처리
        setModalContent("탈퇴되었습니다.");
        setIsWithdrawal(true);
        //삭제 후 이동
        localStorage.setItem("accessToken", "");
        localStorage.setItem("isDarkMode", false);
        localStorage.setItem("refreshToken", "");
      } else {
        setModalContent("탈퇴 중 오류가 발생했습니다.");
        setIsWithdrawal(false);
      }
    };
    memberDeleteAxios();
  };
  //로그아웃
  const LogoutBtnClickHandler = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("isDarkMode", false);
    localStorage.setItem("refreshToken", "");
    navigate("/");
  };
  // 인증 코드 입력 처리 함수 수정
  const handleCertificationCodeInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 6) {
      setInputCertificationCode(value);
    }
  };
  return (
    <Contain>
      {isModalImg ? (
        <ImageModal
          open={modalOpen}
          header={headerContents}
          type={true}
          confirm={codeImgModalOkBtnHandler}
          img={cry}
        >
          {modalContent}
        </ImageModal>
      ) : (
        <Modal
          open={modalOpen}
          header={headerContents}
          type={true}
          confirm={codeModalOkBtnHandler}
        >
          {modalContent}
        </Modal>
      )}
      <InputDiv>
        <FindPwdText>
          Withdraw of
          <br /> membership?
        </FindPwdText>
        <FindPwdTextDetail>Do you really want to withdraw?</FindPwdTextDetail>
        <>
          <InputDetailDiv>
            <input
              className="InputEmail"
              value={inputEmail}
              onChange={onChangeEmail}
              placeholder={email}
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
        <Contexts>정말 탈퇴하실 건가요...?</Contexts>
      </InputDiv>
      <ButtonDiv>
        <FindByPwd onClick={LogoutBtnClickHandler}>
          I want to log out rather than
          <br /> cancel my membership.
        </FindByPwd>
        <NavigateDiv>
          <GoToLoginPage>
            <div className="remember">You don’t want to withdraw?</div>
            <div
              className="backToSetting"
              onClick={() => {
                navigate("/setting");
              }}
            >
              Back to Setting
            </div>
          </GoToLoginPage>
          <WithdrawalButtonDiv>
            <WithdrawalButton
              isActive={isEmail && isCode}
              onClick={signuOutBtnOnclickHandler}
            >
              Complete
            </WithdrawalButton>
          </WithdrawalButtonDiv>
        </NavigateDiv>
      </ButtonDiv>
    </Contain>
  );
};

export default Withdrawal;
