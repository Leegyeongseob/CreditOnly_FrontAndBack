import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginAxios from "../../axiosapi/LoginAxios";
import Modal from "../../common/utils/ImageModal";
import findIdImg from "../../img/loginImg/아이디찾기.gif";

const InputDiv = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  @media screen and (max-width: 610px) {
    height: 100%;
  }
`;
const ButtonDiv = styled.div`
  width: 110%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: first baseline;
  align-items: center;
`;
const FindButtonDiv = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 610px) {
    margin-top: 20px;
  }
`;
const FindButton = styled.div`
  width: 100%;
  min-width: 110px;
  height: 50%;
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
    height: 70px;
    font-size: 25px;
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

const RegisterationInput1 = styled.input`
  width: 40%;
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
  width: 47%;
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
    @media screen and (max-width: 610px) {
      font-size: 20px;
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
const FindByEmailWarp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const FindEmailText = styled.div`
  width: 100%;
  height: 40%;
  font-size: 55px;
  color: #fff;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  font-weight: bold;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  @media screen and (max-width: 610px) {
    font-size: 45px;
    display: flex;
    text-align: center;
    justify-content: center;
  }
`;
const FindEmailTextDetail = styled.div`
  width: 100%;
  height: 20%;
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  @media screen and (max-width: 610px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const FindEmailWarp = styled.div`
  width: 80%;
  height: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  margin-right: 20px;
  justify-content: center;
  display: flex;
  align-items: end;
  flex-direction: column;
  & > .remember {
    width: 80%;
    height: 40%;
    display: flex;
    justify-content: end;
    align-items: end;
    text-align: end;
    font-size: 20px;
    @media screen and (max-width: 610px) {
      display: none;
    }
  }
  & > .backToLogin {
    width: 80%;

    height: 60%;
    padding-top: 10px;
    display: flex;
    justify-content: end;
    align-items: first baseline;
    font-weight: 600;
    font-size: clamp(20px, 3vw, 35px);
    @media screen and (max-width: 610px) {
    }
    cursor: pointer;
    &:hover {
      color: #367ee9;
      font-size: clamp(20px, 3vw, 35px);
    }
  }
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
const FindEmail = () => {
  const navigate = useNavigate();

  //주민등록번호 표현 상태 변수
  const [rrnFirstPart, setRrnFirstPart] = useState("");
  const [rrnSecondPart, setRrnSecondPart] = useState("");
  // 유효한 주민등록번호인지 확인
  const [isRrnValid, setIsRrnValid] = useState(false);
  //주민등록번호 메세지
  const [isRrnValidMessage, setIsRrnValidMessage] = useState("");
  // 이름값 저장
  const [Name, setName] = useState("");

  // 찾은 결과 ID값 저장
  const [email, setEmail] = useState("");
  // 모달 해더
  const [headerContents, SetHeaderContents] = useState("");
  // 모달 내용
  const [modalContent, setModalContent] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeModal();
    if (email !== "") {
      navigate("/login");
    }
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const findIdOnclickHandler = () => {
    if (isRrnValid && Name) {
      findIdAxios();
    }
  };
  // 아이디찾기 버튼 이벤트 및 결과 출력
  const findIdAxios = async () => {
    const combinedRnn = combineRRN(rrnFirstPart, rrnSecondPart);
    try {
      const showUserId = await LoginAxios.findIdResult(Name, combinedRnn);

      // showUserId.data가 List<String>으로 가정
      const userIdList = showUserId.data; // List<String>

      // List<String>을 Map으로 변환
      const userIdMap = userIdList.reduce((map, userId, index) => {
        map[index] = userId; // 인덱스를 키로 사용하고, 문자열을 값으로 사용
        return map;
      }, {});


      SetHeaderContents("아이디 확인");
      setModalOpen(true);
      if (userIdList.length === 0) {
        setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
      } else {
        setModalContent(
          `아이디: ${Object.values(userIdMap).join(", ")} 입니다.`
        );
        setEmail(Object.values(userIdMap).join(", "));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 5~ 20자리의 영문자, 숫자, 언더스코어(_)로 이루어진 문자열이 유효한 아이디 형식인지 검사하는 정규표현식
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
  //주민등록번호 따로 받은 자리 합치는 함수
  const combineRRN = (firstPart, secondPart) => {
    return firstPart + secondPart;
  };
  // 이름 입력 함수
  const nameInputOnChange = (e) => {
    const name = e.target.value;
    setName(name);
  };

  return (
    <FindByEmailWarp>
      <Modal
        open={modalOpen}
        header={headerContents}
        type={true}
        confirm={codeModalOkBtnHandler}
        img={findIdImg}
      >
        {modalContent}
      </Modal>
      <FindEmailWarp>
        <InputDiv>
          <FindEmailText>Forgot Email?</FindEmailText>
          <FindEmailTextDetail>Don't warry. we can help.</FindEmailTextDetail>
          <InputDetailDiv>
            <input
              className="InputClass"
              placeholder="Full Name"
              onChange={nameInputOnChange}
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
              navigate("/findbypwd");
            }}
          >
            I can't remember My Password.
          </FindByPwd>
          <NavigateDiv>
            <GoToLoginPage>
              <div className="remember">Remembered your login ID?</div>
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
                isActive={isRrnValid && Name}
                onClick={findIdOnclickHandler}
              >
                Continue
              </FindButton>
            </FindButtonDiv>
          </NavigateDiv>
        </ButtonDiv>
      </FindEmailWarp>
    </FindByEmailWarp>
  );
};

export default FindEmail;
