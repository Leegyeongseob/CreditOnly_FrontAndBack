import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AnnouncementAxios from "../../axiosapi/AnnouncementAxios";

const Contain = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media screen and (max-width: 1200px) {
    height: 1400px;
    flex-direction: column;
  }
`;
const Aside = styled.div`
  width: 27%;
  height: 90%;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  @media screen and (max-width: 1200px) {
    width: 95%;
    height: 430px;
  }
`;
const Title = styled.div`
  width: 100%;
  height: 8%;
  padding-left: 10%;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  @media screen and (max-width: 1200px) {
    padding-left: 5%;
    margin-top: 2%;
    font-size: 18px;
    height: 6%;
  }
`;

const ListItemDiv = styled.div`
  width: 100%;
  height: 21%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ListItem = styled.div`
  width: 86%;
  height: 80%;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  @media screen and (max-width: 1200px) {
    width: 95%;
    height: 85%;
  }
`;

const ItemDate = styled.div`
  width: 100%;
  height: 15%;
  font-size: 14px;
  padding-right: 5%;
  padding-top: 1.8%;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 1200px) {
    height: 25%;
    padding-top: 1%;
  }
`;

const ItemTitle = styled.div`
  width: 100%;
  height: 30%;
  font-size: max(13px, 1.3vw);
  font-weight: 600;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5%;
  @media screen and (max-width: 1200px) {
    padding-left: 5%;
    font-size: 14px;
    justify-content: flex-start;
    height: 15%;
  }
`;

const ItemContent = styled.div`
  width: 100%;
  height: 60%;
  font-size: max(13px, 1vw);
  display: flex;
  justify-content: flex-start;
  align-items: start;
  letter-spacing: 1.4px;
  line-height: 1.1;
  padding-left: 5%;
  @media screen and (max-width: 1200px) {
    height: 55%;
    padding-top: 1%;
    font-size: 14px;
    justify-content: flex-start;
    letter-spacing: 1.5px;
    line-height: 1.1;
  }
`;

const MoreBtnDiv = styled.div`
  width: 100%;
  height: 8%;
  padding-left: 10%;
  font-size: 20px;
  font-weight: 600;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 1200px) {
    padding-left: 0;
    padding-right: 2%;
    justify-content: flex-end;
    height: 6%;
    font-size: 13px;
  }
`;
const MoreBtnArrow = styled.div`
  width: 30px;
  height: 100%;
  font-size: 20px;
  display: flex;

  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease; /* 애니메이션 효과를 부드럽게 하기 위한 전환 효과 */
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
`;

const MoreBtn = styled.div`
  width: 100%;
  height: 100%;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media screen and (max-width: 1200px) {
    justify-content: flex-end;
    width: 60%;
    font-size: 14px;
  }
`;

const MoreBtnAndArrowDiv = styled.div`
  width: 30%;
  max-width: 200px;
  /* background-color: aqua; */
  height: auto;
  display: flex;
  &:hover ${MoreBtnArrow} {
    transform: translateX(
      90%
    ); /* 부모 요소에 호버 시 버튼을 오른쪽으로 10px 이동 */
    color: #8290ee; /* 버튼 텍스트 색상 변경 */
  }
  @media screen and (max-width: 1200px) {
    width: 20%;
  }
`;

const MoreBtnEmptyDiv = styled.div`
  width: 60%;
  height: 100%;
  /* background-color: chartreuse; */
`;

const ModifiedTag = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.color};
  margin-left: 5px;
  white-space: nowrap;
  @media screen and (max-width: 1200px) {
    font-size: 10px;
  }
