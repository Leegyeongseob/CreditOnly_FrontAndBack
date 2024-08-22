import styled from "styled-components";
import Ad1 from "../../img/mainImg/Ad1.png";
import Ad2 from "../../img/mainImg/Ad2.png";
import Ad3 from "../../img/mainImg/Ad3.png";
import Ad4 from "../../img/mainImg/Ad4.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  .swiper-pagination {
    padding: 1px;
  }
  .swiper-pagination-bullet {
    background: #8290ee; // 페이지네이션 점 색상 변경
    width: 0.5vw;
    height: 1vh;
    &:hover {
      opacity: 0.7;
    }
  }
  .swiper-button-next,
  .swiper-button-prev {
    color: #8290ee; // 네비게이션 버튼 색상 변경
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
  /* transition: background-color 0.5s ease; */
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.overlay}; /* 다크 모드의 오버레이 색상 */
    transition: background-color 0.5s ease;
    pointer-events: none; /* Ensure it does not interfere with mouse events */
  }
`;

const Banner = () => {
  return (
    <StyledSwiper
      key="swiper"
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      modules={[Navigation, Pagination, Autoplay]}
    >
      <Slide imageurl={Ad1} />
      <Slide imageurl={Ad2} />
      <Slide imageurl={Ad3} />
      <Slide imageurl={Ad4} />
    </StyledSwiper>
  );
};
export default Banner;
