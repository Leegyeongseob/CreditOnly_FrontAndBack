import styled from "styled-components";

export const Sidebar = styled.div`
  width: 15%;
  min-width: 282px;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.background};
  transition: background-color 0.5s ease, border-right 0.5s ease;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1200px) {
    position: fixed;
    min-width: 161.69px;
    width: 200px;
    top: 6%;
    left: 0;
    background-color: ${({ theme }) => theme.background};
    border-right: 1px solid ${({ theme }) => theme.borderBottom};
    z-index: 100;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
`;

export const Menu = styled.div`
  width: 98%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

export const NewChatBox = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 10px;
  svg {
    margin-right: 2.5%; /* 간격 조절 */
  }
`;

export const Back = styled.div`
  cursor: pointer;
  width: 20%;
  height: 5%;
  max-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

export const NewChatBtn = styled.div`
  width: 90%;
  height: 30px;
  cursor: pointer;
  background-color: #121212;
  color: #fafafa;
  transition: background-color 0.5s ease, color 0.5s ease;
  font-size: 16px;
  padding: 0 5% 0 5%;
  align-items: center;
  justify-content: space-between;
  display: flex;
  user-select: none;
  border-radius: 10px;
`;

export const SettingBox = styled.div`
  width: 100%;
  height: 180px;
  user-select: none;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  display: flex;
`;

export const SetDetailTop = styled.div`
  width: 80%;
  height: 20%;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  padding-top: 8%;
  padding-left: 10%;
  gap: 3%;
  border-top: 1px solid lightgray;
  user-select: none;
  &:active {
    color: #b3b3b3;
  }
`;

export const SetDetail = styled.div`
  width: 80%;
  height: 20%;
  padding-top: 8%;
  cursor: pointer;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  padding-left: 10%;
  gap: 3%;
  user-select: none;
  &:active {
    color: #b3b3b3;
  }
  &:hover{
    color:rgba(108, 108, 255, 0.653);
  }
`;

export const ConversationList = styled.div`
  width: 100%;
  overflow-y: auto;
  max-height: 50%;
`;

export const ConversationItem = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  font-family: Arial, Helvetica, sans-serif;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: red;
`;
