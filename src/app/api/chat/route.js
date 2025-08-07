export async function POST(request) {
  const body = await request.json();
  const selectedModel = body.model || "llama2";
  const userMessage = body.message;

  const isGroqModel =
    selectedModel.includes("llama-3.3") ||
    selectedModel.includes("deepseek-r1") ||
    selectedModel.includes("gemma2");

  try {
    if (isGroqModel) {
      const groqResponse = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: selectedModel,
            messages: [{ role: "user", content: userMessage }],
            temperature: 0.7,
          }),
        }
      );

      const data = await groqResponse.json();

      return Response.json({
        message: data.choices[0].message.content,
        model: `Groq ${selectedModel}`,
        timestamp: new Date().toISOString(),
      });
    } else {
      const ollamaResponse = await fetch(
        "http://localhost:11434/api/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: selectedModel,
            prompt: userMessage,
            stream: false,
          }),
        }
      );

      const data = await ollamaResponse.json();

      return Response.json({
        message: data.response,
        model: "Ollama ${selecteModel}",
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error("Ollama error:", error);

    return Response.json({
      message: "Sorry, I'm having trouble connecting to Ollama",
      model: "Error",
      timestamp: new Date().toISOString(),
    });
  }
}
