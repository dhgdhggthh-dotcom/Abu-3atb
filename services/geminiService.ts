
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateSummary(experience: string): Promise<string> {
  const prompt = `Based on the following professional experience, create a short, catchy, and professional one-sentence tagline or summary suitable for a business card. The summary should be impactful and concise. Do not use markdown.

Experience: "${experience}"

Summary:`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    if (response.text) {
      return response.text.trim();
    } else {
      throw new Error("The API response did not contain any text.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
}
