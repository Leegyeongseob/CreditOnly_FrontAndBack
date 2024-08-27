import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext,
} from "react";
import styled from "styled-components";
import Ad1 from "../../img/mainImg/Ad1.png";
import Ad2 from "../../img/mainImg/Ad2.png";
import Ad3 from "../../img/mainImg/Ad3.png";
import Ad4 from "../../img/mainImg/Ad4.png";
import Ad5 from "../../img/mainImg/Ad5.png";
import Logo from "../../img//background/CreditOnlyLogo.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";
import DoughnutChartComponent from "../../chart/DoughnutChartComponent";
import IsNotCreditEvaluationForm from "../evaluation/IsNotCreditEvaluationForm";
import CreditGradeBarChart from "../../chart/CreditGradeBarChart";
import InformationAxios from "../../axiosapi/InformationAxios";
import img1 from "../../img/news/img1.jpg";
import img2 from "../../img/news/img2.jpg";
import img3 from "../../img/news/img3.jpg";
import img4 from "../../img/news/img4.jpg";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    margin-bottom: 5%;
    overflow-x: hidden;
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
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 180%;
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  .swiper-pagination {
    padding: 1px;
  }
  .swiper-pagination-bullet {
    background: #8290ee;
    width: 9px;
    height: 9px;
    &:hover {
      opacity: 0.7;
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: #8290ee;
    &:hover {
      opacity: 0.6;
    }
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 1.5rem;
  }
`;

const Slide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 10px;
  transition: background-color 0.5s ease;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: ${({ theme }) => theme.overlay};
    transition: background-color 0.5s ease;
    pointer-events: none;
  }
`;

const SlideLink = styled(Link)`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const SlideLink2 = styled.a`
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const AdbannerWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;

// 편집 중 컴포넌트 블락
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  background: rgba(0, 0, 0, 0.1); /* 투명한 검정색 오버레이 */
  z-index: 10; /* 오버레이가 위에 표시되도록 설정 */
  border-radius: 10px;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    transform: scale(1.01);
  }
`;

const Adbanner = React.memo(({ isEditing }) => (
  <AdbannerWrapper>
    {isEditing && <Overlay imageurl={Logo} />}
    <StyledSwiper
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      modules={[Navigation, Pagination, Autoplay]}
    >
      <Slide imageurl={Ad1}>
        <SlideLink to="/mainpage" />
      </Slide>
      <Slide imageurl={Ad2}>
        <SlideLink to="/evaluation" />
      </Slide>
      <Slide imageurl={Ad3}>
        <SlideLink to="/chat" />
      </Slide>
      <Slide imageurl={Ad4}>
        <SlideLink2 href="https://www.palette-couple.store" target="_blank" />
      </Slide>
      <Slide imageurl={Ad5}>
        <SlideLink to="/information" />
      </Slide>
    </StyledSwiper>
  </AdbannerWrapper>
));

const CreditViewWrap = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 230px;
  }
`;

const BottomSide = styled.div`
  width: 92%;
  height: 48%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  z-index: 11;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 180%;
  }
`;
// const TitleWrap = styled.div`
//   width: 100%;
//   height: 10%;
//   display: flex;
//   justify-content: space-between;
//   padding: 0 1vw;
// `;

// const TitlePage = styled.div`
//   color: #5e5e5e;
//   font-size: 20px;
// `;
const CreditInfoWrap = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  padding: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
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
`;
// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: inherit; /* Inherit color from parent */
//   display: inline; /* Ensures link behaves as a block-level element */
//   &:hover {
//     color: blue;
//   }
// `;
const CardListWrapper = styled.div`
  height: 80%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
`;
const CreditInfo = React.memo(({ isEditing, isCreditEvaluation }) => (
  <CreditInfoWrap>
    {isEditing ? (
      <>
        <Overlay imageurl={Logo}>신용 등급</Overlay>
      </>
    ) : (
      <>
        {isCreditEvaluation ? (
          <DoughnutChartComponent />
        ) : (
          <IsNotCreditEvaluationForm />
        )}
      </>
    )}
  </CreditInfoWrap>
));

const CreditView = React.memo(({ isEditing, informationItems }) => (
  <CreditViewWrap>
    {isEditing ? (
      <>
        <Overlay imageurl={Logo}>신용 정보</Overlay>
        <CardListWrapper>
          {informationItems.map((item) => (
            <CardList key={item.id} to={`/news/${item.id}`}>
              <Limg alt={item.title} src={item.imageUrl} />
              <InformationText>{item.title}</InformationText>
            </CardList>
          ))}
        </CardListWrapper>
      </>
    ) : (
      <>
        <CardListWrapper>
          {informationItems.map((item) => (
            <CardList key={item.id} to={`/news/${item.id}`}>
              <Limg alt={item.title} src={item.imageUrl} />
              <InformationText>{item.title}</InformationText>
            </CardList>
          ))}
        </CardListWrapper>
      </>
    )}
  </CreditViewWrap>
));

