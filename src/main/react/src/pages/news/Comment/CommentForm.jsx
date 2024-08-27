import React, { useState } from "react";
import styled from "styled-components";
import CommentAxios from "../../../axiosapi/CommentAxios";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  resize: none;
  height: 80px;
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CommentForm = ({ informationId, parentId, onCommentAdded }) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 상태 관리

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      setIsSubmitting(true); // 제출 시작

      try {
        const commentReqDto = {
          informationId: informationId,
          parentId: parentId,
          content: text,
        };
        const response = await CommentAxios.createComment(commentReqDto);

        setText("");
        alert("댓글이 제출되었습니다.");

        // 부모 컴포넌트에 댓글 추가를 알림
        if (onCommentAdded) onCommentAdded(response);
      } catch (error) {
        console.error("댓글 제출 중 오류 발생:", error);
        alert("댓글 제출 중 오류가 발생했습니다.");
      } finally {
        setIsSubmitting(false); // 제출 완료
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="댓글을 입력하세요..."
      />
      <SubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "제출 중..." : "댓글 달기"}
      </SubmitButton>
    </Form>
  );
};


export default CommentForm;
