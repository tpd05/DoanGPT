'use client';

import { useState, useRef, useEffect } from 'react';
import FadeIn from '../reusable/FadeIn';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [isNameDetected, setIsNameDetected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch welcome message on mount
  useEffect(() => {
    fetchWelcomeMessage();
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchWelcomeMessage = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BACKEND_URL}/chat/welcome`);
      const data = await response.json();

      const botMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: data.reply,
        timestamp: new Date(),
      };

      setMessages([botMessage]);
    } catch (error) {
      console.error('Error fetching welcome message:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        text: 'Xin lỗi, em không thể kết nối với server. Vui lòng thử lại sau.',
        timestamp: new Date(),
      };
      setMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          username: username,
        }),
      });

      const data = await response.json();

      // Update username and detection status
      if (data.is_name_detected && !isNameDetected) {
        setUsername(data.username);
        setIsNameDetected(true);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: data.reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
<section className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
  {/* Heading */}
  <FadeIn delay={0} y={40}>
    <h2
      className="
        hero-heading
        font-black
        uppercase
        text-center
        mb-8
        tracking-tight
        bg-gradient-to-r
        from-white
        via-blue-100
        to-blue-400
        bg-clip-text
        text-transparent
        drop-shadow-[0_0_25px_rgba(59,130,246,0.35)]
      "
      style={{ fontSize: "clamp(2.5rem, 10vw, 140px)" }}
    >
      DoanGPT
    </h2>
        <p className="mt-4 text-white text-base sm:text-lg font-medium max-w-2xl mx-auto px-4">
      First, please enter your name so that DoanGPT can address you more easily.
    </p>
  </FadeIn>

  {/* Chat Container */}
  <FadeIn delay={0.1} y={40}>
    <div
      className="
        w-full
        max-w-5xl
        h-[75vh]
        min-h-[500px]
        max-h-[900px]
        bg-white/5
        backdrop-blur-2xl
        
        border
        border-white/10
        shadow-[0_20px_80px_rgba(0,0,0,0.45)]
        flex
        flex-col
        overflow-hidden
      "
    >
{/* Messages Container */}
<div
  className="
    flex-1
    overflow-y-auto
    overflow-x-hidden
    px-4
    sm:px-6
    py-6
    space-y-4
    scroll-smooth

    /* Custom Scrollbar */
    scrollbar-thin
    scrollbar-thumb-white/20
    scrollbar-thumb-rounded-full
    scrollbar-track-transparent
  "
>
  {messages.length === 0 ? (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-400 text-center text-base">
        Đang tải...
      </p>
    </div>
  ) : (
    <>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.type === "user"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`
              max-w-[85%]
              mx-2 sm:mx-4
              px-6 sm:px-7
              py-4
              overflow-hidden
              text-sm
              sm:text-base
              leading-relaxed
              shadow-lg
              ${
                msg.type === "user"
                  ? `
                    bg-gradient-to-r
                    from-blue-500
                    to-blue-600
                    text-white
                    rounded-3xl
                    rounded-br-md
                    rounded-tr-md
                    shadow-blue-500/25
                  `
                  : `
                    bg-white/10
                    backdrop-blur-md
                    text-gray-100
                    border
                    border-white/10
                    rounded-3xl
                    rounded-tl-md
                    rounded-bl-md
                  `
              }
            `}
          >
            <p
              className="
                m-0
                ml-1
                whitespace-pre-wrap
                break-words
              "
            >
              {msg.text}
            </p>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-3xl rounded-bl-md">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </>
  )}
</div>

      {/* Input Area */}
      <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Nhập tin nhắn..."
            disabled={isLoading}
            className="
              flex-1
              px-5
              py-3.5
              text-sm
              sm:text-base
              rounded-full
              bg-white/10
              backdrop-blur-md
              border
              border-white/10
              text-white
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500/50
              focus:border-blue-400
              transition-all
              duration-200
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          />

          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="
              w-12
              h-12
              rounded-full
              bg-gradient-to-r
              from-blue-500
              to-blue-600
              text-white
              hover:scale-105
              hover:shadow-lg
              hover:shadow-blue-500/30
              transition-all
              duration-200
              disabled:opacity-50
              disabled:cursor-not-allowed
              flex
              items-center
              justify-center
              text-lg
              font-semibold
            "
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  </FadeIn>

  {/* Info Text */}
  <FadeIn delay={0.2} y={40}>
    <div className="mt-6 text-center max-w-4xl px-4">
      <p className="text-gray-400 text-sm sm:text-base">
        {username ? (
          <span>
            DoanGPT có thể mắc lỗi. Hãy kiểm tra các thông tin quan trọng.
          </span>
        ) : null}
      </p>
    </div>
  </FadeIn>
</section>
  );
}
