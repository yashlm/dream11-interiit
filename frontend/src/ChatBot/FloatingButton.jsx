import React from "react";
import "./FloatingButton.css";

function FloatingButton({ setIsChatOpen, isChatOpen }) {
  return (
    <div
      className={`floating-button ${isChatOpen ? 'hidden' : ''}`}
      onClick={() => setIsChatOpen(prev => !prev)}
    >
      💬
    </div>
  );
}

export default FloatingButton;
