import { GoogleGenAI } from "@google/genai";

// Vite exposes env vars via import.meta.env; use VITE_ prefix so it is injected at build
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

export const generateLessonHelp = async (
  query: string,
  context: string,
  history: { role: string; text: string }[],
  modelType: 'pro' | 'fast' = 'pro'
): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing. Please configure the environment.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Feature: "Fast AI responses" uses gemini-2.5-flash-lite
    // Feature: "AI powered chatbot" uses gemini-3-pro-preview
    const modelName = modelType === 'fast' ? 'gemini-2.5-flash-lite' : 'gemini-3-pro-preview';

    const systemPrompt = `
      Context: The user is a student at Noor High School, currently viewing a lesson about "${context}".
      System: You are an encouraging and helpful AI teaching assistant. 
      ${modelType === 'fast' ? 'Provide a very concise, quick answer.' : 'Provide a detailed, reasoned, and helpful explanation.'}
      
      User Question: ${query}
    `;

    // Map history to the correct format for @google/genai
    const contents = [
      ...history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      })),
      { role: 'user', parts: [{ text: query }] }
    ];

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the AI tutor right now.";
  }
};

export const analyzeVideo = async (
  videoBase64: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  if (!apiKey) {
    return "Error: API Key is missing.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Feature: "Video understanding" uses gemini-3-pro-preview
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          { 
            inlineData: {
              mimeType: mimeType,
              data: videoBase64
            }
          },
          { text: prompt || "Analyze this video and describe the key events." }
        ]
      }
    });

    return response.text || "I couldn't analyze the video.";
  } catch (error) {
    console.error("Gemini Video Analysis Error:", error);
    return "Failed to analyze video.";
  }
};

export const generateGlobalChatResponse = async (
  query: string,
  pageContext: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  if (!apiKey) return "Error: API Key is missing.";

  try {
    const ai = new GoogleGenAI({ apiKey });
    // Using gemini-2.5-flash-lite for responsive general support
    const modelName = 'gemini-2.5-flash-lite'; 

    const systemPrompt = `
      You are the official AI Support Agent for Noor High School.
      The user is currently on this page: ${pageContext}.
      
      Your Role:
      1. Explain what the current page is for.
      2. Help with navigation (e.g., "Where is my dashboard?").
      3. Answer questions about the school (Mission: Modern education, Location: Addis Ababa).
      4. Be friendly, professional, and concise.

      Current Page Context Hint:
      - 'home': Main marketing page.
      - 'dashboard': Student grades and progress.
      - 'my-courses': List of enrolled subjects.
      - 'register': Student sign up form.
      - 'lesson': Active learning session.
    `;

    const contents = [
      ...history.map(msg => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      })),
      { role: 'user', parts: [{ text: query }] }
    ];

    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: { systemInstruction: systemPrompt }
    });

    return response.text || "I'm here to help, but I couldn't process that.";
  } catch (error) {
    console.error("Gemini Global Chat Error:", error);
    return "Support system is currently offline.";
  }
};