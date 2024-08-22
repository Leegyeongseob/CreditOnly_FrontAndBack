import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommentLikeAxios from "../../../axiosapi/CommentLikeAxios";
import defaultImg from "../../../img/mainImg/pro.png";
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrashAlt } from 'react-icons/fa'; // 아이콘 패키지

const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.sideBar};
  color: ${({ theme }) => theme.color};
`;

const CommentContent = styled.div`
  flex: 1;
  margin-left: 10px;
`;

const CommentImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #ddd;
`;

const CommentText = styled.p`
  font-size: 14px;
  margin: 0;
  
`;

const CommentAuthor = styled.p`
  font-weight: bold;
  margin-bottom: 1%;
  
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  color: #007bff;
  font-size: 12px;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
  transition: color 0.3s;

  &:hover {
    color: #0056b3;
  }

  svg {
    margin-right: 5px;
  }
 
`;

const CommentItem = ({ comment, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);
  const [likes, setLikes] = useState(comment.likes);
  const [dislikes, setDislikes] = useState(comment.dislikes);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(comment.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleLike = async () => {
    try {
      const response = await CommentLikeAxios.likeOrDislikeComment(
        comment.id,
        "LIKE"
      );
      setLikes(response.likesCount);
      setDislikes(response.dislikesCount);
    } catch (error) {
      console.error("댓글 좋아요 처리 실패", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await CommentLikeAxios.likeOrDislikeComment(
        comment.id,
        "DISLIKE"
      );
      setLikes(response.likesCount);
      setDislikes(response.dislikesCount);
    } catch (error) {
      console.error("댓글 싫어요 처리 실패", error);
    }
  };

  useEffect(() => {
    const fetchLikeDislikeCounts = async () => {
      try {
        const response = await CommentLikeAxios.getLikeDislikeCount(comment.id);
        setLikes(response.likesCount);
        setDislikes(response.dislikesCount);
      } catch (error) {
        console.error(
          `id가 ${comment.id}인 댓글 좋아요/싫어요 수 불러오기 실패`,
          error
        );
      }
    };

    fetchLikeDislikeCounts();
  }, [comment.id]);

  return (
    <Item>
      <CommentImg src={comment.memberImg || defaultImg} />
      <CommentContent>
        <CommentAuthor>{comment.memberName}</CommentAuthor>
        {isEditing ? (
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows="3"
            style={{ width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        ) : (
          <CommentText>{comment.content}</CommentText>
        )}
        <ButtonGroup>
          <Button onClick={handleLike}>
            <FaThumbsUp /> {likes}
          </Button>
          <Button onClick={handleDislike}>
            <FaThumbsDown /> {dislikes}
          </Button>
          <Button onClick={handleEdit}>
            <FaEdit /> {isEditing ? "저장" : "수정"}
          </Button>
          <Button onClick={() => onDelete(comment.id)}>
            <FaTrashAlt />
          </Button>
        </ButtonGroup>
      </CommentContent>
    </Item>
  );
};

export default CommentItem;
