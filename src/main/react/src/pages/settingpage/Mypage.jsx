import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import SettingAxios from "../../axiosapi/SettingAxios";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";
import { useChatContext } from "../../contexts/ChatContext";
import ImportHelp from "./ImportHelp";
import { profileStorage } from "../../firebase/ProfileImgUpload";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { FaTrashAlt } from "react-icons/fa";
import MemberAxiosApi from "../../axiosapi/MemberAxiosApi";
import DoughnutChartComponent from "../../chart/DoughnutChartComponent";
import IsNotCreditEvaluationForm from "../evaluation/IsNotCreditEvaluationForm";
import {
  ConversationList,
  ConversationItem,
  DeleteButton,
} from "../help/ChatBotSideBarStyles"; // 스타일 파일을 가져옴

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TopSide = styled.div`
  width: 92%;
  height: 44%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  z-index: 11;
  @media screen and (max-width: 768px) {
    margin-top: 5%;
  }
`;

const UserProfile = styled.div`
  width: 37%;
  height: 91.5%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    height: 260px;
  }
`;

const UserImgBox = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

const UserImg = styled.div`
  width: 175px;
  height: 175px;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
`;
const ProfileCover = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border-radius: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;
const Label = styled.label`
  cursor: pointer;
  width: 8vw;
  height: 40px;
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;

  ${ProfileCover}:hover & {
    display: flex;
  }
`;
const Input = styled.input`
  display: none;
`;
const UserNameBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin-top: 5%;
  }
`;

const UserName = styled.div`
  width: 175px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 23px;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const UserInfo = styled.div`
  width: 60.6%;
  height: 92%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    height: 260px;
  }
`;

const InfoBox = styled.div`
  width: 90%;
  height: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const Info = styled.div`
  width: 100%;
  height: 20%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const InfoTitle = styled.div`
  width: 40%;
  font-size: 18px;
  padding-left: 5%;
  font-family: "Roboto-Regular", Helvetica;
  display: flex;
  justify-content: start;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
  @media screen and (max-width: 430px) {
    font-size: 13px;
  }
`;

const InfoContents = styled.div`
  width: 60%;
  padding-right: 5%;
  font-size: 18px;
  display: flex;
  justify-content: end;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 13px;
  }
  @media screen and (max-width: 430px) {
    font-size: 11px;
  }
`;

const BtnDiv = styled.div`
  width: 60%;
  padding-right: 4%;
  font-size: 18px;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const PwBtn = styled(Link)`
  width: 110px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto-Regular", Helvetica;
  font-size: 13px;
  font-weight: 400;
  background-color: ${({ theme }) => theme.commponent};
  color: #5a6acf;
  transition: background-color 0.5s ease;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
  @media screen and (max-width: 768px) {
    width: 90px;
    font-size: 11px;
  }
  @media screen and (max-width: 430px) {
    width: 70px;
    height: 25px;
    font-size: 9px;
  }
`;

const BottomSide = styled.div`
  width: 92%;
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    flex-direction: row;
    height: auto;
    margin-top: 5%;
  }
`;

const CreditView = styled.div`
  width: 37%;
  height: 88%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 260px;
    margin-bottom: 5%;
  }
`;

const ChatView = styled.div`
  width: 29.1%;
  height: 88%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 48%;
    height: 260px;
  }
`;

const LowSide = styled.div`
  width: 92%;
  height: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const UserDelBox = styled.div`
  width: 100%;
  height: 65%;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 60px;
    margin-top: 5%;
    margin-bottom: 5%;
  }
`;

const UserDel = styled.div`
  width: 40%;
  font-size: 18px;
  padding-left: 3%;
  font-family: "Roboto-Regular", Helvetica;
  display: flex;
  justify-content: start;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const UserDelBtn = styled(Link)`
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4%;
  font-family: "Roboto-Regular", Helvetica;
  font-size: 15px;
  font-weight: 400;
  background-color: ${({ theme }) => theme.sideBar};
  color: #5a6acf;
  transition: background-color 0.5s ease;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
  @media screen and (max-width: 768px) {
    width: 100px;
    font-size: 13px;
  }
`;

const ViewTitle = styled.div`
  width: 95%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 17px;
  font-weight: bolder;
  padding: 0 3% 0 3%;
`;

const ViewLink = styled(Link)`
  width: 60px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.sideBar};
  color: #5a6acf;
  transition: background-color 0.5s ease;
  text-decoration: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
  @media screen and (max-width: 768px) {
    width: 50px;
    font-size: 12px;
  }
