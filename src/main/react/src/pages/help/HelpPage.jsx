import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import modalImg from "../../img/commonImg/전구 아이콘.gif";
import Modal from "./HelpModal";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";
import HelpAxios from "../../axiosapi/HelpAxios";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    justify-content: flex-start;
    height: 94vh;
    overflow-y: hidden;
  }
`;

const TopSide = styled.div`
  width: 92%;
  height: 48%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  z-index: 11;
  @media screen and (max-width: 1200px) {
    width: 95%;
    height: 45%;
    justify-content: center;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 360px;
    margin-top: 10%;
  }
  @media screen and (max-width: 430px) {
    margin-top: 15%;
  }
`;

const HelpList = styled.div`
  width: 97.6%;
  height: 92%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  @media screen and (max-width: 430px) {
    height: 80%;
  }
`;

const ListTitleBox = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 1200px) {
    width: 27%;
  }
  @media screen and (max-width: 768px) {
    width: 32%;
  }
`;

const ListName = styled.div`
  width: 100%;
  height: 20%;
  font-size: 19px;
  padding-right: 8%;
  color: ${({ theme }) => theme.color};
  transition: color 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins-Bold", Helvetica;
  @media screen and (max-width: 1200px) {
    font-size: 17px;
  }
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const TitleBox = styled.div`
  width: 95%;
  height: 73%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: auto;
`;

const Title = styled.div`
  width: 90%;
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-radius: 10px;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.sideBar : "transparent"};
  transition: background-color 0.5s ease;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.sideBar};
  }
  @media screen and (max-width: 1200px) {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const ListContents = styled.div`
  width: 77%;
  height: 90%;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    width: 70%;
  }
  @media screen and (max-width: 768px) {
    width: 65%;
  }
`;

const ContentTitle = styled.div`
  width: 95%;
  height: 15%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding-left: 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 1.5px;
  @media screen and (max-width: 1200px) {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;
const ContentTime = styled.div`
  width: 95%;
  height: 5%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding-right: 2%;
  padding-bottom: 5px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const ContentsBox = styled.div`
  width: 95%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const Contents = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 18px;
  letter-spacing: 1.5px; /* 글자 간격 설정 */
  line-height: 1.3; /* 줄 간격 설정 */
  padding: 1%;
  @media screen and (max-width: 1200px) {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const BottomSide = styled.div`
  width: 92%;
  height: 48%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  @media screen and (max-width: 1200px) {
    width: 95%;
    height: 45%;
    justify-content: center;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 369px;
    align-items: flex-start;
  }
`;

const HelpSend = styled.form`
  width: 97.6%;
  height: 92%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 430px) {
    height: 80%;
  }
`;

const HelpTitleBox = styled.div`
  width: 95%;
  height: 15%;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 1.5px;
