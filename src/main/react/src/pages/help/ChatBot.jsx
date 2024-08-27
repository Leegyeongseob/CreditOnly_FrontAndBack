import React, { useEffect, useState } from "react";
import Header from "../../common/commonForm/Header";
import {
  Contain,
  Screen,
  MessageBox,
  MessagePlace,
  MessageSendBox,
  MessageSendWrap,
  MessageSend,
  SendWrap,
  MessageBubble,
  LoadingIndicator, // 햄버거 메뉴 스타일 컴포넌트
} from "./ChatBotStyles";
import { CardContainer } from "./ChatCardStyles";
import ChatBotSideBar from "./ChatBotSideBar";
import ChatCard from "./ChatCard";
import { VscSend } from "react-icons/vsc";
import { performSimilaritySearch } from "../../axiosapi/performSimilaritySearch";
import { useChatContext } from "../../contexts/ChatContext";

const ChatBot = () => {
  const {
    chatHistory,
    addMessage,
    clearChatHistory,
    currentConversation,
    setCurrentConversation,
    startNewConversation,
  } = useChatContext();

  const [message, setMessage] = useState("");
  const [isSideBarVisible, setIsSideBarVisible] = useState(true);
  const [activeTopic, setActiveTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeValue = localStorage.getItem("isDarkMode");
    setIsDarkMode(darkModeValue === "true");

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSideBarVisible(false);
      } else {
        setIsSideBarVisible(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleCardClick = (topic) => {
    setActiveTopic(topic);
    addMessage({ sender: "bot", text: `${topic}에 대해 물어보세요.` });

    const newConversation = startNewConversation();
    if (newConversation) {
      newConversation.topic = topic;
      setCurrentConversation(newConversation);
    }
  };

  const send = async () => {
    if (message.trim()) {
      addMessage({ sender: "user", text: message });
      setMessage("");
      setIsLoading(true);

      try {
        const response = await performSimilaritySearch(message);

        const formattedResponse = response
          .map((item) => {
            if (item.index === "financial_data") {
              return `
                금융회사명: ${item.source.fncoNm || "N/A"}
                대표자: ${item.source.fncoRprNm || "N/A"}
                주소: ${item.source.fncoAdr || "N/A"}
                설립일: ${item.source.fncoEstbDt || "N/A"}
              `;
            } else if (item.index === "ecos_statistic_word") {
              return `
                키워드: ${item.source.WORD || "N/A"}
                내용: ${item.source.CONTENT || "N/A"}
              `;
            } else if (item.index === "dart_company_info") {
              return `
                기업명: ${item.source.corp_name || "N/A"}
                대표자: ${item.source.ceo_nm || "N/A"}
              `;
            } else {
              return `Unknown index: ${item.index}`;
            }
          })
          .join("\n\n");

        addMessage({
          sender: "bot",
          text: formattedResponse,
        });
      } catch (error) {
        addMessage({
          sender: "bot",
          text: "죄송합니다. 오류가 발생했습니다.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  return (
    <>
      <Header
        toggleSideBar={toggleSideBar}
        isHeader={false}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        isDarkMode={isDarkMode}
      />
      <Contain>
        <Screen isDarkMode={isDarkMode}>
          {isSideBarVisible && (
            <ChatBotSideBar
              toggleSideBar={toggleSideBar}
              onNewChat={clearChatHistory}
              isOpen={isSideBarVisible}
              isDarkMode={isDarkMode}
            />
          )}
          <MessageBox>
            {!currentConversation || !activeTopic ? (
              <CardContainer>
                <ChatCard
                  text="소비자 동향 지수"
                  onClick={() => handleCardClick("소비자 동향 지수")}
                  isDarkMode={isDarkMode}
                />
                <ChatCard
                  text="기업 개황"
                  onClick={() => handleCardClick("기업 개황")}
                  isDarkMode={isDarkMode}
                />
                <ChatCard
                  text="금융 회사 조회"
                  onClick={() => handleCardClick("금융 회사 조회")}
                  isDarkMode={isDarkMode}
                />
              </CardContainer>
            ) : (
              <>
                <MessagePlace>
                  {chatHistory.map((msg, index) => (
                    <MessageBubble
                      key={index}
                      sender={msg.sender}
                      isDarkMode={isDarkMode}
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                  ))}
                  {isLoading && (
                    <LoadingIndicator isDarkMode={isDarkMode}>
                      응답을 생성 중입니다...
                    </LoadingIndicator>
                  )}
                </MessagePlace>
                <MessageSendBox>
                  <MessageSendWrap isDarkMode={isDarkMode}>
                    <MessageSend
                      type="text"
                      value={message}
                      onChange={handleChange}
                      onKeyPress={(e) => e.key === "Enter" && send()}
                      placeholder="메세지를 입력해주세요"
                      isDarkMode={isDarkMode}
                    />
                    <SendWrap onClick={send} isDarkMode={isDarkMode}>
                      <VscSend />
                    </SendWrap>
                  </MessageSendWrap>
                </MessageSendBox>
              </>
            )}
          </MessageBox>
        </Screen>
      </Contain>
    </>
  );
};

export default ChatBot;
