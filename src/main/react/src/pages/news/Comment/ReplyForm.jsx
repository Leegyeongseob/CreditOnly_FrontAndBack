// import React, { useState } from "react";
// import styled from "styled-components";
// import CommentAxios from "../../../axiosapi/CommentAxios";

// const ReplyFormContainer = styled.div`
//   margin-top: 10px;
// `;

// const ReplyTextArea = styled.textarea`
//   padding: 5px;
//   border-radius: 4px;
//   border: 1px solid #ddd;
//   resize: none;
//   height: 40px;
//   width: 90%;
//   margin-bottom: 5px;
// `;

// const ReplyButton = styled.button`
//   padding: 5px;
//   background-color: #28a745;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #218838;
//   }
// `;

// const ReplyForm = ({ parentId, informationId, onReply }) => {
//   const [replyText, setReplyText] = useState("");

//   const handleReply = async () => {
//     if (replyText.trim()) {
//       try {
//         const reply = {
//           informationId,
//           parentId,
//           content: replyText,
//         };
//         console.log("parentId",parentId)
//         const response = await CommentAxios.createComment(reply);
//         // onReply를 통해 부모 컴포넌트에 답글 추가를 알립니다.
//         onReply(response);
//         setReplyText(""); // 답글 작성 후 입력 필드 초기화
//       } catch (error) {
//         console.error("답글 추가 실패", error);
//         alert("답글 추가 실패");
//       }
//     }
//   };

//   return (
//     <ReplyFormContainer>
//       <ReplyTextArea
//         value={replyText}
//         onChange={(e) => setReplyText(e.target.value)}
//         placeholder="답글을 입력하세요..."
//       />
//       <ReplyButton onClick={handleReply}>답글 달기</ReplyButton>
//     </ReplyFormContainer>
//   );
// };

// export default ReplyForm;
