"use client";

import { useState, useEffect, useRef } from "react";

const ModelSelector = ({ onModelChange, selectedModel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const models = [
    { id: "llama2", name: "Llama2 (Fast)", size: "3.8 GB", provider: "ollama", icon: "🦙" },
    { id: "deepseek-r1:14b", name: "DeepSeek R1 (Reasoning)", size: "9 GB", provider: "ollama", icon: "🧠" },
    { id: "qwen3:32b", name: "Qwen3 (Most Powerful)", size: "20 GB", provider: "ollama", icon: "⚡" },
    {
      id: "llama-3.3-70b-versatile",
      name: "Llama 3.3 70B (Groq)",
      provider: "groq",
      size: "Cloud",
      icon: "☁️"
    },
    {
      id: "deepseek-r1-distill-llama-70b",
      name: "DeepSeek R1 Distill (Groq)",
      provider: "groq",
      size: "Cloud",
      icon: "🔬"
    },
    {
      id: "gemma2-9b-it",
      name: "Gemma2 9B (Groq)",
      provider: "groq",
      size: "Cloud",
      icon: "💎"
    },
  ];

  const selectedModelData = models.find(m => m.id === selectedModel);

  return (
    <div className="mb-6 animate-float relative z-50">
      <div className="glass rounded-2xl p-6 border border-white/20 shadow-xl">
        <label className="block text-white text-sm font-semibold mb-4 flex items-center">
          <span className="mr-2">🤖</span>
          Choose AI Model:
        </label>
        
        {/* Custom Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-4 backdrop-blur-xl bg-gray-800/90 rounded-xl border border-white/30 text-white text-left flex items-center justify-between hover:border-white/50 hover:bg-gray-700/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{selectedModelData?.icon}</span>
              <div>
                <div className="font-medium">{selectedModelData?.name}</div>
                <div className="text-xs text-gray-300">{selectedModelData?.size}</div>
              </div>
            </div>
            <svg
              className={`w-5 h-5 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <>
              {/* Backdrop overlay */}
              <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]" onClick={() => setIsOpen(false)}></div>
              
              {/* Dropdown content */}
              <div className="absolute top-full left-0 w-full mt-2 backdrop-blur-xl bg-gray-900/95 rounded-xl border border-white/30 shadow-2xl z-[9999] overflow-hidden animate-slide-in-up">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    onModelChange(model.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-4 text-left hover:bg-white/20 transition-all duration-200 flex items-center ${
                    selectedModel === model.id ? 'bg-purple-600/50' : ''
                  }`}
                >
                  <span className="text-2xl mr-3">{model.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-white">{model.name}</div>
                    <div className="text-xs text-gray-300 flex items-center">
                      <span>{model.size}</span>
                      <span className="mx-2">•</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        model.provider === 'groq' 
                          ? 'bg-blue-500/20 text-blue-300' 
                          : 'bg-green-500/20 text-green-300'
                      }`}>
                        {model.provider === 'groq' ? 'Cloud' : 'Local'}
                      </span>
                    </div>
                  </div>
                  {selectedModel === model.id && (
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  )}
                </button>
              ))}
              </div>
            </>
          )}
        </div>

        {/* Provider Info */}
        <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center text-sm text-gray-300">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              selectedModelData?.provider === "groq" ? "bg-blue-400" : "bg-green-400"
            }`}></div>
            <span>
              {selectedModelData?.provider === "groq"
                ? "🌐 Cloud-based (requires internet connection)"
                : "💻 Local (runs on your machine)"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;
