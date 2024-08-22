import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";
import InformationAxios from "../../axiosapi/InformationAxios";
import Banner from "../banner/Banner";
import useImageErrorHandler from "./useImage";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 300px;
  @media screen and (max-width: 768px) {
    margin-top: 5%;
    margin-bottom: 5%;
  }
`;

const TopSide = styled.div`
  width: 92%;
  height: 48%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Adbanner = styled.div`
  width: 58.6%;
  height: 92%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 90%;
    height: 250px;
  }
`;

const CreditInfo = styled.div`
  width: 39%;
  height: 92%;
  background-color: ${({ theme }) => theme.commponent};
  transition: background-color 0.5s ease;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media screen and (max-width: 768px) {
    width: 90%;
    height: 230px;
    margin-top: 5%;
  }
`;

const BottomSide = styled.div`
  width: 92%;
  height: 48%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const CreditView = styled.div`
  width: 48.8%;
  height: 92%;
  background-color: ${({ theme }) => theme.commponent};
  transition: background-color 0.5s ease;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media screen and (max-width: 768px) {
    width: 90%;
    height: 230px;
    margin-top: 5%;
  }
`;

const TitleWrap = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  padding: 0 1vw;
`;

const TitlePage = styled.div`
  color: ${({ theme }) => theme.color};
  font-size: 20px;
  font-family: "Poppins-Bold", Helvetica;
`;

const IcBaselinePlus = styled(FaPlus)`
  margin-right: 10px;
`;

const CardListWrapper = styled.div`
  height: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
`;

const CardList = styled(Link)`
  background-color: ${({ theme }) => theme.sideBar};
  transition: background-color 0.5s ease;
  height: 45%;
  width: 43%;
  display: flex;
  flex-direction: column;
  margin: 1%; /* Added margin for spacing */
  border-radius: 10px; /* Added border-radius for consistency */
  text-decoration: none;
  color: inherit; /* Inherit color from parent */
`;

const Limg = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
  border-radius: 10px; /* Ensure image has consistent border radius */
`;

const InformationText = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: clamp(10px, 1.3vw, 20px);
`;

const ListWrapper = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ListGroup = styled(Link)`
  background-color: ${({ theme }) => theme.sideBar};
  transition: background-color 0.5s ease;
  display: flex;
  width: 90%;
  height: 42%;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px; /* Added border-radius for consistency */
  margin-bottom: 10px; /* Added margin for spacing */
  text-decoration: none;
  color: inherit; /* Inherit color from parent */
`;

const Simg = styled.img`
  border-radius: 50%;
  width: 20%; /* 부모 요소의 너비의 20%로 설정 */
  aspect-ratio: 1 / 1; /* 1:1 비율로 가로와 세로를 동일하게 설정 */
  object-fit: cover;

  @media screen and (max-width: 768px) {
    width: 15%;
  }
`;

const ListDetailWrap = styled.div`
  width: 70%;
  height: 74%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TextWrapper = styled.div`
  width: 100%;
  font-size: clamp(13px, 2vw, 20px);
  font-weight: 600;
`;

const DetailWrap = styled.div`
  width: 100%;
  letter-spacing: 0.5px;
  line-height: 23px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: inline;
  &:hover {
    color: blue;
  }
`;

const CreditInformation = () => {
  const [informationItems, setInformationItems] = useState([]);
  const [appItems, setAppItems] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const handleImageError = useImageErrorHandler(); // 훅 사용

  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoData = await InformationAxios.getInformationByCategory(
          "신용조회 정보모음"
        );
        const appData = await InformationAxios.getInformationByCategory(
          "신용조회 어플추천"
        );
        const cardData = await InformationAxios.getInformationByCategory(
          "신용카드와 신용정보"
        );
        console.log(infoData, appData, cardData);
        setInformationItems(infoData.slice(0, 4));
        setAppItems(appData.slice(0, 2));
        setCardItems(cardData.slice(0, 2));
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      } finally {
        setLoading(false); // 데이터 가져오기 후 로딩 상태 종료
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  return (
    <Container>
      <TopSide>
        <Adbanner>
          <Banner />
        </Adbanner>
        <CreditInfo>
          <TitleWrap>
            <TitlePage>신용조회 정보모음</TitlePage>
            <StyledLink to="/information-list/신용조회 정보모음">
              <IcBaselinePlus />
            </StyledLink>
          </TitleWrap>
          <CardListWrapper>
            {informationItems.map((item) => (
              <CardList key={item.id} to={`/news/${item.id}`}>
                <Limg
                  alt={item.title}
                  src={item.imageUrl}
                  onError={(e) => handleImageError(e, item.id)}
                />
                <InformationText>{item.title}</InformationText>
              </CardList>
            ))}
          </CardListWrapper>
        </CreditInfo>
      </TopSide>
      <BottomSide>
        <CreditView>
          <TitleWrap>
            <TitlePage>신용조회 어플추천</TitlePage>
            <StyledLink to="/information-list/신용조회 어플추천">
              <IcBaselinePlus />
            </StyledLink>
          </TitleWrap>
          <ListWrapper>
            {appItems.map((item) => (
              <ListGroup key={item.id} to={`/news/${item.id}`}>
                <Simg
                  alt={item.title}
                  src={item.imageUrl}
                  onError={(e) => handleImageError(e, item.id)}
                />
                <ListDetailWrap>
                  <TextWrapper>{item.title}</TextWrapper>
                  <DetailWrap>{item.content}</DetailWrap>
                </ListDetailWrap>
              </ListGroup>
            ))}
          </ListWrapper>
        </CreditView>
        <CreditView>
          <TitleWrap>
            <TitlePage>신용카드와 신용정보</TitlePage>
            <StyledLink to="/information-list/신용카드와 신용정보">
              <IcBaselinePlus />
            </StyledLink>
          </TitleWrap>
          <ListWrapper>
            {cardItems.map((item) => (
              <ListGroup key={item.id} to={`/news/${item.id}`}>
                <Simg
                  alt={item.title}
                  src={item.imageUrl}
                  onError={(e) => handleImageError(e, item.id)}
                />
                <ListDetailWrap>
                  <TextWrapper>{item.title}</TextWrapper>
                  <DetailWrap>{item.content}</DetailWrap>
                </ListDetailWrap>
              </ListGroup>
            ))}
          </ListWrapper>
        </CreditView>
      </BottomSide>
    </Container>
  );
};

export default CreditInformation;
