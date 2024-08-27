import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import AnnouncementAxios from "../../axiosapi/AnnouncementAxios";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";

const Board = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  @media screen and (max-width: 768px) {
    height: 94vh;
    min-height: 750px;
  }
`;

const BtnDiv = styled.div`
  width: 92%;
  height: 5%;
  padding: 0 2% 0 2%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    padding: 0 5% 0 3%;
  }
`;

const Btn = styled.div`
  width: 90px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1f384c;
  font-family: "Roboto-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  color: #5a6acf;
  background-color: ${({ theme }) => theme.sideBar};
  transition: background-color 0.5s ease, color 0.5s ease;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 30px;
    margin-left: 2%;
    font-size: 12px;
  }
`;

const TitleDiv = styled.div`
  width: 92%;
  height: 15%;
  margin-top: 1%;
  padding-top: 1%;
  padding-left: 2.5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.commponent};
  transition: background-color 0.5s ease;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;

  @media screen and (max-width: 768px) {
    margin-top: 10%;
  }
`;
const Title = styled.h1`
  width: 285px;
  height: 90%;
  padding-left: 2%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 30px;
  font-weight: bolder;
  border-radius: 10px;
  @media screen and (max-width: 1200px) {
    background-color: ${({ theme }) => theme.commponent};
  }
  @media screen and (max-width: 768px) {
    margin-top: 10%;
    padding-left: 8%;
    font-size: 25px;
  }
`;

const Contents = styled.div`
  width: 92%;
  height: 75%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Tdfont = styled.div`
  display: flex;
  width: 95%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;

  table {
    border-collapse: collapse;
    width: 100%;
  }

  tbody tr:hover {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    border-radius: 10px;
    cursor: pointer;
  }

  tr {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.background};
    border-radius: 10px;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  td {
    width: 100%;
    padding: 10px 10px 10px 25px;
    font-size: 22px;
    font-family: "Roboto-Regular", Helvetica;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }

  th.number,
  td.number {
    width: 100px;
    text-align: center;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    white-space: nowrap;
  }

  th.date,
  td.date {
    width: 230px;
    height: 100%;
    font-size: 14px;
    border-bottom: 1px solid #dadada;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 768px) {
      font-size: 10px;
    }
  }
  tbody tr:last-child td.date {
    border-bottom: none;
  }
`;

const PageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5%;
  width: 100%;
  height: 10%;
  margin-top: 1%;
  @media screen and (max-width: 768px) {
    margin-top: 5%;
    justify-content: center;
    padding-left: 0%;
    font-size: 14px;
  }

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    padding-top: 2%;
  }

  .pagination li {
    margin: 0 12px;
    cursor: pointer;
    font-size: 16px;
    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
  }

  .pagination li a {
    text-decoration: none;
    color: gray;
  }

  .pagination li.active a {
    border-radius: 2px;
    padding: 7px;
    color: white;
    background-color: darkgray;
  }
`;

const ModifiedTag = styled.span`
  font-size: 16px; // 제목보다 작은 크기로 설정
  color: ${({ theme }) => theme.color};
  margin-left: 5px; // 제목과의 간격 설정
  @media screen and (max-width: 1200px) {
    font-size: 12px;
  }
`;

const AnBoard = () => {
  const { email, adminEmails = [] } = useContext(UserEmailContext);
  const { classTitle } = useParams();
  const [clickTitle, setClickTitle] = useState("");
  const [page, setPage] = useState(1);
  const [notices, setNotices] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  // 현재 사용자의 이메일이 관리자 이메일 목록에 있는지 확인
  const isAdmin = adminEmails.includes(email);
  console.log("현재 이메일:", email);
  console.log("관리자 이메일 목록:", adminEmails);
  console.log("Is Admin:", isAdmin);

  useEffect(() => {
    switch (classTitle) {
      case "news":
        setClickTitle("새 소식 게시판");
        break;
      case "event":
        setClickTitle("이벤트 게시판");
        break;
      case "press":
        setClickTitle("보도 자료 게시판");
        break;
      default:
        setClickTitle("알 수 없음");
    }
  }, [classTitle]);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      try {
        const response = await AnnouncementAxios.getAllBoards(classTitle);
        console.log(response.data);
        // 데이터 추출
        const fetchedNotices = response.data.map((notice) => ({
          id: notice.id,
          classTitle: notice.classTitle,
          title: notice.title,
          contents: notice.contents,
          createdDate: notice.createdDate,
        }));
        setNotices(fetchedNotices);
        setTotalItemsCount(fetchedNotices.length);
      } catch (error) {
        console.error("Failed to fetch notices", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, [classTitle, page]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleRowClick = (notice) => {
    navigate(`/announcement/${classTitle}/${notice.id}`, { state: { notice } });
  };

  const handleWriteClick = () => {
    navigate(`/announcement/${classTitle}/write`);
  };

  const handleBackClick = () => {
    navigate(`/announcement`);
  };

  return (
    <Board>
      <BtnDiv>
        <Btn onClick={() => handleBackClick()}>뒤로</Btn>
        {isAdmin && <Btn onClick={() => handleWriteClick()}>글 쓰기</Btn>}
      </BtnDiv>
      <TitleDiv>
        <Title>{clickTitle}</Title>
      </TitleDiv>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Contents>
          <Tdfont>
            <table>
              <tbody>
                {notices &&
                  [...notices] // 원본 배열을 변경하지 않도록 배열을 복사
                    .reverse() // 복사된 배열을 역순으로 정렬
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((notice) => (
                      <tr
                        key={notice.id}
                        onClick={() => handleRowClick(notice)}
                      >
                        <td>
                          {notice.title.replace(" (수정)", "")}
                          {notice.title.includes("(수정)") && (
                            <ModifiedTag>(수정)</ModifiedTag>
                          )}
                        </td>
                        <td className="date">{notice.createdDate}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </Tdfont>
        </Contents>
      )}
      <PageStyle>
        <Pagination
          activePage={page}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={100}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </PageStyle>
    </Board>
  );
};

export default AnBoard;
