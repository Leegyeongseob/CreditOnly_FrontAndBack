import React from "react";
import { CardContainer, CardText } from "./ChatCardStyles";

const ChatCard = ({ text, onClick }) => {
  return (
    <CardContainer onClick={onClick}>
      <CardText>{text}</CardText>
    </CardContainer>
  );
};

export default ChatCard;