`;
const ViewContents = styled.div`
  width: 95%;
  height: 76%;
  margin-top: 2%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Mypage = () => {
  const { email, imgUrl, setImgUrl, isCreditEvaluation } =
    useContext(UserEmailContext);
  const { conversations, deleteConversation, setCurrentConversation } =
    useChatContext();

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [imgData, setImgData] = useState("");

  const userProfileAxios = useCallback(
    async (emailData) => {
      const res = await MemberAxiosApi.searchProfileUrl(emailData);
      if (res.data !== "notExist") {
        setImgData(res.data);
        setImgUrl(res.data);
      }
    },
    [setImgUrl]
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await SettingAxios.getUserInfo(email);
        const { name, birthDate, joinDate } = response.data;
        setName(name);
        setBirthDate(birthDate);
        setJoinDate(joinDate);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
    userProfileAxios(email);
  }, [email, userProfileAxios]);

  //파일 업로드 이벤트 함수
  const AddImgBtnOnChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    // 선택된 파일을 즉시 업로드 후 DB에 다시 저장
    handleFileUpload(email, selectedFile);
  };

  const handleFileUpload = async (userEmail, saveFileData) => {
    const storageRef = ref(profileStorage, saveFileData.name);
    try {
      // 이미지 업로드
      await uploadBytesResumable(storageRef, saveFileData);
      console.log("File uploaded successfully!");

      // 이전 이미지가 있는 경우 삭제
      if (imgData && imgData !== "") {
        try {
          const oldFileRef = ref(profileStorage, imgData);
          await deleteObject(oldFileRef);
          console.log("Previous file deleted successfully!");
        } catch (error) {
          console.error("Error deleting previous file:", error);
          // 이전 파일이 이미 삭제된 경우라도 진행합니다.
        }
      }

      // 이미지 다운로드 및 저장
      const url = await getDownloadURL(storageRef);
      if (url) {
        setImgData(url);
        setImgUrl(url);
        const res = await MemberAxiosApi.profileUrlSave(userEmail, url);
        if (res.data === true) console.log("DB에 저장되었습니다.");
        else console.log("DB 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  const handleConversationClick = (conv) => {
    setCurrentConversation(conv);
    // 필요하다면 여기에 추가적인 로직을 넣을 수 있습니다.
  };
  return (
    <Container>
      <TopSide>
        <UserProfile>
          <UserImgBox>
            <UserImg imageurl={imgUrl}>
              <ProfileCover>
                <Label htmlFor="fileInput">Choose File</Label>
                <Input
                  id="fileInput"
                  type="file"
                  onChange={AddImgBtnOnChangeHandler}
                />
              </ProfileCover>
            </UserImg>
          </UserImgBox>
          <UserNameBox>
            <UserName>{name}</UserName>
          </UserNameBox>
        </UserProfile>
        <UserInfo>
          <InfoBox>
            <Info>
              <InfoTitle>이메일</InfoTitle>
              <InfoContents>{email}</InfoContents>
            </Info>
            <Info>
              <InfoTitle>생년월일</InfoTitle>
              <InfoContents>{birthDate}</InfoContents>
            </Info>
            <Info>
              <InfoTitle>비밀번호</InfoTitle>
              <BtnDiv>
                <PwBtn to="/findbypwd">비밀번호 변경</PwBtn>
              </BtnDiv>
            </Info>
            <Info>
              <InfoTitle>가입일</InfoTitle>
              <InfoContents>{joinDate}</InfoContents>
            </Info>
          </InfoBox>
        </UserInfo>
      </TopSide>
      <BottomSide>
        <CreditView>
          {isCreditEvaluation && <DoughnutChartComponent />}
          {!isCreditEvaluation && <IsNotCreditEvaluationForm />}
        </CreditView>
        <ChatView>
          <ViewTitle>
            문의내역
            <ViewLink to="/help">이동</ViewLink>
          </ViewTitle>
          <ViewContents>
            <ImportHelp />
          </ViewContents>
        </ChatView>
        <ChatView>
          <ViewTitle>
            챗봇내역
            <ViewLink to="/chat">이동</ViewLink>
          </ViewTitle>
          <ViewContents>
            <ConversationList>
              {conversations.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  onClick={() => handleConversationClick(conv)}
                >
                  대화 {new Date(conv.id).toLocaleString()}
                  <DeleteButton
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv.id);
                    }}
                  >
                    <FaTrashAlt />
                  </DeleteButton>
                </ConversationItem>
              ))}
            </ConversationList>
          </ViewContents>
        </ChatView>
      </BottomSide>
      <LowSide>
        <UserDelBox>
          <UserDel>회원탈퇴</UserDel>
          <UserDelBtn to={"/withdrawal"}>회원탈퇴</UserDelBtn>
        </UserDelBox>
      </LowSide>
    </Container>
  );
};
export default Mypage;
