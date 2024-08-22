import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import AnnouncementAxios from "../../axiosapi/AnnouncementAxios";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";
import Modal from "../help/HelpModal";
import modalImg from "../../img/commonImg/전구 아이콘.gif";

const Board = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  @media screen and (max-width: 768px) {
    height: 94vh;
  }
`;

const BtnDiv = styled.div`
  width: 92%;
  height: 5%;
  padding: 0 2% 0 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding: 0 5% 0 3%;
  }
`;

const EditBtn = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Btn = styled.div`
  width: 90px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1f384c;
  font-family: "Roboto-Regular", Helvetica;
  font-size: 14px;
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
    width: 80px;
    height: 30px;
    margin-left: 2%;
    font-size: 12px;
  }
`;

const TitleDiv = styled.div`
  width: 92%;
  height: 10%;
  margin-top: 1%;
  padding-top: 1%;
  padding-left: 3%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.commponent};
  transition: background-color 0.5s ease;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  @media screen and (max-width: 768px) {
    margin-top: 10%;
  }
`;
const Title = styled.h1`
  width: 285px;
  height: 90%;
  padding-left: 1%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 30px;
  font-weight: bolder;
  border-radius: 10px;
  @media screen and (max-width: 768px) {
    padding-left: 8%;
    font-size: 25px;
  }
`;

const Contents = styled.div`
  width: 92%;
  height: 74%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const TitleBox = styled.div`
  width: 95%;
  height: 15%;
  margin-top: 1%;
  padding-left: 2%;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 88%;
    padding-left: 5%;
  }
`;

const TitleUp = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
  @media screen and (max-width: 1200px) {
    font-size: 19px;
  }
`;

const TitleDown = styled.div`
  width: 270px;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  @media screen and (max-width: 1200px) {
    font-size: 12px;
  }
`;

const HelpBoardText = styled.div`
  width: 96%;
  height: 90%;
  font-size: 22px;
  padding: 3%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  @media screen and (max-width: 768px) {
    padding: 8%;
  }
`;
const HelpBoard = styled.div`
  width: 95%;
  height: 80%;
  margin-bottom: 2%;
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  @media screen and (max-width: 768px) {
    width: 88%;
  }
`;

const WriteTitleInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 28px;
  color: ${({ theme }) => theme.color};
  transition: color 0.5s ease;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const WriteContentsInput = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 20px;
  resize: none;
  overflow-y: auto;
  color: ${({ theme }) => theme.color};
  transition: color 0.5s ease;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const ModifiedTag = styled.span`
  font-size: 16px; // 원래 제목 폰트보다 작은 크기로 설정
  color: ${({ theme }) => theme.color};
  margin-left: 5px; // 제목과의 간격 설정
  white-space: nowrap;
  @media screen and (max-width: 1200px) {
    font-size: 12px;
    margin-right: 5px; // 제목과의 간격 설정
  }
`;

const AnBoardDetails = () => {
  const { email, adminEmails = [] } = useContext(UserEmailContext);
  const { classTitle, noticeId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [notice, setNotice] = useState(location.state?.notice || null);
  const [clickTitle, setClickTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [title, setTitle] = useState(notice?.title || "");
  const [contents, setContents] = useState(notice?.contents || "");
  const [modalContent, setModalContent] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const isAdmin = adminEmails.includes(email);

  useEffect(() => {
    switch (classTitle) {
      case "news":
        setClickTitle("새 소식");
        break;
      case "event":
        setClickTitle("이벤트");
        break;
      case "press":
        setClickTitle("보도 자료");
        break;
      default:
        setClickTitle("알 수 없음");
    }
  }, [classTitle]);

  useEffect(() => {
    if (!notice || notice.id !== noticeId) {
      const fetchNotice = async () => {
        try {
          const response = await AnnouncementAxios.getAnnouncement(noticeId);
          setNotice(response.data);
          setTitle(response.data.title); // 제목 상태 설정
          setContents(response.data.contents); // 내용 상태 설정
        } catch (error) {
          console.error("Failed to fetch notice", error);
        }
      };
      fetchNotice();
    }
  }, [notice, noticeId]);

  const handleBackClick = () => {
    navigate(`/announcement/${classTitle}`);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    try {
      let updatedTitle = title;

      // 제목에 "(수정됨)"이 없으면 추가
      if (!updatedTitle.includes("(수정)")) {
        updatedTitle += " (수정)";
      }

      const updatedNotice = {
        ...notice,
        title: updatedTitle,
        contents,
      };
      await AnnouncementAxios.updateAnnouncement(notice.id, updatedNotice);
      setNotice(updatedNotice);
      setModalOpen(true);
      setModalContent("게시글 수정이 완료되었습니다.");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  const handleDelClick = async () => {
    try {
      await AnnouncementAxios.deleteAnnouncement(notice.id);
      setModalOpen(true);
      setModalContent("게시글 삭제가 완료되었습니다.");
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const codeModalOkBtnHandler = () => {
    closeNextModal();
  };

  const closeNextModal = () => {
    setModalOpen(false);
    navigate(`/announcement/${classTitle}`);
  };

  const closeModal = () => {
    setModalOpen(false);
    navigate(`/announcement/${classTitle}`);
  };

  return (
    <Board>
      <BtnDiv>
        <Btn onClick={handleBackClick}>뒤로</Btn>
        {isAdmin && !isEditing && (
          <EditBtn>
            <Btn onClick={handleEditClick}>수정</Btn>
            <Btn onClick={handleDelClick}>삭제</Btn>
          </EditBtn>
        )}
        {isAdmin && isEditing && (
          <EditBtn>
            <Btn onClick={handleSaveClick}>저장</Btn>
            <Btn onClick={handleCancelClick}>취소</Btn>
          </EditBtn>
        )}
      </BtnDiv>
      <TitleDiv>
        <Title>{clickTitle}</Title>
      </TitleDiv>
      <Contents>
        {isEditing ? (
          <>
            <TitleBox>
              <WriteTitleInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </TitleBox>
            <HelpBoard>
              <HelpBoardText>
                <WriteContentsInput
                  type="text"
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                />
              </HelpBoardText>
            </HelpBoard>
          </>
        ) : (
          <>
            <TitleBox>
              <TitleUp>
                제목 : {notice?.title.replace(" (수정)", "")}
                {notice?.title.includes("(수정)") && (
                  <ModifiedTag>(수정)</ModifiedTag>
                )}
              </TitleUp>
              <TitleDown>
                작성일 : {notice?.createdDate || "날짜 없음"}
              </TitleDown>
            </TitleBox>
            <HelpBoard>
              <HelpBoardText>
                <p>{notice?.contents || "내용 없음"}</p>
              </HelpBoardText>
            </HelpBoard>
          </>
        )}
      </Contents>
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
    </Board>
  );
};

export default AnBoardDetails;
