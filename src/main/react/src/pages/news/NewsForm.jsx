import React from "react";
import styled from "styled-components";

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DetailWrap = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 2% auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.color};
  margin-bottom: 2%;
  @media screen and (max-width: 768px) {
    font-size: clamp(15px, 3vw, 24px);
  }
`;

const NewsImg = styled.img`
  width: 100%;
  height: 40%;
  object-fit: cover;
  margin-bottom: 10px;
`;

const Content = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.color};
  line-height: 1.6;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
  color: ${({ theme }) => theme.color};
  
  background-color: ${({ theme }) => theme.sideBar};
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
  resize: vertical;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.sideBar};
`;

const EditBtn = styled.div`
  width: 200px;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
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

const CategorySelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
  
`;

const NewsForm = ({
  item = {},
  onInputChange,
  onSave,
  onCancel,
  isEditing,
}) => {
  const { title = "", imageUrl = "", content = "", category = "" } = item;

  const handleChange = (field) => (e) => {
    onInputChange(field, e.target.value);
  };

  return (
    <>
      <TopSection>
        <Header>
          <Title>{isEditing ? "뉴스 수정" : "뉴스 작성"}</Title>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={handleChange("title")}
            placeholder="제목을 입력하세요"
          />
        </Header>
      </TopSection>
      <DetailWrap>
        <label htmlFor="category">카테고리</label>
        <CategorySelect
          id="category"
          name="category"
          value={category}
          onChange={handleChange("category")}
        >
          <option value="" disabled>
            카테고리를 선택하세요
          </option>
          <option value="신용조회 정보모음">신용조회 정보모음</option>
          <option value="신용조회 어플추천">신용조회 어플추천</option>
          <option value="신용카드와 신용정보">신용카드와 신용정보</option>
        </CategorySelect>
        <Input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={handleChange("imageUrl")}
          placeholder="이미지 URL을 입력하세요"
        />
        {imageUrl && <NewsImg alt={title} src={imageUrl} />}
        <Content>
          <Textarea
            id="content"
            rows="10"
            value={content}
            onChange={handleChange("content")}
            placeholder="내용을 입력하세요"
          />
        </Content>
        {!isEditing && (
          <EditBtn>
            <Btn onClick={onSave}>저장</Btn>
            <Btn onClick={onCancel}>취소</Btn>
          </EditBtn>
        )}
      </DetailWrap>
    </>
  );
};

export default NewsForm;
