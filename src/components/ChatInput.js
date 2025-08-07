"use client";
import { useState } from "react";

const ChatInput = ({ onMessageSent, selectedModel }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log("Message sent:", message);

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      sender: "User",
      message: message,
      model: "Human",
      timestamp: new Date().toISOString(),
    };
    onMessageSent(userMessage);

    // Create AI message placeholder for streaming
    const aiMessageId = Date.now() + 1;
    const aiMessage = {
      id: aiMessageId,
      sender: "AI",
      message: "", // Will be filled by streaming
      model: `Streaming ${selectedModel}`,
      timestamp: new Date().toISOString(),
      isStreaming: true, // Flag to indicate streaming in progress
    };
    onMessageSent(aiMessage);

    // Clear input immediately
    const currentMessage = message;
    setMessage("");

    try {
      // Use fetch with streaming reader for real-time responses
      const response = await fetch('http://localhost:5000/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          model: selectedModel
        })
      });

      if (!response.body) {
        throw new Error('No response body for streaming');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedMessage = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.chunk) {
                // Accumulate message chunks
                accumulatedMessage += data.chunk;
                
                // Update the streaming message
                const updatedMessage = {
                  id: aiMessageId,
                  sender: "AI",
                  message: accumulatedMessage,
                  model: data.model,
                  timestamp: new Date().toISOString(),
                  isStreaming: true,
                };
                onMessageSent(updatedMessage);
              }
              
              if (data.done) {
                // Mark streaming as complete
                const finalMessage = {
                  id: aiMessageId,
                  sender: "AI", 
                  message: accumulatedMessage,
                  model: data.model || `${selectedModel}`,
                  timestamp: new Date().toISOString(),
                  isStreaming: false,
                };
                onMessageSent(finalMessage);
                return; // Exit the function
              }
              
            } catch (parseError) {
              console.error('Error parsing streaming data:', parseError);
            }
          }
        }
      }

    } catch (error) {
      console.error("Streaming Error:", error);
      
      // Update message with error
      const errorMessage = {
        id: aiMessageId,
        sender: "AI",
        message: "Sorry, I encountered an error while processing your request.",
        model: "Error",
        timestamp: new Date().toISOString(),
        isStreaming: false,
      };
      onMessageSent(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-slide-in-up">
      <div className="glass rounded-2xl p-4 border border-white/20 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              placeholder="Type your message to AI..."
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 pr-12 glass rounded-xl border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!message.trim()}
            className="group relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <div className="flex items-center space-x-2">
              <svg 
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              <span className="hidden sm:inline">Send</span>
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10"></div>
          </button>
        </div>
        
        {/* Character count and tips */}
        <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span>💡 Tip: Try asking about code, explanations, or creative writing</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{message.length}/2000</span>
            <div className={`w-1 h-4 rounded-full ${
              message.length > 1800 ? 'bg-red-400' : 
              message.length > 1200 ? 'bg-yellow-400' : 'bg-green-400'
            }`}></div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
