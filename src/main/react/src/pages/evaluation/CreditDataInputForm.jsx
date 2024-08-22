import React, { useState, useContext } from "react";
import styled from "styled-components";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";
import { useNavigate } from "react-router-dom";
const FormContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const FormHeader = styled.div`
  width: 100%;
  height: 15%;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;
const HorizontalFormGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
`;
const SelectDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const FormGroupItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const FormGroupItemSelect = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.6rem;
`;
const FormContent = styled.div`
  padding: 1.5rem;
`;

const Alert = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #e1effe;
  border: 1px solid #bfdbfe;
  border-radius: 0.375rem;
  color: #1e40af;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
`;

const Input = styled.input`
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 1}, 1fr);
  gap: 0.5rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #e4e7f5;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #734cfd;
  }
`;
const ItemDetailBtn = styled.button`
  width: 100px;
  height: 35px;
  background-color: #e4e7f5;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 10px;

  &:hover {
    background-color: #734cfd;
  }
`;

const ItemsDetail = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const DetailTitle = styled.h3`
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const DetailItem = styled.div`
  margin-bottom: 15px;
`;

const DetailItemTitle = styled.h4`
  margin-bottom: 5px;
  font-weight: bold;
`;
const CreditDataInputForm = () => {
  const navigate = useNavigate();
  const { setIsCreditEvaluation,setIsLoading } = useContext(UserEmailContext);

  const [formData, setFormData] = useState({
    jobType: "",
    recentCreditAccounts: "",
    creditCardInstitutions: {
      year1: "",
      year2: "",
      year3: "",
    },
    unpaidLoans: {
      under5M3Months: "",
      under10M3Months: "",
      under5M6Months: "",
      under10M6Months: "",
      under5M1Year: "",
      under10M1Year: "",
    },
    loanExperience: {
      subrogation: "",
      writeOff: "",
      sale: "",
      debtRestructuring: "",
      bankruptcy: "",
      accelerationClause: "",
      transferTermination: "",
    },
    totalUnpaidLoans: "",
  });
  const [showDetails, setShowDetails] = useState(false);
  // 신용 평가하기 이벤트 핸들러
  const CreditEventOnClickHandler = () => {
    setIsCreditEvaluation(true);
    setIsLoading(true);
    navigate("/evaluation");
    
  };
  const handleInputChange = (category, field, value) => {
    setFormData((prevData) => {
      if (category === "creditCardInstitutions") {
        const newCreditCardInstitutions = {
          ...prevData.creditCardInstitutions,
        };
        if (field === "year3") {
          newCreditCardInstitutions.year2 = value;
          newCreditCardInstitutions.year1 = value;
        } else if (field === "year2") {
          newCreditCardInstitutions.year1 = value;
        }
        newCreditCardInstitutions[field] = value;
        return {
          ...prevData,
          creditCardInstitutions: newCreditCardInstitutions,
        };
      } else if (category === "unpaidLoans") {
        const newUnpaidLoans = { ...prevData.unpaidLoans };
        if (field === "under5M3Months") {
          newUnpaidLoans.under5M6Months = value;
          newUnpaidLoans.under5M1Year = value;
        } else if (field === "under5M6Months") {
          newUnpaidLoans.under5M1Year = value;
        } else if (field === "under10M3Months") {
          newUnpaidLoans.under10M6Months = value;
          newUnpaidLoans.under10M1Year = value;
        } else if (field === "under10M6Months") {
          newUnpaidLoans.under10M1Year = value;
        }
        newUnpaidLoans[field] = value;
        return { ...prevData, unpaidLoans: newUnpaidLoans };
      } else if (category === "loanExperience") {
        const newLoanExperience = { ...prevData.loanExperience };
        newLoanExperience[field] = value;
        return { ...prevData, loanExperience: newLoanExperience };
      } else if (category === "residence") {
        return { ...prevData, [category]: value };
      }

      return {
        ...prevData,
        [category]:
          typeof prevData[category] === "object"
            ? { ...prevData[category], [field]: value }
            : value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedData = Object.entries(formData).reduce(
      (acc, [key, value]) => {
        if (typeof value === "object") {
          acc[key] = Object.entries(value).reduce(
            (subAcc, [subKey, subValue]) => {
              subAcc[subKey] = subValue === "" ? 0 : Number(subValue);
              return subAcc;
            },
            {}
          );
        } else {
          acc[key] =
            value === "" ? 0 : key === "jobType" ? value : Number(value);
        }
        return acc;
      },
      {}
    );

    console.log("Processed form data:", processedData);
    // Here you would typically send the processedData to a server
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <FormContainer>
      <FormHeader>
        <Alert>
          <p>입력하지 않은 항목은 자동으로 0건으로 처리됩니다.</p>
        </Alert>
      </FormHeader>
      <FormContent>
        <Form onSubmit={handleSubmit}>
          <HorizontalFormGroup>
            <FormGroupItemSelect select={true}>
              <SelectDiv>
                <Label>직업 구분</Label>
                <Select
                  onChange={(e) =>
                    handleInputChange("jobType", null, e.target.value)
                  }
                >
                  <option value="">직업을 선택하세요</option>
                  <option value="1">급여소득자</option>
                  <option value="2">개인사업자</option>
                  <option value="3">연금소득자</option>
                  <option value="4">주부</option>
                  <option value="5">전문직</option>
                  <option value="7">프리랜서</option>
                  <option value="8">무직</option>
                  <option value="9">기타</option>
                </Select>
              </SelectDiv>
              <SelectDiv>
                <Label>거주지</Label>
                <Select
                  onChange={(e) =>
                    handleInputChange("residence", null, e.target.value)
                  }
                >
                  <option value="">거주지를 선택하세요</option>
                  <option value="경기">경기</option>
                  <option value="인천">인천</option>
                  <option value="충남">충남</option>
                  <option value="충북">충북</option>
                  <option value="울산">울산</option>
                  <option value="서울">서울</option>
                  <option value="경남">경남</option>
                  <option value="강원">강원</option>
                  <option value="광주">광주</option>
                  <option value="대구">대구</option>
                  <option value="경북">경북</option>
                  <option value="대전">대전</option>
                  <option value="부산">부산</option>
                  <option value="전북">전북</option>
                  <option value="제주">제주</option>
                  <option value="전남">전남</option>
                  <option value="세종">세종</option>
                  <option value="충청">충청</option>
                  <option value="전라">전라</option>
                </Select>
              </SelectDiv>
            </FormGroupItemSelect>
            <FormGroupItem>
              <Label>최근 5년내 미해지 신용개설 총 건수</Label>
              <Input
                type="number"
                min="0"
                onChange={(e) =>
                  handleInputChange(
                    "recentCreditAccounts",
                    null,
                    e.target.value
                  )
                }
              />
            </FormGroupItem>
            <FormGroupItem>
              <Label>미상환 대출 총 건수</Label>
              <Input
                type="number"
                min="0"
                onChange={(e) =>
                  handleInputChange("totalUnpaidLoans", null, e.target.value)
                }
              />
            </FormGroupItem>
          </HorizontalFormGroup>

          <FormGroup>
            <Label>최근 신용카드 개설 기관 수</Label>
            <GridContainer columns={3}>
              <Input
                type="number"
                min="0"
                placeholder="1년내"
                value={formData.creditCardInstitutions.year1}
                onChange={(e) =>
                  handleInputChange(
                    "creditCardInstitutions",
                    "year1",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                min="0"
                placeholder="2년내"
                value={formData.creditCardInstitutions.year2}
                onChange={(e) =>
                  handleInputChange(
                    "creditCardInstitutions",
                    "year2",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                min="0"
                placeholder="3년내"
                value={formData.creditCardInstitutions.year3}
                onChange={(e) =>
                  handleInputChange(
                    "creditCardInstitutions",
                    "year3",
                    e.target.value
                  )
                }
              />
            </GridContainer>
          </FormGroup>

          <FormGroup>
            <Label>미상환 대출 건수</Label>
            <GridContainer columns={2}>
              <Input
                type="number"
                min="0"
                placeholder="3개월내 500만원 미만"
                value={formData.unpaidLoans.under5M3Months}
                onChange={(e) =>
                  handleInputChange(
                    "unpaidLoans",
                    "under5M3Months",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                min="0"
                placeholder="3개월내 1000만원 미만"
                value={formData.unpaidLoans.under10M3Months}
                onChange={(e) =>
                  handleInputChange(
                    "unpaidLoans",
                    "under10M3Months",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                min="0"
                placeholder="6개월내 500만원 미만"
                value={formData.unpaidLoans.under5M6Months}
                onChange={(e) =>
                  handleInputChange(
                    "unpaidLoans",
                    "under5M6Months",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                min="0"
                placeholder="6개월내 1000만원 미만"
                value={formData.unpaidLoans.under10M6Months}
                onChange={(e) =>
                  handleInputChange(
                    "unpaidLoans",
                    "under10M6Months",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                min="0"
                placeholder="1년내 500만원 미만"
                value={formData.unpaidLoans.under5M1Year}
                onChange={(e) =>
                  handleInputChange(
                    "unpaidLoans",
                    "under5M1Year",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                min="0"
                placeholder="1년내 1000만원 미만"
                value={formData.unpaidLoans.under10M1Year}
                onChange={(e) =>
                  handleInputChange(
                    "unpaidLoans",
                    "under10M1Year",
                    e.target.value
                  )
                }
              />
            </GridContainer>
          </FormGroup>

          <FormGroup>
            <Label>최근 12개월내 대출 경험 총 건수</Label>
            <GridContainer columns={2}>
              <Input
                type="number"
                min="0"
                placeholder="대위변제"
                onChange={(e) =>
                  handleInputChange(
                    "loanExperience",
                    "subrogation",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                min="0"
                placeholder="상각"
                onChange={(e) =>
                  handleInputChange(
                    "loanExperience",
                    "writeOff",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                min="0"
                placeholder="매각"
                onChange={(e) =>
                  handleInputChange("loanExperience", "sale", e.target.value)
                }
              />
              <Input
                type="number"
                min="0"
                placeholder="채무재조정"
                onChange={(e) =>
                  handleInputChange(
                    "loanExperience",
                    "debtRestructuring",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                min="0"
                placeholder="파산"
                onChange={(e) =>
                  handleInputChange(
                    "loanExperience",
                    "bankruptcy",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                min="0"
                placeholder="기한이익상실"
                onChange={(e) =>
                  handleInputChange(
                    "loanExperience",
                    "accelerationClause",
                    e.target.value
                  )
                }
              />
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  type="number"
                  min="0"
                  placeholder="양도해지"
                  onChange={(e) =>
                    handleInputChange(
                      "loanExperience",
                      "transferTermination",
                      e.target.value
                    )
                  }
                />
                <ItemDetailBtn onClick={toggleDetails}>설명보기</ItemDetailBtn>
              </div>
            </GridContainer>
          </FormGroup>

          <SubmitButton type="submit" onClick={CreditEventOnClickHandler}>
            신용 평가하기
          </SubmitButton>
        </Form>
      </FormContent>

      {showDetails && (
        <ItemsDetail>
          <CloseButton onClick={toggleDetails}>&times;</CloseButton>
          <DetailTitle>대출 경험 항목 설명</DetailTitle>
          <DetailItem>
            <DetailItemTitle>대위변제:</DetailItemTitle>
            <p>
              보증인이 주채무자를 대신하여 채무를 변제하는 것을 말합니다. 예를
              들어, 친구의 대출 보증인이 되었는데 친구가 갚지 못하면 보증인이
              대신 갚는 경우입니다.
            </p>
          </DetailItem>
          <DetailItem>
            <DetailItemTitle>상각:</DetailItemTitle>
            <p>
              회수가 불가능한 채권을 장부에서 제거하는 회계 처리를 말합니다.
              은행이 돈을 회수할 수 없다고 판단하면 해당 대출을 손실로
              처리합니다.
            </p>
          </DetailItem>
          <DetailItem>
            <DetailItemTitle>매각:</DetailItemTitle>
            <p>
              금융기관이 보유한 채권을 다른 기관에 파는 것을 의미합니다. 주로
              부실채권을 전문 추심업체에 팔아 일부라도 회수하려는 목적으로
              이루어집니다.
            </p>
          </DetailItem>
          <DetailItem>
            <DetailItemTitle>채무재조정:</DetailItemTitle>
            <p>
              채무자의 상환 능력을 고려해 기존 채무 조건을 변경하는 것입니다.
              이자율 낮추기, 상환 기간 연장 등이 포함될 수 있습니다.
            </p>
          </DetailItem>
          <DetailItem>
            <DetailItemTitle>파산:</DetailItemTitle>
            <p>
              채무자가 빚을 갚을 수 없는 상태에서 법원에 파산을 신청하고
              인정받는 것입니다. 파산 선고를 받으면 채무의 법적 변제 의무가
              면제됩니다.
            </p>
          </DetailItem>
          <DetailItem>
            <DetailItemTitle>기한이익상실:</DetailItemTitle>
            <p>
              채무자가 약정한 기한 전에 채무 상환 의무가 발생하는 것을 말합니다.
              예를 들어, 대출금을 3개월 연체하면 남은 기간에 상관없이 전체
              대출금을 즉시 상환해야 할 수 있습니다.
            </p>
          </DetailItem>
          <DetailItem>
            <DetailItemTitle>양도해지:</DetailItemTitle>
            <p>
              채권자가 제3자에게 채권을 양도하고 기존 계약을 해지하는 것을
              의미합니다. 주로 금융기관이 채권을 다른 기관에 넘기고 해당
              고객과의 관계를 정리할 때 사용됩니다.
            </p>
          </DetailItem>
        </ItemsDetail>
      )}
    </FormContainer>
  );
};

export default CreditDataInputForm;
