import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CreditGradeRadarChart from "../../chart/CreditGradeRadarChart";
import ResidentPieChart from "../../chart/ResidentStackedBarChart";
import CreditScoreScatterChart from "../../chart/CreditScoreScatterChart ";
import JobDefaultLoanPieChart from "../../chart/JobDefaultLoanPieChart";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  @media screen and (max-width: 768px) {
    justify-content: flex-start;
    height: 1400px;
    margin-top: 10px;
  }
`;

const BtnDiv = styled.div`
  width: 100%;
  height: 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    margin-top: 4%;
    height: 45px;
  }
`;

const ViewDiv = styled.div`
  width: 92%;
  height: 42%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    height: 38%;
    justify-content: center;
    flex-direction: column;
  }
`;

const EvaluationBtn = styled.div`
  width: ${({ visualization }) => (visualization ? "40px" : "20xp")};
  font-size: ${({ visualization }) => (visualization ? "15px" : "20px")};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  margin-right: 30px;
  transition: transform 0.3s ease; /* 애니메이션 효과를 부드럽게 하기 위한 전환 효과 */
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const CrediEvaluation = styled.div`
  width: 92%;
  height: 90%;
  z-index: 11;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  &:hover ${EvaluationBtn} {
    transform: translateX(
      10px
    ); /* 부모 요소에 호버 시 버튼을 오른쪽으로 10px 이동 */
    color: #8290ee; /* 버튼 텍스트 색상 변경 */
  }
  @media screen and (max-width: 768px) {
    height: 100%;
  }
`;

const CreditView = styled.div`
  width: 48.8%;
  height: 85%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 99.6%;
    height: 280px;
    margin-top: 4%;
  }
`;
const CreditBtmView = styled.div`
  width: 48.8%;
  height: 100%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 99.6%;
    height: 280px;
    margin-top: 4%;
  }
`;
const BackBtn = styled.div`
  width: 150px;
  font-size: 20px;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
  padding: 10px;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const DataVisualization = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <BtnDiv>
        <CrediEvaluation
          onClick={() => {
            navigate(-1);
          }}
        >
          <BackBtn>뒤로</BackBtn>
          <EvaluationBtn> &gt;&gt;</EvaluationBtn>
        </CrediEvaluation>
      </BtnDiv>
      <ViewDiv>
        <CreditView>
          <CreditScoreScatterChart />
        </CreditView>
        <CreditView>
          <JobDefaultLoanPieChart />
        </CreditView>
      </ViewDiv>
      <ViewDiv>
        <CreditBtmView>
          <CreditGradeRadarChart />
        </CreditBtmView>
        <CreditBtmView>
          <ResidentPieChart />
        </CreditBtmView>
      </ViewDiv>
    </Container>
  );
};
export default DataVisualization;
