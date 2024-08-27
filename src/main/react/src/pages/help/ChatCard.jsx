import React from "react";
import { CardContainer, CardText } from "./ChatCardStyles";

const ChatCard = ({ text, onClick, isDarkMode }) => {
  return (
    <CardContainer onClick={onClick} isDarkMode={isDarkMode}>
      <CardText>{text}</CardText>
    </CardContainer>
  );
};

export default ChatCard;
