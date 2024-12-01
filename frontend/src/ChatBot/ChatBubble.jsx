import React from "react";
import "./ChatBubble.css";

function ChatBubble({ message }) {
  const isBot = message.sender === "bot"; 

  return (
    <div className={`chat-bubble ${message.sender}`}>
      <span>{message.text}</span>
    </div>
  );
}

export default ChatBubble;
