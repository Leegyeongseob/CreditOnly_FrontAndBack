import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/main/MainPage";
import FindEmail from "./pages/login/FindEmail";
import FindPassword from "./pages/login/FindPassword";
import GlobalStyle from "./global/GlobalStyle";
import ErrorPage from "./error/ErrorPage";
import MainForm from "./common/commonForm/MainForm";
import LoginPage from "./pages/login/LoginPage";
import SignUp from "./pages/login/SignUp";
import FindByForm from "./common/commonForm/FindByForm";
import Mypage from "./pages/settingpage/Mypage";
import HelpPage from "./pages/help/HelpPage";
import CreditNews from "./pages/news/CreditNews";
import NewsList from "./pages/news/NewsList";
import NewsDetail from "./pages/news/NewsDetail";
import CreditStyle from "./CreditStyle";
import RendingPage from "./pages/main/RendingPage";
import Evaluation from "./pages/evaluation/Evaluation";
import Announcement from "./pages/announcement/AnnouncementMain";
import ChatBot from "./pages/help/ChatBot";
import ResetPassword from "./pages/login/ResetPassword";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import UserEmailProvider from "./contextapi/UserEmailProvider";
import AboutUs from "./pages/aboutUs/AboutUs";
import AdInquiry from "./pages/ad/AdInquiry";
import Withdrawal from "./pages/changepage/Withdrawal";
import AnBoard from "./pages/announcement/AnBoard";
import AnBoardDetails from "./pages/announcement/AnBoardDetails";
import AnBoardWrite from "./pages/announcement/AnBoardWrite";
import DataVisualization from "./pages/evaluation/DataVisualization";
import { ChatProvider } from "./contexts/ChatContext";
import CreditDataInputForm from "./pages/evaluation/CreditDataInputForm";
// 라이트 및 다크 테마 설정
const lightTheme = {
  background: "#ffffff",
  color: "#000000",
  commponent: "#f9f9fd",
  // overlay: "rgba(255, 255, 255, 0.5)",
  sideBar: "#f1f2f7",
  sideCheck: "#d8dcf3",
  borderBottom: "#C8CBD9",
  border: "#C8CBD9",
  borderR: "1px solid #C8CBD9",
  overflow: "darkgray",
  goodBlue: "#007bff",
  toggle: "#93c7ff",
  drag: "#687bf7",
  shadow: "#90909040",
  chatHead: "#ffffff",
};

const darkTheme = {
  background: "#242424",
  color: "#fff",
  commponent: "#1D1D1D",
  overlay: "rgba(0, 0, 0, 0.5)",
  sideBar: "#121212",
  sideCheck: "#3b3a4f",
  borderBottom: "#444444",
  borderR: "1px solid #444444",
  border: "#444444",
  overflow: "#909090",
  goodBlue: "#0056b3",
  toggle: "#121212",
  drag: "#5a67ba",
  shadow: "#000",
  chatHead: "#121212",
};

const App = () => {
  const storedTheme = localStorage.getItem("isDarkMode");
  const initialTheme = storedTheme === "true" ? true : false;
  const [isDarkMode, setIsDarkMode] = useState(initialTheme);

  // 테마 변경 함수
  const toggleDarkMode = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("isDarkMode", newTheme); // 로컬 스토리지에 저장
  };

  // Kakao SDK 초기화
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init("YOUR_APP_KEY");
  }
  return (
    <>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        {/* 전역스타일적용 */}
        <GlobalStyle />
        <CreditStyle />
        <UserEmailProvider>
          <Router>
            <Routes>
              <Route path="/" element={<RendingPage />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route
                element={
                  <MainForm
                    toggleDarkMode={toggleDarkMode}
                    isDarkMode={isDarkMode}
                  />
                }
              >
                <Route path="/mainpage" element={<MainPage />} />
                <Route
                  path="/setting"
                  element={
                    <ChatProvider>
                      <Mypage />
                    </ChatProvider>
                  }
                />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/information" element={<CreditNews />} />
                <Route
                  path="/information-list/:category"
                  element={<NewsList />}
                />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/evaluation" element={<Evaluation />} />
                <Route
                  path="/credit-data-input"
                  element={<CreditDataInputForm />}
                />

                <Route
                  path="/data-visualization"
                  element={<DataVisualization />}
                />
                <Route path="/announcement" element={<Announcement />} />
                <Route
                  path="/announcement/:classTitle/write"
                  element={<AnBoardWrite />}
                />
                <Route path="/announcement/:classTitle" element={<AnBoard />} />
                <Route
                  path="/announcement/:classTitle/:classNo"
                  element={<AnBoardDetails />}
                />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/chat"
                element={
                  <ChatProvider>
                    <ChatBot
                      toggleDarkMode={toggleDarkMode}
                      isDarkMode={isDarkMode}
                    />
                  </ChatProvider>
                }
              />

              <Route element={<FindByForm withdrawal={false} />}>
                <Route path="/findbyemail" element={<FindEmail />} />
                <Route path="/findbypwd" element={<FindPassword />} />
                <Route path="/resetpwd" element={<ResetPassword />} />
              </Route>
              <Route element={<FindByForm withdrawal={true} />}>
                <Route path="/withdrawal" element={<Withdrawal />} />
              </Route>
              <Route path="/aboutus" element={<AboutUs></AboutUs>} />
              <Route path="/adinquiry" element={<AdInquiry></AdInquiry>} />
            </Routes>
          </Router>
        </UserEmailProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
