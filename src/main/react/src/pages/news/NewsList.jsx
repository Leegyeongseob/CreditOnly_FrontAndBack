import React, { useContext, useState, useEffect } from "react";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import InformationAxios from "../../axiosapi/InformationAxios";
import NewsForm from "./NewsForm";
import useImageErrorHandler from "./useImage";

const Container = styled.div`
  width: 99%;
  height: 94vh;
  min-width: 300px;
`;

const TopBar = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CategoryButton = styled.button`
  width: 18%;
  /* min-width: 56px; */
  height: 100%;
  font-size: 16px;
  background-color: ${({ active, theme }) =>
    active ? theme.commponent : theme.borderBottom};
  color: ${({ theme }) => theme.color};
  border: none;
  border-radius: 4px;
  white-space: pre-wrap; /* 띄어쓰기에서만 줄바꿈 */
  word-break: keep-all; /* 긴 단어를 포함하더라도 띄어쓰기가 없는 경우 줄바꿈 안 함 */

  cursor: pointer;

  &:hover {
    scale: calc(1.1);
  }

  @media screen and (max-width: 760px) {
    font-size: clamp(10px, 2vw, 20px);
  }
`;

const ListWrap = styled.div`
  width: 100%;
  height: 70%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
`;

const ListGroup = styled.div`
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  width: 100%;
  height: 20%;
  justify-content: space-around;
  align-items: center;
  display: flex;
  align-items: center;
  border-bottom: ${(props) => (props.isLast ? "none" : "1px solid #242222b5")};
`;

const Simg = styled.img`
  border-radius: 50%;
  height: 100px;
  object-fit: cover;
  width: 100px;

  @media screen and (max-width: 768px) {
    width: 17%;
    height: auto;
    aspect-ratio: 1 / 1;
  }
`;

const ListDetailWrap = styled.div`
  width: 70%;
  height: 74%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const TextWrapper = styled.h3`
  width: 100%;
  font-size: 20px;
  font-weight: 600;

  @media screen and (max-width: 760px) {
    font-size: clamp(15px, 2.6vw, 20px);
  }
`;

const DetailWrap = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 표시할 라인 수 */
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.5; /* 줄 간격 (적절히 조정) */
  max-height: 3em; /* 라인 수에 맞춰 최대 높이 설정 (line-height × 2) */

  @media screen and (max-width: 760px) {
    font-size: clamp(11px, 2vw, 20px);
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const Select = styled.select`
  padding: 1%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
  outline: none;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;

  @media screen and (max-width: 760px) {
    font-size: clamp(13px, 2vw, 20px);
  }
`;

const Input = styled.input`
  padding: 1%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 0;
  width: 300px;
  outline: none;
  background-color: ${({ theme }) => theme.commponent};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;

  &:focus {
    border-color: #000;
  }
  @media screen and (max-width: 760px) {
    width: 48%;
    font-size: clamp(13px, 2vw, 20px);
  }
