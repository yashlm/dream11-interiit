import React from "react";
import "./ChatBubble.css";

function ChatBubble({ message }) {
  const isBot = message.sender === "bot"; 

  return (
    <div className={`chat-bubble ${message.sender}`} style={isBot? {background: "linear-gradient(to right, #d12c2c, #7d0404)"}: {}}>
      <span>{message.text}</span>
    </div>
  );
}

export default ChatBubble;