const CreditView2 = React.memo(({ isEditing }) => (
  <CreditViewWrap>
    {isEditing ? (
      <>
        <CreditGradeBarChart />
        <Overlay imageurl={Logo}>시각화</Overlay>
      </>
    ) : (
      <>
        <CreditGradeBarChart />
      </>
    )}
  </CreditViewWrap>
));

const EdiBtnDiv = styled.div`
  width: 100%;
  height: 60px;
  padding-left: 5%;
  padding-right: 4%;
  display: flex;
  align-items: center;
  justify-content: ${({ isEditing }) =>
    isEditing ? "space-between" : "flex-end"};
  flex-direction: row;
  @media screen and (max-width: 768px) {
    height: 50px;
    display: none;
  }
`;

const EditHelp = styled.div`
  width: 220px;
  height: 35px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.goodBlue};
  transform: color 0.5s ease;
  @media screen and (max-width: 768px) {
    width: 210px;
    height: 30px;
    font-size: 11px;
  }
  @media screen and (max-width: 430px) {
    width: 190px;
    font-size: 9px;
  }
`;

const BtnBox = styled.div`
  width: 190px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: 150px;
  }
`;

const EditBtn = styled.div`
  width: 90px;
  height: 35px;
  display: flex;
  margin-left: 3%;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: royalblue;
  background-color: ${({ theme }) => theme.sideBar};
  transition: background-color 0.5s ease;
  font-size: 13px;
  z-index: 11;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  @media screen and (max-width: 768px) {
    width: 70px;
    height: 30px;
    font-size: 12px;
  }
  @media screen and (max-width: 430px) {
    width: 50px;
    height: 25px;
  }
`;

