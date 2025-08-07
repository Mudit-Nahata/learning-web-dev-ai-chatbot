# 🤖 AI Chat Hub

A modern, multi-model AI chat application with real-time streaming responses. Built with Next.js, Express, and Tailwind CSS.

![AI Chat Hub Demo](https://via.placeholder.com/800x400/1a1a2e/fff?text=AI+Chat+Hub+Demo)

## ✨ Features

- 🔥 **Real-time Streaming** - ChatGPT-like typing effect with Server-Sent Events
- 🤖 **Multi-Model Support** - Ollama (local) + Groq (cloud) AI models
- 🎨 **Modern UI** - Glassmorphism design with smooth animations
- 📱 **Responsive** - Works perfectly on desktop and mobile
- ⚡ **Fast & Efficient** - Optimized streaming and state management
- 🛡️ **Secure** - Environment variables and CORS protection

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first styling with custom animations
- **React Hooks** - Modern state management
- **Server-Sent Events** - Real-time data streaming

### Backend
- **Express.js** - RESTful API server
- **Server-Sent Events** - Real-time streaming protocol
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - Request logging

### AI Models
- **Ollama** - Local AI models (Llama2, DeepSeek, Qwen)
- **Groq** - Cloud-based AI models with lightning-fast inference

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- Ollama installed (for local models)
- Groq API key (for cloud models)

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/ai-chat-hub.git
cd ai-chat-hub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env.local`:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Backend Setup
Clone and set up the Express backend:
```bash
# In a separate terminal
git clone https://github.com/YOUR_USERNAME/ai-chat-backend.git
cd ai-chat-backend
npm install

# Create .env file
echo "GROQ_API_KEY=your_groq_api_key_here" > .env

# Start backend server
npm run dev
```

### 5. Start Frontend
```bash
# Back to frontend directory
npm run dev
```

Visit `http://localhost:3000` 🎉

## 🎯 Usage

1. **Select AI Model** - Choose between local Ollama or cloud Groq models
2. **Type Message** - Enter your question or prompt in the beautiful input
3. **Watch Magic** - See real-time streaming responses appear character by character
4. **Enjoy** - Experience professional ChatGPT-like interaction

## 🤖 Supported Models

### Local (Ollama)
- 🦙 **Llama2** - Fast general-purpose model (3.8GB)
- 🧠 **DeepSeek R1** - Advanced reasoning capabilities (9GB)
- ⚡ **Qwen3 32B** - Most powerful local model (20GB)

### Cloud (Groq)
- ☁️ **Llama 3.3 70B** - Latest Meta model with versatile capabilities
- 🔬 **DeepSeek R1 Distill** - Optimized reasoning model
- 💎 **Gemma2 9B** - Google's efficient and capable model

## 🎨 UI Features

- **Glassmorphism Design** - Modern transparent blur effects throughout
- **Animated Backgrounds** - Dynamic gradient blob animations
- **Smooth Transitions** - Slide-in animations for all messages
- **Interactive Elements** - Hover effects and visual feedback
- **Custom Scrollbar** - Beautiful chat scrolling experience
- **Typing Indicators** - Real-time streaming visualization with bouncing dots
- **Character Counter** - Visual feedback with color-coded limits
- **Mobile Responsive** - Optimized for all screen sizes

## 🔧 Architecture

```
┌─────────────────┐    HTTP/SSE    ┌─────────────────┐    API Calls    ┌─────────────────┐
│   Next.js UI   │──────────────▶ │  Express API    │──────────────▶ │   AI Models     │
│   (Frontend)    │                │   (Backend)     │                │ (Ollama/Groq)   │
│  Port: 3000     │                │   Port: 5000    │                │                 │ 
└─────────────────┘                └─────────────────┘                └─────────────────┘
        │                                  │                                  │
   React State                    Server-Sent Events                  Streaming
  Management &                    Real-time Streaming                Responses
   Components                     Error Handling                      Multi-Provider
```

## 🎬 Key Features Explained

### Real-time Streaming
- Uses Server-Sent Events (SSE) for real-time data flow
- Messages appear character by character like ChatGPT
- Smooth typing indicators and visual feedback

### Multi-Model Architecture
- Seamless switching between local and cloud AI models
- Automatic provider detection and routing
- Fallback handling for failed requests

### Modern UI/UX
- Glassmorphism design with backdrop blur effects
- Custom animations and transitions
- Professional color schemes and typography

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Railway/Heroku/DigitalOcean)
```bash
# Set environment variables in your platform
# Deploy Express server
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai/) - Local AI model runtime
- [Groq](https://groq.com/) - Fast AI inference platform  
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Next.js](https://nextjs.org/) - The React framework for production

## 🐛 Troubleshooting

### Common Issues

**Backend Connection Error**
- Ensure Express server is running on port 5000
- Check CORS configuration matches frontend URL

**Ollama Models Not Found**
- Install Ollama: `curl -fsSL https://ollama.ai/install.sh | sh`
- Pull models: `ollama pull llama2`

**Groq API Issues**
- Verify API key is correctly set in `.env`
- Check Groq dashboard for rate limits

---

⭐ **Star this repo if you found it helpful!**

Built with ❤️ by [Your Name](https://github.com/YOUR_USERNAME)
