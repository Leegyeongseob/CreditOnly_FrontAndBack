import React, { useContext, useState, useEffect } from "react";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TbArrowBack } from "react-icons/tb";
import InformationAxios from "../../axiosapi/InformationAxios"; // API 호출을 위한 모듈
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";
import Comments from "./Comment/Comment";
import NewsForm from "./NewsForm";
import useImageErrorHandler from "./useImage";
import Loading from "../evaluation/Loading";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 300px;
`;

const CommentsToggle = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;
  z-index: 3;
  cursor: pointer;
  display: none; /* 기본적으로 숨김 */

  @media screen and (max-width: 768px) {
    display: block; /* 화면 너비가 768px 이하일 때만 보이게 설정 */
  }

  /* SVG 스타일 조정 */
  svg {
    width: 100px; /* 원하는 너비로 설정 */
    height: 50px; /* 원하는 높이로 설정 */
  }
`;

const Container = styled.div`
  width: 70%;
  margin: 1% auto;
  margin-right: 2%;
  padding: 2%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 754px;

  @media screen and (max-width: 760px) {
    width: 93%;
    opacity: ${({ showComments }) => (showComments ? 0 : 1)};
    pointer-events: ${({ showComments }) => (showComments ? "none" : "auto")};
  }
`;

const TopSection = styled.div`
  display: flex;
`;

const BackButtonContainer = styled.div`
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

const BackButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: ${({ active, theme }) =>
    active ? theme.commponent : theme.borderBottom};
  color: ${({ theme }) => theme.color};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    scale: calc(1.1);
  }
`;

const DetailWrap = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: auto; /* Enable vertical scrolling */
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 2% auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 2%;
  color: ${({ theme }) => theme.color};
  @media screen and (max-width: 768px) {
    font-size: clamp(15px, 3vw, 24px);
  }
`;

const CreationDate = styled.p`
  font-size: 18px;
  color: #666;
  color: ${({ theme }) => theme.color};
  @media screen and (max-width: 768px) {
    font-size: clamp(11px, 3vw, 18px);
  }
`;

const NewsImg = styled.img`
  width: 100%;
  height: 40%;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: ${({ theme }) => theme.color};
  white-space: pre-wrap; /* 줄바꿈을 반영하여 텍스트를 표시 */
`;

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

const MainBox = styled.div`
  display: flex;
  width: 100%;
`;

const EditBtn = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  opacity: ${({ showComments }) => (showComments ? 0 : 1)};
  pointer-events: ${({ showComments }) => (showComments ? "none" : "auto")};
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

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const { email, adminEmails = [] } = useContext(UserEmailContext);
  const isAdmin = adminEmails.includes(email);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [editedItem, setEditedItem] = useState(null); // 수정된 데이터를 저장할 상태
  const handleImageError = useImageErrorHandler();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await InformationAxios.getInformationById(id);
        setItem(response);
        setEditedItem(response); // 처음에 로드된 데이터를 편집 상태에도 초기화
      } catch (err) {
        setError("뉴스 항목을 찾을 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) return <Loading creditInfo={true}/>;
  if (error) return <p>{error}</p>;
  if (!item) return <p>뉴스 항목을 찾을 수 없습니다.</p>;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedItem(item); // 취소 시, 편집된 내용을 원래 상태로 복원
  };

  const handleDelClick = async () => {
    try {
      await InformationAxios.deleteInformation(id);
      navigate(-1); // 삭제 후 이전 페이지로 돌아가기
    } catch (err) {
      console.error("정보 삭제 실패:", err);
      setError("정보 삭제에 실패했습니다.");
    }
  };

  const handleSaveClick = async () => {
    try {
      const updatedData = await InformationAxios.updateInformation(
        id,
        editedItem
      );
      setItem(updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error(`정보 수정 실패 (ID: ${id}):`, error);
      setError("정보 수정에 실패했습니다.");
    }
  };

  const handleInputChange = (field, value) => {
    setEditedItem((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Wrap>
      <BackButtonContainer>
        <BackButton onClick={() => navigate(-1)}>
          <TbArrowBack />
        </BackButton>
        {isAdmin && !isEditing && (
          <EditBtn showComments={showComments}>
            <Btn onClick={handleEditClick}>수정</Btn>
            <Btn onClick={handleDelClick}>삭제</Btn>
          </EditBtn>
        )}
        {isAdmin && isEditing && (
          <EditBtn showComments={showComments}>
            <Btn onClick={handleSaveClick}>저장</Btn>
            <Btn onClick={handleCancelClick}>취소</Btn>
          </EditBtn>
        )}
        <CommentsToggle onClick={() => setShowComments(!showComments)}>
          {showComments ? <LiaToggleOffSolid /> : <LiaToggleOnSolid />}
        </CommentsToggle>
      </BackButtonContainer>
      <MainBox>
        <Container showComments={showComments}>
          {isEditing ? (
            <NewsForm
              item={editedItem}
              onInputChange={handleInputChange}
              isEditing
            />
          ) : (
            <>
              <TopSection>
                <Header>
                  <Title>{item.title}</Title>
                  <CreationDate>{formatDate(item.publishedDate)}</CreationDate>
                </Header>
              </TopSection>
              <DetailWrap>
                <NewsImg
                  alt={item.title}
                  src={item.imageUrl}
                  onError={(e) => handleImageError(e, item.id)}
                />

                <Content>{item.content}</Content>
              </DetailWrap>
            </>
          )}
        </Container>
        <Comments informationId={id} showComments={showComments} />
      </MainBox>
    </Wrap>
  );
};

export default NewsDetail;
