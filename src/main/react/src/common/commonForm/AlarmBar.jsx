import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { UserEmailContext } from "../../contextapi/UserEmailProvider";
import AnnouncementAxios from "../../axiosapi/AnnouncementAxios";
// 알림창이 나타나는 애니메이션
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 알림창이 사라지는 애니메이션
const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const Alarm = styled.div`
  position: fixed;
  width: 250px;
  top: 7.1%;
  right: 1%;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  transition: background-color 0.5s ease, border 0.5s ease;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;

  // 애니메이션 적용
  animation: ${({ isVisible }) => (isVisible ? slideIn : slideOut)} 0.6s ease;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) =>
    isVisible ? "translateY(0)" : "translateY(-20px)"};
`;

const Menu = styled.div`
  width: 95%;
  height: 88%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const Title = styled.div`
  width: 100%;
  height: 35px;
  color: ${({ theme }) => theme.color};
  transition: color 0.5s ease;
  font-family: "Poppins-Regular", Helvetica;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  line-height: 11px;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsBox = styled(Link)`
  width: 100%;
  padding-left: 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  white-space: nowrap;
  text-decoration: none;
  border-radius: 10px;
  margin-top: 2%;
  color: #5a6acf;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  transition: background-color 0.5s ease, border 0.5s ease, height 0.3s ease;
  height: 40px;
  overflow: hidden;

  &:hover {
    height: 105px;
    background-color: ${({ theme }) => theme.sideBar};
    transition: height 0.4s ease;
  }
`;

const NotificationTitle = styled.div`
  font-weight: bold;
`;

const NotificationContents = styled.div`
  margin-top: 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.color};
`;

const BtnDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const OkBtn = styled.div`
  width: 60px;
  height: 22px;
  margin-top: 15px;
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  color: #5a6acf;
  transition: background-color 0.5s ease;
  text-decoration: none;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
const LinkBtn = styled.div`
  width: 60px;
  height: 22px;
  margin-top: 15px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  color: #5a6acf;
  transition: background-color 0.5s ease;
  text-decoration: none;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const AlarmBar = ({
  setHasUnreadNotifications,
  toggleAlarmBar,
  hasUnreadNotifications,
  isVisible,
}) => {
  const { email } = useContext(UserEmailContext);
  const [notifications, setNotifications] = useState([]);
  const [hoveredNotificationId, setHoveredNotificationId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await AnnouncementAxios.getNotificationsByEmail(email);
        setNotifications(response.data);
        setHasUnreadNotifications(response.data.length > 0);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };

    fetchNotifications();
  }, [email, setHasUnreadNotifications]);

  const markNotificationAsRead = async (id) => {
    try {
      await AnnouncementAxios.markAsRead(id, email);
      const updatedNotifications = notifications.filter(
        (notification) => notification.id !== id
      );
      setNotifications(updatedNotifications);
      setHasUnreadNotifications(updatedNotifications.length > 0);
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const handleNotificationClick = async (classTitle, notice, id) => {
    await markNotificationAsRead(id);
    navigate(`/announcement/${classTitle}/${notice.id}`, {
      state: { notice },
    });
    toggleAlarmBar(); // 이동 버튼 클릭 시 알림바 닫기
    window.location.reload(); // 이동 후 페이지 새로고침
  };

  const handleOkClick = async (id) => {
    await markNotificationAsRead(id);
    // 확인 버튼 클릭 시 알림바는 닫히지 않음
  };

  return (
    <Alarm isVisible={isVisible}>
      <Menu>
        <Title>{hasUnreadNotifications ? "알림" : "알림없음"}</Title>
        {notifications
          .slice()
          .reverse()
          .slice(0, 4)
          .map((notification) => (
            <ContentsBox
              key={notification.id}
              onMouseEnter={() => setHoveredNotificationId(notification.id)}
              onMouseLeave={() => setHoveredNotificationId(null)}
            >
              <NotificationTitle>{notification.title}</NotificationTitle>
              {hoveredNotificationId === notification.id && (
                <>
                  <NotificationContents>
                    {notification.contents}
                  </NotificationContents>
                  <BtnDiv>
                    <OkBtn onClick={() => handleOkClick(notification.id)}>
                      확인
                    </OkBtn>
                    <LinkBtn
                      onClick={() =>
                        handleNotificationClick(
                          notification.classTitle,
                          notification,
                          notification.id
                        )
                      }
                    >
                      이동
                    </LinkBtn>
                  </BtnDiv>
                </>
              )}
            </ContentsBox>
          ))}
      </Menu>
    </Alarm>
  );
};

export default AlarmBar;
