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
  LoadingIndicator,
} from "./ChatBotStyles"; // 변경된 파일 이름 적용
import { CardWrapper, CardContainer, CardText } from "./ChatCardStyles";
import ChatBotSideBar from "./ChatBotSideBar"; // 변경된 파일 이름 적용
import { VscSend } from "react-icons/vsc";
import { performSimilaritySearch } from "../../axiosapi/performSimilaritySearch";
import { useChatContext } from "../../contexts/ChatContext";
import ChatDataFetch from "../../axiosapi/ChatDataFetch";

const ChatBot = ({ isDarkMode, toggleDarkMode }) => {
  const {
    chatHistory,
    addMessage,
    clearChatHistory,
    currentConversation,
    setCurrentConversation,
    startNewConversation,
    conversations,
  } = useChatContext();

  const [message, setMessage] = useState("");
  const [isSideBarVisible, setIsSideBarVisible] = useState(true);
  const [activeTopic, setActiveTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCardSelected, setIsCardSelected] = useState(false); // 카드 선택 상태 추가

  useEffect(() => {
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
    setIsCardSelected(true); // 카드 선택 시 상태 업데이트
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
              return `검색어가 : ${activeTopic}에 없습니다.`;
            }
          })
          .join("\n\n");
        addMessage({
          sender: "bot",
          text: formattedResponse,
        });
      } catch (error) {
        // 데이터 가져오는 부분
        console.log("전송하는 메세지:", message);
        const res = await ChatDataFetch.searchChatBotDataFetch(
          activeTopic,
          message
        );
        console.log("받아오는 데이터", res.data);
        console.log("데이터 타입:", typeof res.data);
        console.log("데이터가 배열인가?", Array.isArray(res.data));
        console.log("데이터 길이:", res.data.length);
        if (!res.data || !Array.isArray(res.data) || res.data.length === 0) {
          const searchResponse = `검색어가 ${activeTopic}에 없습니다.`;
          addMessage({
            sender: "bot",
            text: searchResponse,
          });
        } else {
          const searchResponse = res.data
            .map((item) => {
              if (item.topic === "financial_data") {
                return `
                금융회사명: ${item.fncoNm || "N/A"}
                대표자: ${item.fncoRprNm || "N/A"}
                주소: ${item.fncoAddr || "N/A"}
                설립일: ${item.basDt || "N/A"}
              `;
              } else if (item.topic === "ecos_statistic_word") {
                return `
                키워드: ${item.word || "N/A"}
                내용: ${item.content || "N/A"}
              `;
              } else if (item.topic === "dart_company_info") {
                return `
                기업 고유번호: ${item.corpCode || "N/A"}
                기업명: ${item.corpName || "N/A"}
                기업 영문이름: ${item.corpNameEng || "N/A"}
                주식명: ${item.stockName || "N/A"}
                주식코드: 00${item.stockCode || "N/A"}
                대표이사 이름: ${item.ceoNm || "N/A"}
                법인 구분: ${item.corpCls || "N/A"}
                법인 등록번호: ${item.jurirNo || "N/A"}
                사업자 등록번호: ${item.bizrNo || "N/A"}
                주소: ${item.adres || "N/A"}
                홈페이지URL: ${item.hmUrl || "N/A"}
                전화번호: ${item.phnNo || "N/A"}
                팩스번호: ${item.faxNo || "N/A"}
                업종코드: ${item.indutyCode || "N/A"}
                설립일: ${item.estDt || "N/A"}
                회계년도: 20${item.accMt || "N/A"}년
              `;
              } else {
                console.warn("알 수 없는 토픽:", item.topic);
                return `알 수 없는 토픽: ${item.topic}`;
              }
            })
            .join("\n\n");
          addMessage({
            sender: "bot",
            text: searchResponse,
          });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  const handleNewChat = () => {
    clearChatHistory();
    setActiveTopic(null); // 새 채팅 시작 시 카드 선택 화면이 다시 나타나도록 설정
    setIsCardSelected(false); // 카드 선택 상태 초기화
    setCurrentConversation(null); // 기존 대화 초기화
  };
  return (
    <>
      <Header
        toggleSideBar={toggleSideBar}
        isHeader={false}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <Contain>
        <Screen isDarkMode={isDarkMode}>
          {isSideBarVisible && (
            <ChatBotSideBar
              toggleSideBar={toggleSideBar}
              onNewChat={handleNewChat}
              isOpen={isSideBarVisible}
              isCardSelected={isCardSelected} // 카드 선택 상태 전달
              isDarkMode={isDarkMode}
            />
          )}
          <MessageBox isDarkMode={isDarkMode}>
            {/* currentConversation이 없거나 activeTopic이 없을 때 카드 선택 화면 표시 */}
            {!isCardSelected ? (
              <CardWrapper>
                <CardContainer
                  isDarkMode={isDarkMode}
                  onClick={() => handleCardClick("소비자 동향 지수")}
                >
                  <CardText isDarkMode={isDarkMode}>소비자 동향 지수</CardText>
                </CardContainer>
                <CardContainer
                  isDarkMode={isDarkMode}
                  onClick={() => handleCardClick("기업 개황")}
                >
                  <CardText isDarkMode={isDarkMode}>기업 개황</CardText>
                </CardContainer>
                <CardContainer
                  isDarkMode={isDarkMode}
                  onClick={() => handleCardClick("금융 회사 조회")}
                >
                  <CardText isDarkMode={isDarkMode}>금융 회사 조회</CardText>
                </CardContainer>
              </CardWrapper>
            ) : (
              <>
                <MessagePlace>
                  {currentConversation &&
                    currentConversation.messages.map((message, index) => (
                      <MessageBubble
                        key={index}
                        isDarkMode={isDarkMode}
                        sender={message.sender}
                      >
                        {message.text}
                      </MessageBubble>
                    ))}
                  {isLoading && <LoadingIndicator />}
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
