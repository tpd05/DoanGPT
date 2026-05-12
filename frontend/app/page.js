"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Gemini Chatbot</h1>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nhập câu hỏi..."
        style={{ width: "300px", padding: "10px" }}
      />

      <button onClick={sendMessage} style={{ marginLeft: 10 }}>
        Gửi
      </button>

      <pre style={{ marginTop: 20 }}>{reply}</pre>
    </div>
  );
}