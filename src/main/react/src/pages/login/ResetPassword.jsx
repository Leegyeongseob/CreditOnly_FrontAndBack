import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
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
const ButtonDiv = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  align-items: center;

  @media screen and (max-width: 500px) {
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
  @media screen and (max-width: 500px) {
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
`;
const FindPwdText = styled.div`
  width: 100%;
  height: 40%;
  font-size: 55px;
  color: #fff;
  font-weight: bold;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
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
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

 @media screen and (max-width: 500px) {
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
    font-size: 21px;
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
    @media screen and (max-width: 500px) {
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
    @media screen and (max-width: 500px) {
      font-size: 17px;
    }

    &:hover {
      color: #367ee9;
    }
  }
`;
const NavigateDiv = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  @media screen and (max-width: 500px) {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
const ResetPassword = () => {
  // 키보드 입력
  const [inputPwd, setInputPwd] = useState("");
  const [inputPwdCheck, setInputPwdCheck] = useState("");
  // 유효성 확인
  const [isPwd, setIsPwd] = useState("");
  const [isPwdCheack, setIsPwdCheck] = useState("");
  // 에러 메세지
  const [pwdMessage, setPwMessage] = useState("");
  //비밀번호 확인 메세지
  const [pwdCheckMessage, setPwdCheckMessage] = useState("");
  // 수정 결과 상태 값 저장
  const [isUpdate, setIsUpdate] = useState(false);
  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
  // 모달 해더
  const [headerContents, SetHeaderContents] = useState("");
  // 모달 내용
  const [modalContent, setModalContent] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();
  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeModal();
    if (isUpdate) {
      navigate("/login");
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const updataPwdOnclickHandler = () => {
    if (isPwd && isPwdCheack) {
      updataPwdAxios();
    }
  };
  // 비밀번호 수정 Axios
  const updataPwdAxios = async () => {
    try {
      console.log(email);
      SetHeaderContents("비밀번호 수정");
      const res = await LoginAxios.updatePwd(email, inputPwdCheck);
      if (res.data === "Success") {
        setModalOpen(true);
        setModalContent("수정이 완료되었습니다.");
        setIsUpdate(true);
      } else {
        setModalOpen(true);
        setModalContent("수정되지 않았습니다.");
        setIsUpdate(false);
      }
    } catch (error) {
      console.log(error);
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
                type="password"
                placeholder="Password"
                className="InputClass"
                value={inputPwd}
                onChange={onChangePw}
              />
            </InputDetailDiv>
            {inputPwd && <Message isCorrect={isPwd}>{pwdMessage}</Message>}
          </>
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
              <Message isCorrect={isPwdCheack}>{pwdCheckMessage}</Message>
            )}
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
                isActive={isPwd && isPwdCheack}
                onClick={updataPwdOnclickHandler}
              >
                Complete
              </FindButton>
            </FindButtonDiv>
          </NavigateDiv>
        </ButtonDiv>
      </FindPwdWarp>
    </FindByPwdWarp>
  );
};
export default ResetPassword;
