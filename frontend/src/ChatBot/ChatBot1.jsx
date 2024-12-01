import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import "./ChatBot.css";
import { BASE_URL } from "../constants.jsx";

function ChatBot({ isChatOpen, setIsChatOpen }) {
  const greetings = [
    "Hello! How can I help you today?",
    "Hi there! What can I assist you with?",
    "Welcome! How may I help you?",
    "Greetings! What brings you here today?"
  ];

  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // New state for processing

  const messagesEndRef = useRef(null); // Reference for the last message
  

  useEffect(() => {
    if (isChatOpen && messages.length === 0) {
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([{ text: randomGreeting, sender: "bot" }]);
    }
  }, [isChatOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUserInput = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Add user message
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages, { text: input, sender: "user" }];
      localStorage.setItem('chatHistory', JSON.stringify(newMessages));
      return newMessages;
    });

    // Show processing bubble
    setIsProcessing(true);

    try {
      const response = await axios.post(`${BASE_URL}/chat/bot`, {
        question: input,
      });

      // Add bot response
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, { text: response.data.response, sender: "bot" }];
        localStorage.setItem('chatHistory', JSON.stringify(newMessages));
        return newMessages;
      });
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, { text: "Sorry, something went wrong. Please try again.", sender: "bot" }];
        localStorage.setItem('chatHistory', JSON.stringify(newMessages));
        return newMessages;
      });
    } finally {
      // Hide processing bubble after receiving response
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      setInput("");
      handleUserInput(e); 
    }
  };

  return (
    <div className={`chatbot ${isChatOpen ? "open" : ""}`}>
      <div className="chat-window">
        <div className="chat-header">
          <span>ChatBot</span>
          <button className="close-button" onClick={() => setIsChatOpen(false)}>✕</button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}
          {isProcessing && (
            <ChatBubble key="processing" message={{ text: <span className="loading-dots">...</span>, sender: "bot" }} />
          )}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-input" onSubmit={handleUserInput}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown} 
            placeholder="Type a message..."
          />
          <button type="submit"
          disabled={!input.trim()} 
          style={input.trim() ? {} : {backgroundColor:"gray"}}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBot;