`;

const HelpTitle = styled.input`
  width: 88%;
  height: 100%;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 2%;
  border: none;
  &:focus {
    outline: none;
    border: 1px solid darkgray;
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const SendBtn = styled.button`
  width: 120px;
  height: 40px;
  margin-left: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1f384c;
  font-family: "Roboto-Regular", Helvetica;
  font-size: 15px;
  font-weight: 400;
  color: #5a6acf;
  background-color: ${({ theme }) => theme.sideBar};
  transition: background-color 0.5s ease, color 0.5s ease;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
  @media screen and (max-width: 768px) {
    width: 90px;
    height: 35px;
    margin-left: 2%;
    font-size: 12px;
  }
`;

const HelpContents = styled.textarea`
  width: 95%;
  height: 65%;
  margin-top: 2%;
  padding: 2%;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 1.5px;
  border: none;
  &:focus {
    outline: none;
    border: 1px solid darkgray;
  }
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`;

const HelpPage = () => {
  const { email } = useContext(UserEmailContext);
  const [helpRequests, setHelpRequests] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // 선택된 ID를 관리
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const form = useRef();

  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 데이터를 가져옴
  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const response = await HelpAxios.getHelpRequests(email);
        setHelpRequests(response.data); // API에서 가져온 데이터 저장
      } catch (error) {
        console.error("문의 내역을 불러오는데 실패했습니다.", error);
      }
    };

    fetchHelpRequests();
  }, [email]);

  const codeModalOkBtnHandler = () => {
    closeNextModal();
  };
  const closeNextModal = () => {
    setModalOpen(false);
    window.location.reload();
  };
  const closeModal = () => {
    setModalOpen(false);
    window.location.reload();
  };

  const handleTitleClick = (id, title, contents, createdDate) => {
    setSelectedId(id); // ID 업데이트
    setSelectedTitle(title);
    setSelectedContent(contents);
    setSelectedTime(createdDate);
  };

  const isSelected = (id) => id === selectedId;

  const sendEmail = async (e) => {
    e.preventDefault();

    // 이메일 발송
    emailjs
      .sendForm(
        "service_waq6b03",
        "template_a3hde3s",
        form.current,
        "9YS83vnE1IHakDSR9"
      )
      .then(
        (result) => {
          // 이메일 발송 성공 시 모달을 열고 내용 설정
          setModalOpen(true);
          setModalContent("1:1 문의 등록이 완료되었습니다.");
          form.current.reset();
        },
        (error) => {
          // 이메일 발송 실패 시 모달을 열고 내용 설정
          console.log(error.text);
          setModalOpen(true);
          setModalContent("1:1 문의 등록에 실패하였습니다..");
        }
      );

    // 문의 내용을 데이터베이스에 저장
    const formData = {
      email,
      title: form.current.help_title.value,
      contents: form.current.message.value,
    };

    try {
      await HelpAxios.postHelpSend(formData);
      // 문의 등록 후 데이터 다시 불러오기
      const response = await HelpAxios.getHelpRequests(email);
      setHelpRequests(response.data);
    } catch (error) {
      console.log(error);
      setModalOpen(true);
      setModalContent("1:1 문의 등록에 실패하였습니다..");
    }
  };

  return (
    <Container>
      <TopSide>
        <HelpList>
          <ListTitleBox>
            <ListName>1:1 문의내역</ListName>
            <TitleBox>
              {helpRequests
                .slice()
                .reverse()
                .map((help) => (
                  <Title
                    key={help.id}
                    onClick={() =>
                      handleTitleClick(
                        help.id,
                        help.title,
                        help.contents,
                        help.createdDate
                      )
                    }
                    className={isSelected(help.id) ? "selected" : ""}
                  >
                    {help.title.length > 7
                      ? `${help.title.substring(0, 7)}...`
                      : help.title}
                  </Title>
                ))}
            </TitleBox>
          </ListTitleBox>
          <ListContents>
            <ContentTitle>문의제목 : {selectedTitle}</ContentTitle>
            <ContentTime>작성일 : {selectedTime}</ContentTime>
            <ContentsBox>
              <Contents>{selectedContent}</Contents>
            </ContentsBox>
          </ListContents>
        </HelpList>
      </TopSide>
      <BottomSide>
        <HelpSend ref={form} onSubmit={sendEmail}>
          <HelpTitleBox>
            <HelpTitle
              type="text"
              name="help_title"
              placeholder="문의 제목을 입력해주세요."
              maxLength={20}
              required
            />
            <SendBtn type="submit" onSumbit={sendEmail}>
              문의하기
            </SendBtn>
          </HelpTitleBox>
          <HelpContents
            name="message"
            placeholder="문의 내용을 입력해주세요.."
            required
          />
        </HelpSend>
      </BottomSide>
      <Modal
        open={modalOpen}
        header="1:1 문의하기"
        type={true}
        close={closeModal}
        img={modalImg}
        confirm={codeModalOkBtnHandler}
      >
        {modalContent}
      </Modal>
    </Container>
  );
};
export default HelpPage;
