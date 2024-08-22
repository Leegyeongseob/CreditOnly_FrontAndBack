import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CreditScoreChart from "../../chart/CreditScoreChart";
import CreditGradeBarChart from "../../chart/CreditGradeBarChart";
import { useEffect, useContext, useState } from "react";
import CreditScore from "../../img/evaluation/creditScore.png";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";
import IsNotCreditEvaluationForm from "./IsNotCreditEvaluationForm";
import Loading from "./Loading";
import Modal from "../../common/utils/ImageModal";
import NotCreditInput from "../../img/evaluation/not-creditInput.gif";
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
  @media screen and (max-width: 768px) {
    height: 38%;
    justify-content: center;
    flex-direction: column;
  }
`;

const EvaluationBtn = styled.div`
  width: ${({ visualization }) => (visualization ? "30px" : "20xp")};
  font-size: ${({ visualization }) => (visualization ? "15px" : "20px")};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
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
  height: 93%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
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
    width: 99.6%;
    height: 280px;
    margin-top: 4%;
  }
`;
const TextEvaluation = styled.div`
  width: ${({ positionfirst }) => (positionfirst ? "280px" : "110px")};
  font-size: 15px;
  height: 100%;
  display: flex;
  justify-content: ${({ positionfirst }) =>
    positionfirst ? "flex-end" : "flex-start"};
  align-items: center;
  padding: 10px;
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;
const MyEvaluation = styled.div`
  width: 200px;
  font-size: 20px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
const CreditText = styled.div`
  width: 100%;
  height: 1vw;
  font-size: 1vw;
  font-weight: 600;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChartDiv = styled.div`
  width: 80%;
  height: 80%;
`;
const CreditLongView = styled.div`
  width: 99.6%;
  height: 93%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: ${({ url }) => `url(${url})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media screen and (max-width: 768px) {
    justify-content: flex-start;
    width: 99.6%;
    height: 93%;
  }
`;
const Evaluation = () => {
  const { isCreditEvaluation, isLoading, setIsLoading } =
    useContext(UserEmailContext);
  const navigate = useNavigate();
  // 모달 해더
  const [headerContents, SetHeaderContents] = useState("");
  // 모달 내용
  const [modalContent, setModalContent] = useState("");
  //팝업 처리
  const [modalOpen, setModalOpen] = useState(false);
  //코드 모달 확인
  const codeModalOkBtnHandler = () => {
    closeModal();
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const visualizationOnclickHandler = () => {
    if (isCreditEvaluation) {
      navigate("/data-visualization");
    } else {
      setModalOpen(true);
      SetHeaderContents("신용평가필요");
      setModalContent("신용평가를 해야합니다.");
    }
  };
  useEffect(() => {
    // 로딩 상태를 5초 후에 false로 변경
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Container>
      <Modal
        open={modalOpen}
        header={headerContents}
        type={true}
        confirm={codeModalOkBtnHandler}
        img={NotCreditInput}
      >
        {modalContent}
      </Modal>
      <BtnDiv>
        <CrediEvaluation
          onClick={() => {
            navigate("/credit-data-input");
          }}
        >
          <MyEvaluation>나의 신용 평가하기</MyEvaluation>
          <EvaluationBtn> &gt;&gt;</EvaluationBtn>
        </CrediEvaluation>
      </BtnDiv>
      <ViewDiv>
        {isCreditEvaluation &&
          (isLoading ? (
            <Loading />
          ) : (
            <CreditView>
              <ChartDiv>
                <CreditScoreChart />
              </ChartDiv>
              <CreditText>이 결과는 사실과 다를 수 있습니다.</CreditText>
            </CreditView>
          ))}
        {!isCreditEvaluation && (
          <CreditView>
            <IsNotCreditEvaluationForm />
          </CreditView>
        )}
        <CreditView>
          <ChartDiv>
            <CreditGradeBarChart />
          </ChartDiv>
        </CreditView>
      </ViewDiv>
      <BtnDiv>
        <CrediEvaluation onClick={visualizationOnclickHandler}>
          <TextEvaluation positionfirst={true}>
            다양한 시각화를 추가로 확인하고 싶으시면
          </TextEvaluation>
          <EvaluationBtn visualization={true}> 여기</EvaluationBtn>
          <TextEvaluation positionfirst={false}>를 눌러주세요.</TextEvaluation>
        </CrediEvaluation>
      </BtnDiv>
      <ViewDiv>
        <CreditLongView url={CreditScore} />
      </ViewDiv>
    </Container>
  );
};
export default Evaluation;
