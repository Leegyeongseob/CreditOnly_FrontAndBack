import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import HelpAxios from "../../axiosapi/HelpAxios";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  .swiper-pagination {
    padding: 1px;
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: darkgray; // 네비게이션 버튼 색상 변경
    &:hover {
      opacity: 0.6;
    }
  }

  .swiper-button-next:after,
  .swiper-button-prev:after {
    font-size: 1.2rem;
    @media screen and (max-width: 430px) {
      font-size: 0.8rem;
    }
  }
`;

const Slide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  border-radius: 10px;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none; /* Ensure it does not interfere with mouse events */
  }
`;

const ListContents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentTitle = styled.div`
  width: 95%;
  height: 15%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  padding-left: 4%;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  letter-spacing: 1.5px;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  @media screen and (max-width: 1200px) {
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;

const Contents = styled.div`
  width: 95%;
  height: 88%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 18px;
  border-radius: 10px;
  letter-spacing: 1.5px; /* 글자 간격 설정 */
  line-height: 1.3; /* 줄 간격 설정 */
  padding: 5%;
  margin-top: 2%;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
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
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  @media screen and (max-width: 768px) {
    font-size: 9px;
  }
`;

const ImportHelp = () => {
  const { email } = useContext(UserEmailContext);
  const [recentHelpRequests, setRecentHelpRequests] = useState([]);

  useEffect(() => {
    const fetchRecentHelpRequests = async () => {
      try {
        const response = await HelpAxios.getHelpRequests(email);
        const sortedRequests = response.data
          .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
          .slice(0, 4); // 최근 4개의 문의 가져오기
        setRecentHelpRequests(sortedRequests);
      } catch (error) {
        console.error("문의 내역을 불러오는데 실패했습니다.", error);
      }
    };

    fetchRecentHelpRequests();
  }, []);
  return (
    <StyledSwiper
      key="swiper"
      spaceBetween={10}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 5000 }}
      modules={[Navigation, Autoplay]}
    >
      {recentHelpRequests.length > 0 ? (
        recentHelpRequests.map((help) => (
          <Slide key={help.id}>
            <ListContents>
              <ContentTitle>
                {help.title.length > 10
                  ? `${help.title.substring(0, 10)}...`
                  : help.title}
              </ContentTitle>
              <ContentTime>{help.createdDate}</ContentTime>
              <Contents>
                {help.contents.length > 50
                  ? `${help.contents.substring(0, 50)}...`
                  : help.contents}
              </Contents>
            </ListContents>
          </Slide>
        ))
      ) : (
        <Slide>
          <Contents>문의 내역이 없습니다.</Contents>
        </Slide>
      )}
    </StyledSwiper>
  );
};
export default ImportHelp;
