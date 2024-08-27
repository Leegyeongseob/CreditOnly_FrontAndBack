import styled from "styled-components";

export const Sidebar = styled.div`
  width: 250px;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.sideBar};
  transition: background-color 0.5s ease, transform 0.3s ease;
  flex-direction: column;
  padding: 20px;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(-100%)"};
    z-index: 1000;
    width: 250px;
    height: 100vh;
  }
`;

export const Menu = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const Back = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const NewChatBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const NewChatBtn = styled.div`
  width: 100%;
  height: 40px;
  cursor: pointer;
  background-color: #5a6acf;
  color: #ffffff;
  transition: background-color 0.3s ease;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;

  &:hover {
    background-color: #4a59b0;
  }

  svg {
    margin-right: 10px;
  }
`;

export const ConversationList = styled.div`
  width: 100%;
  overflow-y: auto;
  margin-bottom: 20px;
`;

export const ConversationItem = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 5px;

  &:hover {
    background-color: rgba(90, 106, 207, 0.1);
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ff4d4f;
  font-size: 16px;

  &:hover {
    color: #ff7875;
  }
`;

export const SettingBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const SetDetail = styled.div`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 10px;

  &:hover {
    background-color: rgba(90, 106, 207, 0.1);
  }

  svg {
    margin-right: 10px;
  }
`;

export const ToggleButton = styled.button`
  display: none;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1001;
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 50%;
  color: white;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Overlay = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;
