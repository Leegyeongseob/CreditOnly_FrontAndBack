import styled, { keyframes } from "styled-components";

// 애니메이션 정의
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px; // 카드 간의 간격을 더 넓게 설정 (웹에서 넓은 간격)
  padding: 50px; // 카드 컨테이너에 여유 공간 추가
  width: 100%;
  max-width: 1200px; // 카드 컨테이너의 최대 너비 설정
  margin: 0 auto; // 중앙 정렬
  visibility: hidden; // 카드 컨테이너는 감추기
`;

export const CardContainer = styled.div`
  width: 400px; // 웹에서 카드의 너비를 크게 조정
  height: 250px; // 카드의 높이도 크게 조정
  background: rgba(255, 255, 255, 0.2); // 약간 더 짙은 투명도
  border-radius: 15px; // 약간 둥근 모서리로 고급스러운 느낌 제공
  backdrop-filter: blur(8px); // 유리 효과로 깔끔한 느낌
  -webkit-backdrop-filter: blur(8px); // 사파리 브라우저 지원
  border: 1px solid rgba(255, 255, 255, 0.2); // 테두리 설정
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 은은한 쉐도우로 고급스러움 강조
  transition: transform 0.3s ease, box-shadow 0.3s ease; // 부드러운 애니메이션
  animation: ${fadeInUp} 0.7s ease forwards; // 로드 시 애니메이션
  visibility: visible; // 개별 카드들은 보이도록 설정

  &:hover {
    transform: translateY(-5px); // 살짝 떠오르는 효과
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); // 호버 시 더 깊은 쉐도우
  }

  @media screen and (max-width: 768px) {
    width: calc(50% - 20px); // 작은 화면에서 카드 크기 조정
    height: 180px;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    height: 160px;
  }
`;

export const CardText = styled.div`
  color: #000; // 텍스트 색상을 짙게 설정 (짙은 검은색)
  font-size: 20px; // 카드 크기에 맞게 텍스트 크기 확대
  font-weight: 600; // 글자 두께를 더 두껍게 설정
  text-align: center;
  padding: 0 15px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
