//ChatBot.jsx
import React, { useEffect, useState } from "react";
import Header from "../../common/commonForm/Header";
import ChatBotSideBar from "./ChatBotSideBar";
import ChatCard from "./ChatCard";
import { performSimilaritySearch } from "../../axiosapi/performSimilaritySearch";
import { useChatContext } from "../../contexts/ChatContext";
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
  LoadingIndicator,
} from "./ChatBotStyles";
import { VscSend } from "react-icons/vsc";

const ChatBot = () => {
  const {
    chatHistory,
    addMessage,
    clearChatHistory,
    isDarkMode,
    toggleDarkMode,
    currentConversation,
    setCurrentConversation,
    startNewConversation,
  } = useChatContext();

  const [message, setMessage] = useState("");
  const [isSideBarVisible, setIsSideBarVisible] = useState(true);
  const [isHeader, setIsHeader] = useState(false);
  const [activeTopic, setActiveTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(`Active topic changed to: ${activeTopic}`);
  }, [activeTopic]);

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
    } else {
      console.error(
        "Failed to start new conversation: newConversation is undefined"
      );
    }
  };

  const send = async () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      addMessage({ sender: "user", text: message });
      setMessage("");
      setIsLoading(true);

      try {
        const response = await performSimilaritySearch(message);
        console.log("API Response:", response);

        if (response.length === 0) {
          console.warn("Empty response received. Check the query and server.");
        }

        // 주제별 응답을 처리
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
        console.log(
          "Updated chat history after receiving response:",
          chatHistory
        );
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
        addMessage({
          sender: "bot",
          text:
            "죄송합니다. 오류가 발생했습니다: " +
            (error.response?.data?.message || error.message),
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
    setIsHeader(!isHeader);
  };

  const handleResize = () => {
    if (window.innerWidth < 1201) {
      setIsSideBarVisible(false);
      setIsHeader(false);
    } else {
      setIsSideBarVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNewChat = () => {
    clearChatHistory();
    setActiveTopic(null);
  };

  useEffect(() => {
    if (currentConversation && currentConversation.topic) {
      setActiveTopic(currentConversation.topic);
    }
  }, [currentConversation]);

  return (
    <Contain>
      <Header
        toggleSideBar={toggleSideBar}
        isHeader={isHeader}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <Screen isDarkMode={isDarkMode}>
        {isSideBarVisible && (
          <ChatBotSideBar
            toggleSideBar={toggleSideBar}
            onNewChat={handleNewChat}
          />
        )}
        <MessageBox>
          {!currentConversation || !activeTopic ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ChatCard
                text="소비자 동향 지수"
                onClick={() => handleCardClick("소비자 동향 지수")}
              />
              <ChatCard
                text="기업 개황"
                onClick={() => handleCardClick("기업 개황")}
              />
              <ChatCard
                text="금융 회사 조회"
                onClick={() => handleCardClick("금융 회사 조회")}
              />
            </div>
          ) : (
            <>
              <MessagePlace>
                {chatHistory.map((msg, index) => (
                  <MessageBubble
                    key={index}
                    sender={msg.sender}
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                ))}
                {isLoading && (
                  <LoadingIndicator>응답을 생성 중입니다...</LoadingIndicator>
                )}
              </MessagePlace>
              <MessageSendBox>
                <MessageSendWrap>
                  <MessageSend
                    type="text"
                    value={message}
                    onChange={handleChange}
                    onKeyPress={(e) => e.key === "Enter" && send()}
                    placeholder="메세지를 입력해주세요"
                  />
                  <SendWrap onClick={send}>
                    <VscSend />
                  </SendWrap>
                </MessageSendWrap>
              </MessageSendBox>
            </>
          )}
        </MessageBox>
      </Screen>
    </Contain>
  );
};

export default ChatBot;
