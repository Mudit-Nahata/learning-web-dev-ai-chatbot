# 🚀 AI Chat Backend

Express.js backend server with real-time streaming support for the AI Chat Hub application.

## ✨ Features

- 🔥 **Real-time Streaming** - Server-Sent Events (SSE) for live AI responses
- 🤖 **Multi-Provider Support** - Ollama (local) + Groq (cloud) integration
- 🛡️ **Security** - CORS, Helmet, and environment variable protection
- 📊 **Logging** - Morgan request logging for debugging
- ⚡ **Performance** - Compression middleware and optimized streaming

## 🚀 Tech Stack

- **Express.js** - Fast, unopinionated web framework
- **Server-Sent Events** - Real-time streaming protocol
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Compression** - Response compression

## 🛠️ Installation

### Prerequisites
- Node.js 18+
- Ollama installed (for local models)
- Groq API key (for cloud models)

### 1. Clone & Install
```bash
git clone https://github.com/Mudit-Nahata/ai-chat-backend.git
cd ai-chat-backend
npm install
```

### 2. Environment Setup
Create `.env`:
```env
PORT=5000
NODE_ENV=development
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Start Server
```bash
# Development
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### Health Check
```http
GET /
```
Returns API information and available endpoints.

### Health Status
```http
GET /health
```
Returns server health status.

### Chat (Non-streaming)
```http
POST /api/chat
Content-Type: application/json

{
  "message": "Hello AI!",
  "model": "llama2"
}
```

### Chat Streaming
```http
POST /api/chat/stream
Content-Type: application/json

{
  "message": "Tell me a story",
  "model": "llama-3.3-70b-versatile"
}
```

**Response Format (SSE):**
```
data: {"chunk": "Hello", "model": "Groq llama-3.3-70b-versatile"}

data: {"chunk": " there!", "model": "Groq llama-3.3-70b-versatile"}

data: {"done": true}
```

## 🤖 Supported Models

### Ollama (Local)
- `llama2` - Llama2 7B model
- `deepseek-r1:14b` - DeepSeek R1 14B model  
- `qwen3:32b` - Qwen3 32B model

### Groq (Cloud)
- `llama-3.3-70b-versatile` - Llama 3.3 70B
- `deepseek-r1-distill-llama-70b` - DeepSeek R1 Distill
- `gemma2-9b-it` - Gemma2 9B

## 🔧 Architecture

```
┌─────────────────┐
│   Client        │
│   Request       │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Middleware    │
│   • CORS        │
│   • Helmet      │
│   • Morgan      │
│   • Compression │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   Routes        │
│   /api/chat     │
│   /api/chat/    │
│   stream        │
└─────────┬───────┘
          │
          ▼
┌─────────────────┐
│   AI Services   │
│   • Ollama API  │
│   • Groq API    │
└─────────────────┘
```

## 🔒 Security Features

- **CORS Protection** - Configurable origin whitelist
- **Helmet Middleware** - Security headers
- **Environment Variables** - Secure API key management
- **Input Validation** - Request payload validation
- **Error Handling** - Graceful error responses

## 🚀 Deployment

### Environment Variables
```env
PORT=5000
NODE_ENV=production
GROQ_API_KEY=your_production_api_key
```

### Railway
```bash
railway login
railway link
railway up
```

### Heroku
```bash
heroku create your-app-name
heroku config:set GROQ_API_KEY=your_api_key
git push heroku main
```

### PM2 (Self-hosted)
```bash
npm install -g pm2
pm2 start server.js --name "ai-chat-backend"
pm2 startup
pm2 save
```

## 📊 Monitoring

### Logs
```bash
# Development logs
npm run dev

# Production logs with PM2
pm2 logs ai-chat-backend
```

### Health Check
```bash
curl http://localhost:5000/health
```

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 5000
npx kill-port 5000
```

**CORS Errors**
- Check `origin` setting in server.js
- Ensure frontend URL matches CORS configuration

**Ollama Connection Failed**
```bash
# Start Ollama service
ollama serve

# Pull required models
ollama pull llama2
ollama pull deepseek-r1:14b
```

**Groq API Issues**
- Verify API key in `.env`
- Check Groq dashboard for rate limits
- Ensure model names match exactly

## 📁 Project Structure

```
my-ai-chat-backend/
├── server.js           # Main server file
├── routes/
│   └── chat.js        # Chat API routes
├── services/          # AI service integrations
├── middleware/        # Custom middleware
├── .env              # Environment variables
├── package.json      # Dependencies
└── README.md         # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

Built with ❤️ for [AI Chat Hub](https://github.com/Mudit-Nahata/ai-chat-hub)
