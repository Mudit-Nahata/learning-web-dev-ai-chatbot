const ChatMessage = (props) => {
  const isUser = props.sender === "User";
  const isStreaming = props.isStreaming;

  return (
    <div
      className={`flex mb-6 animate-slide-in-up ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-xs sm:max-w-md lg:max-w-2xl p-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
          isUser
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white ml-4"
            : "glass text-white mr-4"
        }`}
      >
        {/* Message header */}
        <div
          className={`flex items-center justify-between mb-2 ${
            isUser ? "text-blue-100" : "text-gray-300"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                isUser ? "bg-blue-200" : "bg-green-400"
              }`}
            ></div>
            <span className="text-xs font-medium">{props.sender}</span>
            {isStreaming && (
              <div className="ml-2 flex items-center">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce animation-delay-200"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce animation-delay-400"></div>
                </div>
                <span className="ml-2 text-xs text-blue-300">typing...</span>
              </div>
            )}
          </div>
        </div>

        {/* Message content */}
        <div
          className={`text-sm sm:text-base leading-relaxed ${
            isUser ? "text-white" : "text-gray-100"
          }`}
        >
          {props.message}
          {isStreaming && (
            <span className="inline-block w-3 h-5 bg-current animate-pulse ml-1 opacity-75">
              |
            </span>
          )}
        </div>

        {/* Message footer */}
        <div
          className={`text-xs mt-2 flex justify-between items-center ${
            isUser ? "text-blue-200" : "text-gray-400"
          }`}
        >
          <span>{props.model}</span>
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>

        {/* Message tail */}
        <div
          className={`absolute top-4 w-3 h-3 transform rotate-45 ${
            isUser
              ? "right-[-6px] bg-gradient-to-r from-blue-500 to-purple-600"
              : "left-[-6px] glass"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default ChatMessage;
