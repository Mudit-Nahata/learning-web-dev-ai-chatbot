"use client";
import { useState, useEffect, useRef } from "react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import ModelSelector from "@/components/ModelSelector";

export default function Home() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "User",
      message: "Hello, can you help me with React ?",
      model: "Human",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      sender: "Claude",
      message:
        "Of course! I'd be happy to help you learn React. What specific topic would you like to explore?",
      model: "Claude 3.5 Sonnet",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      sender: "User",
      message: "How do components work?",
      model: "Human",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [selectedModel, setSelectedModel] = useState("llama2");
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = (smooth = true) => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: smooth ? "smooth" : "instant"
      });
    }
  };

  // Scroll when messages change
  useEffect(() => {
    // Only auto-scroll if user hasn't manually scrolled up
    if (shouldAutoScroll) {
      const lastMessage = messages[messages.length - 1];
      const isStreaming = lastMessage?.isStreaming;
      
      // Smooth scroll for new messages, instant for streaming updates (better performance)
      scrollToBottom(!isStreaming);
    }
  }, [messages, shouldAutoScroll]);

  // Check if user has scrolled up
  const handleScroll = () => {
    const container = messagesContainerRef.current;
    if (container) {
      // Check if user is more than 100px from the bottom
      const isScrolledUp = container.scrollHeight - container.scrollTop - container.clientHeight > 100;
      setShowScrollButton(isScrolledUp);
      setShouldAutoScroll(!isScrolledUp); // Disable auto-scroll when user scrolls up
    }
  };

  const addMessage = (newMessage) => {
    setMessages((prev) => {
      // Check if message with this ID already exists (for streaming updates)
      const existingIndex = prev.findIndex(msg => msg.id === newMessage.id);
      
      if (existingIndex >= 0) {
        // Update existing message (streaming update)
        const updated = [...prev];
        updated[existingIndex] = newMessage;
        return updated;
      } else {
        // Add new message
        return [...prev, newMessage];
      }
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-4 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            AI Chat Hub
          </h1>
          <p className="text-gray-300 text-lg">
            Multi-Model AI Assistant with Real-time Streaming
          </p>
        </div>

        {/* Chat Container */}
        <div className="max-w-4xl mx-auto">
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
          />

          {/* Messages Container */}
          <div 
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl mb-6 p-6 max-h-[60vh] overflow-y-auto custom-scrollbar relative"
          >
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                sender={msg.sender}
                message={msg.message}
                model={msg.model}
                isStreaming={msg.isStreaming}
              />
            ))}
            {/* Invisible div for auto-scroll */}
            <div ref={messagesEndRef} />
            
            {/* Scroll to bottom button */}
            {showScrollButton && (
              <button
                onClick={() => {
                  setShouldAutoScroll(true);
                  scrollToBottom(true);
                }}
                className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 animate-bounce z-10"
                aria-label="Scroll to bottom"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            )}
          </div>

          <ChatInput onMessageSent={addMessage} selectedModel={selectedModel} />
        </div>
      </div>
    </div>
  );
}