const DragContainer = React.memo(styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-bottom: 10px;
  border-radius: 10px;
  cursor: ${({ isEditing }) => (isEditing ? "grab" : "default")};
  background-color: ${({ theme }) => theme.commponent};
  box-shadow: 1px 1px 4px ${({ theme }) => theme.shadow};
  transition: background-color 0.5s ease, box-shadow 0.5s ease;
  position: relative;
  @media screen and (max-width: 768px) {
    margin-top: 1.5%;
  }

  &.dropArea::before {
    content: "Drop It!";
    color: #687bf7;
    font-size: 16px;
    width: 100%;
    height: 100%;
    border: 2px dashed ${({ theme }) => theme.drag};
    border-radius: 10px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.dropArea * {
    visibility: hidden;
  }
`);

// 개별 컴포넌트 생성 함수
const createComponents = (
  id,
  isEditing,
  isCreditEvaluation,
  informationItems,
  handleImageError
) => {
  const CenteredContainer = styled.div`
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    border-radius: 10px;
    width: ${(props) => props.width || "100%"};
    height: 100%;
    position: relative; /* Overlay를 위한 위치 설정 */
  `;
  switch (id) {
    case "Adbanner":
      return {
        id,
        component: (
          <CenteredContainer>
            <Adbanner isEditing={isEditing} />
          </CenteredContainer>
        ),
        width: "48.8%",
        height: "92%",
      };
    case "CreditInfo":
      return {
        id,
        component: (
          <CenteredContainer>
            <CreditInfo
              isEditing={isEditing}
              isCreditEvaluation={isCreditEvaluation}
            />
          </CenteredContainer>
        ),
        width: "48.8%",
        height: "92%",
      };
    case "CreditView1":
      return {
        id,
        component: (
          <CenteredContainer>
            <CreditView
              isEditing={isEditing}
              informationItems={informationItems}
            />
          </CenteredContainer>
        ),
        width: "48.8%",
        height: "92%",
      };
    case "CreditView2":
      return {
        id,
        component: (
          <CenteredContainer>
            <CreditView2 isEditing={isEditing} />
          </CenteredContainer>
        ),
        width: "48.8%",
        height: "92%",
      };
    default:
      return null;
  }
};

const MainPage = () => {
  const [informationItems, setInformationItems] = useState([]);

  const initialComponentsOrder = useMemo(
    () => ["Adbanner", "CreditInfo", "CreditView1", "CreditView2"],
    []
  );

  // 로컬 스토리지에서 컴포넌트 순서를 가져오거나 초기값으로 설정
  const [componentOrder, setComponentOrder] = useState(
    JSON.parse(localStorage.getItem("componentOrder")) || initialComponentsOrder
  );

  const [draggedTo, setDraggedTo] = useState(null);

  // 편집 모드 상태
  const [isEditing, setIsEditing] = useState(false);

  // 초기 순서를 저장하는 상태
  const [initialOrder, setInitialOrder] = useState(componentOrder);

  //카카오 로그인시 프로필 자동 변경
  // contextApi에서 저장중인 email 불러오기
  const { isCreditEvaluation } = useContext(UserEmailContext);
  console.log("isCreditEvaluation : ", isCreditEvaluation);
  // 이미지 매핑 객체 생성
  const localImages = [img1, img2, img3, img4];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const infoData = await InformationAxios.getInformationByCategory(
          "신용조회 정보모음"
        );
        console.log(infoData);
        // infoData를 처리하는 부분
        const processedInfoData = infoData.slice(0, 4).map((item, index) => ({
          ...item,
          imageUrl: localImages[index], // 기존 imageUrl을 로컬 이미지로 대체
        }));
        setInformationItems(processedInfoData);
      } catch (error) {
        console.error("데이터 가져오기 실패:", error);
      }
    };

    fetchData();
  }, []);

  // 컴포넌트 순서가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (!isEditing) {
      localStorage.setItem("componentOrder", JSON.stringify(componentOrder));
    }
  }, [componentOrder, isEditing]);

  const handleDragStart = useCallback(
    (e, position) => {
      if (!isEditing) return;
      e.dataTransfer.setData("draggedComponent", position);
    },
    [isEditing]
  );

  const handleDrop = useCallback(
    (e, position) => {
      const draggedComponentIndex = e.dataTransfer.getData("draggedComponent");
      if (
        isEditing &&
        draggedComponentIndex !== null &&
        draggedComponentIndex !== position
      ) {
        setComponentOrder((prevOrder) => {
          const updatedOrder = [...prevOrder];
          const [draggedComponent] = updatedOrder.splice(
            draggedComponentIndex,
            1
          );
          updatedOrder.splice(position, 0, draggedComponent);
          return updatedOrder;
        });
      }
      setDraggedTo(null);
    },
    [isEditing]
  );

  const handleDragOver = useCallback(
    (e, index) => {
      if (!isEditing) return;
      e.preventDefault();
      setDraggedTo(index);
    },
    [isEditing]
  );

  const handleDragLeave = useCallback(() => {
    setDraggedTo(null);
  }, []);

  const toggleEditMode = () => {
    if (isEditing) {
      // 편집 모드에서 종료 시 변경 내용 저장
      setInitialOrder(componentOrder);
    } else {
      // 편집 모드 진입 시 초기 순서 저장
      setInitialOrder(componentOrder);
    }
    setIsEditing((prev) => !prev);
  };

  const handleSave = () => {
    // 변경된 순서를 로컬 스토리지에 저장하고 편집 모드 종료
    localStorage.setItem("componentOrder", JSON.stringify(componentOrder));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // 변경 내용 무시하고 초기 순서로 복원
    setComponentOrder(initialOrder);
    setIsEditing(false);
  };

  return (
    <Container>
      <EdiBtnDiv isEditing={isEditing}>
        {!isEditing && (
          <>
            <EditBtn onClick={toggleEditMode}>편집</EditBtn>
          </>
        )}
        {isEditing && (
          <>
            <EditHelp>드래그하여 보드의 위치를 변경할 수 있습니다.</EditHelp>
            <BtnBox>
              <EditBtn onClick={handleSave}>저장</EditBtn>
              <EditBtn onClick={handleCancel}>취소</EditBtn>
            </BtnBox>
          </>
        )}
      </EdiBtnDiv>
      <TopSide>
        {componentOrder.slice(0, 2).map((id, index) => {
          const item = createComponents(
            id,
            isEditing,
            isCreditEvaluation,
            informationItems
          );
          return (
            <DragContainer
              key={item.id}
              draggable={isEditing}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragLeave={handleDragLeave}
              width={item.width}
              height={item.height}
              className={draggedTo === index ? "dropArea" : ""}
              isEditing={isEditing}
            >
              {item.component}
            </DragContainer>
          );
        })}
      </TopSide>
      <BottomSide>
        {componentOrder.slice(2).map((id, index) => {
          const item = createComponents(
            id,
            isEditing,
            isCreditEvaluation,
            informationItems
          );
          return (
            <DragContainer
              key={item.id}
              draggable={isEditing}
              onDragStart={(e) => handleDragStart(e, index + 2)}
              onDragOver={(e) => handleDragOver(e, index + 2)}
              onDrop={(e) => handleDrop(e, index + 2)}
              onDragLeave={handleDragLeave}
              width={item.width}
              height={item.height}
              className={draggedTo === index + 2 ? "dropArea" : ""}
              isEditing={isEditing}
            >
              {item.component}
            </DragContainer>
          );
        })}
      </BottomSide>
    </Container>
  );
};

export default MainPage;
