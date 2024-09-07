import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import rendingImg from "../../img/background/rendingimg.png";
import logo from "../../img/background/CreditOnlyLogo.png";

const Contain = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Header = styled.div`
  width: 100%;
  height: 13%;
  display: flex;
`;

const Body = styled.div`
  width: 100%;
  height: 87%;
  display: flex;
  padding: 5%;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const LogoDiv = styled.div`
  width: 60%;
  height: 100%;
  @media screen and (max-width: 500px) {
    width: 50%;
  }
`;
const Logo = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  background-image: url(${logo});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const ListDiv = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  @media screen and (max-width: 500px) {
    width: 50%;
  }
`;

const ListPage = styled.div`
  width: 50%;
  max-width: 200px;
  height: 100%;
  /* background-color: aqua; */
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    font-size: 19px;
    color: rgb(125, 106, 231);
  }
  @media screen and (max-width: 500px) {
    width: 50%;
  }
  @media screen and (max-width: 371px) {
    font-size: 15px;
  }
`;
const TextDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 768px) {
    padding: 5%;
  }
  & > .firstText {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 768px) {
      justify-content: flex-start;
    }
    & > p {
      font-size: clamp(30px, 4vw, 50px);
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.5; /* Adjusts spacing between lines */
      @media screen and (max-width: 371px) {
        font-size: 26px;
      }
    }
  }
  & > .secondText {
    width: 100%;
    font-size: 10px;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 768px) {
      justify-content: flex-start;
    }
    & > p {
      font-size: clamp(15px, 3vw, 20px);
      font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
      line-height: 2; /* Adjusts spacing between lines */
      @media screen and (max-width: 371px) {
        font-size: 16px;
      }
    }
  }
`;
const StartBtnDiv = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 17%;
  @media screen and (max-width: 768px) {
    height: 30%;
    justify-content: center;
    margin-left: 0%;
  }
`;
const StartBtn = styled.div`
  width: 180px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2dac6f;
  border-radius: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  cursor: pointer;
  &:hover {
    color: black;
  }
`;
const RendingImage = styled.div`
  width: 65%;
  height: 100%;
  background-image: url(${rendingImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 40%;
  }
`;
const BodyDiv = styled.div`
  width: 35%;
  height: 100%;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 60%;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;
const RendingPage = () => {
  const navigate = useNavigate();
  const AboutUs = () => {
    navigate("/aboutus");
  };
  const AdInquiry = () => {
    navigate("/AdInquiry");
  };
  return (
    <Contain>
      <Header>
        <LogoDiv>
          <Logo logo={logo} />
        </LogoDiv>
        <ListDiv>
          <ListPage onClick={AboutUs}>About us</ListPage>
          <ListPage advertisement={true} onClick={AdInquiry}>
            광고 문의
          </ListPage>
        </ListDiv>
      </Header>
      <Body>
        <BodyDiv>
          <TextDiv>
            <div className="firstText">
              <p>
                당신의 신용,
                <br />
                이제 더 명확하게
              </p>
            </div>
            <div className="secondText">
              <p>
                신용을 투명하게 관리하고 평가하세요.
                <br />
                데이터 기반으로 더 똑똑하게 신용을 이해하는 방법
              </p>
            </div>
            <StartBtnDiv>
              <StyledLink to="/login">
                <StartBtn>시작하기</StartBtn>
              </StyledLink>
            </StartBtnDiv>
          </TextDiv>
        </BodyDiv>
        <RendingImage></RendingImage>
      </Body>
    </Contain>
  );
};
export default RendingPage;