`;

const Search = styled(FaSearch)``;

const Button = styled.button`
  padding: 1%;
  font-size: 16px;
  background-color: ${({ theme }) => theme.borderBottom};
  color: ${({ theme }) => theme.color};
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.overflow};
  }

  @media screen and (max-width: 760px) {
    font-size: clamp(13px, 2vw, 20px);
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageButton = styled.button`
  background-color: ${({ active, theme }) =>
    active ? theme.borderBottom : theme.overflow};
  color: ${({ active, theme }) => (active ? theme.color : theme.color)};
  border: 1px solid #000;
  padding: 6px;
  margin: 0 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.overflow};
    color: white;
  }

  &:disabled {
    background-color: #ccc;
    color: #666;
    cursor: not-allowed;
  }

  @media screen and (max-width: 760px) {
    padding: 1%;
  }
`;

const AddNewsButton = styled.button`
  width: 90px;
  height: 35px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Roboto-Regular", Helvetica;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.sideBar};
  transition: background-color 0.5s ease, color 0.5s ease;
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #666;
  }
  @media screen and (max-width: 768px) {
    width: 80px;
    height: 30px;
    font-size: 12px;
  }
`;

const categories = [
  "전체",
  "신용조회 정보모음",
  "신용조회 어플추천",
  "신용카드와 신용정보",
];

const NewsList = ({ onSave, onCancel }) => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("all");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(category || "전체");
  const [items, setItems] = useState([]);
  const itemsPerPage = 5;
  const handleImageError = useImageErrorHandler();
  const { email, adminEmails = [] } = useContext(UserEmailContext);
  const isAdmin = adminEmails.includes(email);
  const [isCreating, setIsCreating] = useState(false);
  const [item, setItem] = useState({
    title: "",
    imageUrl: "",
    content: "",
    category: "",
  });

  const handleInputSave = (field, value) => {
    setItem((prevItem) => ({
      ...prevItem,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving item:", item);
      const savedItem = await InformationAxios.createInformation(item);
      console.log("Item saved successfully:", savedItem);
      setIsCreating(false);
      if (onSave) onSave(savedItem);
    } catch (error) {
      console.error("정보 저장 실패:", error);
    }
  };
  const handleAddNewsClick = () => {
    setItem({
      title: "",
      imageUrl: "",
      content: "",
      category: "",
    });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false); // 취소 시 폼 숨기기
    if (onCancel) onCancel();
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (selectedCategory === "전체") {
          const fetchedItems = await InformationAxios.getAllInformation();
          setItems(fetchedItems);
        } else {
          const fetchedItems = await InformationAxios.getInformationByCategory(
            selectedCategory
          );
          setItems(fetchedItems);
        }
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedCategory(category || "전체");
  }, [category]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSearchOption(e.target.value);
  };

  const handleSearch = () => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filteredItems = items.filter((item) => {
      const matchesSearch =
        (searchOption === "title" &&
          item.title.toLowerCase().includes(lowerCaseTerm)) ||
        (searchOption === "content" &&
          item.content.toLowerCase().includes(lowerCaseTerm)) ||
        (searchOption === "all" &&
          (item.title.toLowerCase().includes(lowerCaseTerm) ||
            item.content.toLowerCase().includes(lowerCaseTerm)));
      const matchesCategory =
        selectedCategory === "전체" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setSearchResults(filteredItems);
    setCurrentPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const currentItems = (searchResults.length ? searchResults : items)
    .filter(
      (item) =>
        selectedCategory === "전체" || item.category === selectedCategory
    )
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(
    (searchResults.length ? searchResults : items).filter(
      (item) =>
        selectedCategory === "전체" || item.category === selectedCategory
    ).length / itemsPerPage
  );

  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <TopBar>
        {categories.map((cat) => (
          <CategoryButton
            key={cat}
            active={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </CategoryButton>
        ))}
      </TopBar>
      {isCreating ? (
        <NewsForm
          item={item}
          onInputChange={handleInputSave}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={false} // 작성 모드에서는 isEditing을 false로 설정
        />
      ) : (
        <>
          <ListWrap>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/news/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListGroup isLast={index === currentItems.length - 1}>
                    <Simg
                      alt={item.title}
                      src={item.imageUrl}
                      onError={(e) => handleImageError(e, item.id)}
                    />
                    <ListDetailWrap>
                      <TextWrapper>{item.title}</TextWrapper>
                      <DetailWrap>{item.content}</DetailWrap>
                    </ListDetailWrap>
                  </ListGroup>
                </Link>
              ))
            ) : (
              <p>검색 결과가 없습니다.</p>
            )}
          </ListWrap>
          <SearchContainer>
            <Select value={searchOption} onChange={handleOptionChange}>
              <option value="all">제목+내용</option>
              <option value="title">제목</option>
              <option value="content">내용</option>
            </Select>
            <Input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="검색어를 입력하세요..."
            />
            <Button onClick={handleSearch}>
              <Search />
            </Button>
          </SearchContainer>
          {isAdmin && (
            <AddNewsButton onClick={handleAddNewsClick}>작성</AddNewsButton>
          )}
          <Pagination>
            <PageButton
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              &lt;&lt;
            </PageButton>
            <PageButton
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &lt;
            </PageButton>
            {pageNumbers.map((num) => (
              <PageButton
                key={num}
                active={currentPage === num}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </PageButton>
            ))}
            <PageButton
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &gt;
            </PageButton>
            <PageButton
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              &gt;&gt;
            </PageButton>
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default NewsList;
