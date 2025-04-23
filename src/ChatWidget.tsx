import React, { useState } from 'react';
import axios from 'axios';

const ChatWidget = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);

    const res = await axios.post("https://your-backend-url.onrender.com/chat/", {
      message: input,
      user_email: "user@example.com"
    });

    const botMsg = { sender: "bot", text: res.data.reply };
    setMessages([...newMessages, botMsg]);
    setInput("");
  };

  return (
    <div style={{ fontFamily: "sans-serif", width: "100%", maxWidth: "400px" }}>
      <h3>🤖 FreshBot AI</h3>
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto", padding: 10 }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <p><strong>{msg.sender}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
        style={{ width: "80%" }}
      />
      <button onClick={handleSend} style={{ width: "18%" }}>Send</button>
    </div>
  );
};

export default ChatWidget;
