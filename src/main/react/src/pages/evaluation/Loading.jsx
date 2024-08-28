import React from "react";
import styled from "styled-components";
import creditLoading from "../../img/Loading/creditLoading.gif";
// CreditView 컴포넌트
const CreditView = styled.div`
  width: ${({ creditInfo }) => (creditInfo ? "100%" : "48.8%")};
  height: ${({ creditInfo }) => (creditInfo ? "100%" : "93%")};
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 99.6%;
    height: 280px;
    margin-top: 4%;
  }
`;
const LoadingImg = styled.div`
  width: 70%;
  height: 70%;
  background-image: ${({ url }) => `url(${url})`}; /* 동적 URL 설정 */
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;

// Loading 텍스트 스타일
const LoadingText = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.primaryColor};
  font-weight: bold;
`;

const Loading = ({ creditInfo }) => {
  return (
    <CreditView creditInfo={creditInfo}>
      <LoadingImg url={creditLoading} />
      <LoadingText>잠시만 기다려주세요.</LoadingText>
    </CreditView>
  );
};

export default Loading;
