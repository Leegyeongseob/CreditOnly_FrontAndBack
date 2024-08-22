import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackAUimage from "../../img/aboutUs/AboutUsima.png";
import Face2 from "../../img/aboutUs/KakaoTalk_20240812_100533407.jpg";
import Face5 from "../../img/aboutUs/KakaoTalk_20240812_100533407_01.jpg";
import Face4 from "../../img/aboutUs/KakaoTalk_20240812_100533407_02.jpg";
import Face3 from "../../img/aboutUs/KakaoTalk_20240812_100533407_03.jpg";
import Face1 from "../../img/aboutUs/KakaoTalk_20240812_100533407_04.jpg";
import Face6 from "../../img/aboutUs/KakaoTalk_20240812_100533407_05.jpg";

const Basic = styled.div`
  width: 100%;
  height: 500vh;
  overflow-x: hidden;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Top = styled.div`
  width: 100%;
  height: 5%;
  max-height: 30px;
  background-color: #cbcda9;
`;
const HACBtnWrap = styled.div`
  width: 100%;
  height: 10%;
  max-height: 60px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
`;
const HACBtn = styled.div`
  width: 20%;
  max-width: 100px;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 15px;
  cursor: pointer;
  user-select: none;
`;
const AUImage = styled.div`
  background-image: url(${BackAUimage});
  width: 100%;
  height: 40%;
  max-height: 400px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const ImageTextBox = styled.div`
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10%;
`;
const ImageTextTop = styled.div`
  font-size: 40px;
  color: white;
  font-weight: bold;
  font-family: "Times New Roman", Times, serif;
`;
const ImageTextDetail = styled.div`
  font-size: 20px;
  color: white;
`;
const IntroBox = styled.div`
  width: 100%;
  max-width: 1300px;
  overflow-x: hidden;
  height: 100%;
  flex-direction: column;
  display: flex;
`;
const IntroTop = styled.div`
  color: black;
  font-size: 25px;
  height: 4%;
  width: 100%;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const IntroFDWrap = styled.div`
  width: 100%;
  height: 16%;
  display: flex;
  justify-content: center;
  display: flex;
  overflow-x: hidden;
  align-items: center;
`;
const IntroDetail = styled.div`
  width: 60%;
  height: 40%;
  color: black;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 10%;
  padding-right: 10%;
`;
const DetailTilte = styled.div`
  width: 100%;
  height: 30%;
  font-size: 30px;
  display: flex;
  justify-content: start;
  align-items: center;
  font-weight: bold;
  word-wrap: break-word; /* 단어가 길 경우 줄바꿈 */
  word-break: break-all; /* 긴 단어가 있을 경우 줄바꿈 */
  white-space: normal; /* 텍스트 줄바꿈 허용 */
`;
const DetailDetail = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: start;
  align-items: start;
  font-size: 20px;
  word-wrap: break-word; /* 단어가 길 경우 줄바꿈 */
  word-break: break-all; /* 긴 단어가 있을 경우 줄바꿈 */
  white-space: normal; /* 텍스트 줄바꿈 허용 */
`;

const Face135 = styled.div`
  width: 40%;
  height: 100%;
  background-size: contain;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center;
  align-items: center;
  display: flex;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
`;
const Face246 = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
`;
const AboutUs = () => {
  const navigate = useNavigate();
  const GoHome = () => {
    navigate("/");
  };
  const GoAboutUs = () => {
    navigate("/aboutus");
  };
  return (
    <Basic>
      <Top></Top>
      <HACBtnWrap>
        <HACBtn onClick={GoHome}>HOME</HACBtn>
        <HACBtn onClick={GoAboutUs}>ABOUT US</HACBtn>
        <HACBtn
          onClick={() => {
            navigate("/adinquiry");
          }}
        >
          CONTACT
        </HACBtn>
      </HACBtnWrap>
      <AUImage>
        <ImageTextBox>
          <ImageTextTop>ABOUT US</ImageTextTop>
          <ImageTextDetail>
            가격은 당신이 지불하는 것이다. 가치는 당신이 얻는 것이다
          </ImageTextDetail>
        </ImageTextBox>
      </AUImage>
      <IntroBox>
        <IntroTop>Our Crew </IntroTop>
        <IntroFDWrap>
          <Face135 backgroundImage={Face1}></Face135>
          <IntroDetail>
            <DetailTilte>George Washington</DetailTilte>
            <DetailDetail>99%의 실패는 변명하는 자들로부터 온다</DetailDetail>
          </IntroDetail>
        </IntroFDWrap>
        <IntroFDWrap>
          <IntroDetail>
            <DetailTilte>Thomas Jefferson</DetailTilte>
            <DetailDetail>솔직함은 지혜라는 책의 첫 장이다</DetailDetail>
          </IntroDetail>
          <Face246 backgroundImage={Face2}></Face246>
        </IntroFDWrap>
        <IntroFDWrap>
          <Face135 backgroundImage={Face3}></Face135>
          <IntroDetail>
            <DetailTilte>James Monroe</DetailTilte>
            <DetailDetail>
              약간의 칭찬은 오랜 고생을 버틸 수 있게 한다
            </DetailDetail>
          </IntroDetail>
        </IntroFDWrap>
        <IntroFDWrap>
          <IntroDetail>
            <DetailTilte>John Quincy Adams</DetailTilte>
            <DetailDetail>
              시도하고 실패하라. 단 실패하려 하지는 말고
            </DetailDetail>
          </IntroDetail>
          <Face246 backgroundImage={Face4}></Face246>
        </IntroFDWrap>
        <IntroFDWrap>
          <Face135 backgroundImage={Face5}></Face135>
          <IntroDetail>
            <DetailTilte>Martin Van Buren</DetailTilte>
            <DetailDetail>
              옳은 일을 하는 것이 왜 하지 않았나 변명하는 것보다 쉽다
            </DetailDetail>
          </IntroDetail>
        </IntroFDWrap>
        <IntroFDWrap>
          <IntroDetail>
            <DetailTilte>Abraham Lincoln</DetailTilte>
            <DetailDetail>나는 천천히 걷지만 뒤로 가지는 않는다</DetailDetail>
          </IntroDetail>
          <Face246 backgroundImage={Face6}></Face246>
        </IntroFDWrap>
      </IntroBox>
    </Basic>
  );
};

export default AboutUs;
