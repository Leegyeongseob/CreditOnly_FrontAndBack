import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommentList from "./CommentList";
import CommentAxios from "../../../axiosapi/CommentAxios";
import CommentLikeAxios from "../../../axiosapi/CommentLikeAxios";

// 스타일링 컴포넌트
const CommentsContainer = styled.div`
  width: 260px;
  margin-top: 20px;
  margin-right: 3%;
  border-top: 1px solid #ddd;
  padding-top: 20px;

  @media screen and (max-width: 760px) {
    width: 93%;
    position: absolute;
    margin: 1% auto;
    margin-right: 2%;
    padding: 2%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    border-radius: 4px;
    opacity: ${({ showComments }) => (showComments ? 1 : 0)};
    pointer-events: ${({ showComments }) => (showComments ? "auto" : "none")};
  }
`;

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
  background-color: ${({ theme }) => theme.sideBar};
`;

const SubmitButton = styled.button`
  width: 100px;
  padding: 10px;
  background-color: ${({ theme }) => theme.borderBottom};
  color: ${({ theme }) => theme.color};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #91a0b1;
  }
`;

// Comments 컴포넌트
const Comments = ({ informationId, showComments }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 댓글 목록을 불러오는 useEffect
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await CommentAxios.getCommentsByInformationId(
          informationId
        );
        setComments(response || []);
      } catch (error) {
        console.error("댓글 불러오기 실패", error);
        setError("댓글을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [informationId]);

  // 댓글 추가 핸들러
  const handleAddComment = async (newComment) => {
    try {
      setComments((prevComments) => [...prevComments, newComment]);
    } catch (error) {
      console.error("댓글 추가 실패", error);
    }
  };

  // 댓글 수정 핸들러
  const handleEditComment = async (id, text) => {
    try {
      const updatedComment = { content: text };
      const response = await CommentAxios.updateComment(id, updatedComment);
      setComments((prevComments) =>
        prevComments.map((comment) => (comment.id === id ? response : comment))
      );
    } catch (error) {
      console.error("댓글 수정 실패", error);
    }
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (id) => {
    try {
      await CommentAxios.deleteComment(id);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== id)
      );
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  };

  // 좋아요 핸들러
  const handleLike = async (id) => {
    try {
      await CommentLikeAxios.likeOrDislikeComment(id, "like");
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id
            ? { ...comment, likes: (comment.likes || 0) + 1 }
            : comment
        )
      );
    } catch (error) {
      console.error("댓글 좋아요 실패", error);
    }
  };

  // 싫어요 핸들러
  const handleDislike = async (id) => {
    try {
      await CommentLikeAxios.likeOrDislikeComment(id, "dislike");
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id
            ? { ...comment, dislikes: (comment.dislikes || 0) + 1 }
            : comment
        )
      );
    } catch (error) {
      console.error("댓글 싫어요 실패", error);
    }
  };

  // 답글 핸들러
  const handleReply = async (id, replyText) => {
    try {
      const reply = {
        informationId,
        parentId: id,
        content: replyText,
      };
      const response = await CommentAxios.createComment(reply);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id
            ? { ...comment, replies: [...(comment.replies || []), response] }
            : comment
        )
      );
    } catch (error) {
      console.error("답글 추가 실패", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <CommentsContainer showComments={showComments}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const text = e.target.elements.commentText.value.trim();
          if (text) {
            const newComment = {
              informationId,
              parentId: null,
              content: text,
            };
            try {
              const response = await CommentAxios.createComment(newComment);
              setComments((prevComments) => [...prevComments, response]);
              e.target.elements.commentText.value = ""; // Clear the text area
            } catch (error) {
              console.error("댓글 제출 중 오류 발생:", error);
              alert("댓글 제출 중 오류가 발생했습니다.");
            }
          }
        }}
      >
        <TextArea name="commentText" placeholder="댓글을 입력하세요..." />
        <SubmitButton type="submit">댓글 달기</SubmitButton>
      </Form>
      <CommentList
        comments={comments}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
        onLike={handleLike}
        onDislike={handleDislike}
        onReply={handleReply}
      />
    </CommentsContainer>
  );
};

export default Comments;
