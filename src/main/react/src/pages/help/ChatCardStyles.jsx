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
  flex-direction: column; /* 카드들이 세로로 쌓이도록 설정 */
  align-items: center; /* 카드들을 가운데 정렬 */
  justify-content: center; /* 수직 중앙 정렬 */
  gap: 20px; /* 카드 간의 간격 */
  width: 100%;
  max-width: 500px; /* 너비를 제한하여 중앙에 정렬 */
  margin: 0 auto; /* 가로 중앙 정렬 */
  padding: 50px 0; /* 상하 여백을 줘서 화면 중앙에 위치 */
  box-sizing: border-box;
  min-height: 100%; /* 화면의 세로 중앙에 위치하도록 */

  @media screen and (max-width: 768px) {
    max-width: 90%; /* 작은 화면에서 너비를 조정 */
    padding: 50px 20px; /* 상하 여백 유지 */
  }

  @media screen and (max-width: 480px) {
    max-width: 100%; /* 더 작은 화면에서도 전체 너비 사용 */
    padding: 30px 15px; /* 여백을 조금 줄임 */
  }
`;

export const CardContainer = styled.div`
  width: 100%; /* 카드가 부모 요소의 너비를 가득 채우도록 설정 */
  max-width: 400px; /* 웹에서 카드의 최대 너비 제한 */
  height: 180px;
  background-color: ${({ isDarkMode }) =>
    isDarkMode ? "#6470bea1" : "rgba(255, 255, 255, 0.2)"};
  border-radius: 15px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.4s ease, box-shadow 0.4s ease,
    background-color 0.4s ease;
  text-align: center;

  &:hover {
    transform: scale(1.05) rotate(1deg); /* 카드가 커지면서 살짝 회전 */
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3);
    background-color: ${({ isDarkMode }) =>
      isDarkMode
        ? "#8299ffbc"
        : "rgba(255, 255, 255, 0.2)"}; /* 배경색 약간 변경 */
  }

  @media screen and (max-width: 768px) {
    width: 100%; /* 작은 화면에서는 가로로 꽉 채움 */
    height: 150px; /* 카드 높이 줄임 */
  }

  @media screen and (max-width: 480px) {
    width: 100%; /* 작은 화면에서 가로로 꽉 채움 */
    height: 130px; /* 더 작은 화면에서는 높이 더 줄임 */
  }
`;

export const CardText = styled.div`
  color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#000")};
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  padding: 0 15px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }

  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;
