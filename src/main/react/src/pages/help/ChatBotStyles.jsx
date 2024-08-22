import styled from "styled-components";
export const Contain = styled.div`
  width: auto;
  height: auto;
`;
export const Screen = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  transition: background-color 0.5s ease, color 0.5s ease;
  width: 100vw;
  height: 93vh;
  display: flex;
  z-index: 11;
`;

export const MessageBox = styled.div`
  width: 85%;
  height: 100%;
  justify-content: start;
  align-items: center;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  flex-direction: column;
`;

export const MessagePlace = styled.div`
  width: 45%;
  height: 85%;
  overflow-y: auto;
`;

export const MessageSendBox = styled.div`
  width: 80%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MessageSendWrap = styled.div`
  width: 80%;
  height: 30%;
  background-color: ${({ theme }) => theme.sideBar};
  border: 1px solid ${({ theme }) => theme.border};
  transition: background-color 0.5s ease, border 0.5s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  max-width: 650px;
`;

export const MessageSend = styled.input`
  background-color: ${({ theme }) => theme.sideBar};
  border: 1px solid ${({ theme }) => theme.border};
  transition: background-color 0.5s ease, border 0.5s ease;
  font-size: 15px;
  font-weight: lighter;
  width: 95%;
  height: 100%;
  border: none;
  display: flex;
  user-select: none;
  border-radius: 8px;
  align-items: center;
  padding-left: 1.5%;
  max-width: 650px;
  outline: none;
`;

export const SendWrap = styled.div`
  cursor: pointer;
  font-size: 20px;
  font-weight: 100;
`;

export const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 20px;
  margin: 10px;
  background-color: ${(props) =>
    props.sender === "user" ? "#007bff" : "#f1f0f0"};
  color: ${(props) => (props.sender === "user" ? "white" : "black")};
  align-self: ${(props) =>
    props.sender === "user" ? "flex-end" : "flex-start"};
`;

export const LoadingIndicator = styled.div`
  text-align: center;
  padding: 10px;
  font-style: italic;
`;
