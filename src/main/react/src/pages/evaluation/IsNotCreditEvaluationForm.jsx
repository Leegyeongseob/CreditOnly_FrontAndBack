import styled from "styled-components";

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
  font-size: 20px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;

const IsNotCreditEvaluationForm = () => {
  return <CreditView>신용평가를 해주시기 바랍니다.</CreditView>;
};
export default IsNotCreditEvaluationForm;