`;

const AnnouncementMain = () => {
  // 너무 길 경우 ...으로 생략하는 함수
  const truncateContents = (text) => {
    return text.length > 50 ? text.slice(0, 50) + "..." : text;
  };

  const [newsNotices, setNewsNotices] = useState([]);
  const [eventNotices, setEventNotices] = useState([]);
  const [pressNotices, setPressNotices] = useState([]);
  const navigate = useNavigate();

  const fetchNotices = async () => {
    try {
      // Fetch notices for each classTitle
      const newsResponse = await AnnouncementAxios.getNoticesByClassTitle(
        "news"
      );
      const eventResponse = await AnnouncementAxios.getNoticesByClassTitle(
        "event"
      );
      const pressResponse = await AnnouncementAxios.getNoticesByClassTitle(
        "press"
      );

      // Sort by createdDate if necessary and slice the latest 4
      const sortAndSlice = (data) => {
        return data
          .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))
          .slice(0, 4);
      };

      setNewsNotices(sortAndSlice(newsResponse.data));
      setEventNotices(sortAndSlice(eventResponse.data));
      setPressNotices(sortAndSlice(pressResponse.data));
    } catch (error) {
      console.error("Failed to fetch notices", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleRowClick = (classTitle) => {
    navigate(`/announcement/${classTitle}`);
  };

  const handleDetailsClick = (classTitle, notice) => {
    navigate(`/announcement/${classTitle}/${notice.id}`, { state: { notice } });
  };

  return (
    <Contain>
      <Aside>
        <Title onClick={() => handleRowClick("news")}>새 소식</Title>
        {newsNotices.map((notice) => (
          <ListItemDiv
            key={notice.id}
            onClick={() => handleDetailsClick("news", notice)}
          >
            <ListItem>
              <ItemDate>{notice.createdDate}</ItemDate>
              <ItemTitle>
                {notice.title.replace(" (수정)", "")}
                {notice.title.includes("(수정)") && (
                  <ModifiedTag>(수정)</ModifiedTag>
                )}
              </ItemTitle>
              <ItemContent>{truncateContents(notice.contents)}</ItemContent>
            </ListItem>
          </ListItemDiv>
        ))}
        <MoreBtnDiv>
          <MoreBtnEmptyDiv />
          <MoreBtnAndArrowDiv onClick={() => handleRowClick("news")}>
            <MoreBtn>더보기</MoreBtn>
            <MoreBtnArrow>&gt;&gt;</MoreBtnArrow>
          </MoreBtnAndArrowDiv>
        </MoreBtnDiv>
      </Aside>
      <Aside>
        <Title onClick={() => handleRowClick("event")}>이벤트</Title>
        {eventNotices.map((notice) => (
          <ListItemDiv
            key={notice.id}
            onClick={() => handleDetailsClick("event", notice)}
          >
            <ListItem>
              <ItemDate>{notice.createdDate}</ItemDate>
              <ItemTitle>
                {notice.title.replace(" (수정)", "")}
                {notice.title.includes("(수정)") && (
                  <ModifiedTag>(수정)</ModifiedTag>
                )}
              </ItemTitle>
              <ItemContent>{truncateContents(notice.contents)}</ItemContent>
            </ListItem>
          </ListItemDiv>
        ))}
        <MoreBtnDiv>
          <MoreBtnEmptyDiv />
          <MoreBtnAndArrowDiv onClick={() => handleRowClick("event")}>
            <MoreBtn>더보기</MoreBtn>
            <MoreBtnArrow>&gt;&gt;</MoreBtnArrow>
          </MoreBtnAndArrowDiv>
        </MoreBtnDiv>
      </Aside>
      <Aside>
        <Title onClick={() => handleRowClick("press")}>보도 자료</Title>
        {pressNotices.map((notice) => (
          <ListItemDiv
            key={notice.id}
            onClick={() => handleDetailsClick("press", notice)}
          >
            <ListItem>
              <ItemDate>{notice.createdDate}</ItemDate>
              <ItemTitle>
                {notice.title.replace(" (수정)", "")}
                {notice.title.includes("(수정)") && (
                  <ModifiedTag>(수정)</ModifiedTag>
                )}
              </ItemTitle>
              <ItemContent>{truncateContents(notice.contents)}</ItemContent>
            </ListItem>
          </ListItemDiv>
        ))}
        <MoreBtnDiv>
          <MoreBtnEmptyDiv />
          <MoreBtnAndArrowDiv onClick={() => handleRowClick("press")}>
            <MoreBtn>더보기</MoreBtn>
            <MoreBtnArrow>&gt;&gt;</MoreBtnArrow>
          </MoreBtnAndArrowDiv>
        </MoreBtnDiv>
      </Aside>
    </Contain>
  );
};

export default AnnouncementMain;
