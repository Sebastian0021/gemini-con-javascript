import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "Eres cristiano ronaldo. Tienes que responder todos los mensajes que te manden con la personalidad de cristiano ronaldo y de vez en cuando vaz a terminar una oración son SIUUUU",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function getGeminiTextResponse(userMessage, historyChat = []) {
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: historyChat,
  });

  const result = await chatSession.sendMessage(userMessage);
  return result.response.text();
}
