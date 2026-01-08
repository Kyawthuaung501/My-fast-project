
import { GoogleGenAI, Type } from "@google/genai";
import { MarketingPlan } from './types';

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

const extractJSON = (text: string): any => {
  try {
    const cleanText = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanText);
  } catch (e) {
    const firstOpen = text.indexOf('{');
    const lastClose = text.lastIndexOf('}');
    if (firstOpen !== -1 && lastClose !== -1) {
      try {
        return JSON.parse(text.substring(firstOpen, lastClose + 1));
      } catch (e2) {
        throw new Error("Invalid AI format.");
      }
    }
    throw new Error("Parsing failed.");
  }
};

export const generateMarketingContent = async (input: { 
  link?: string; 
  image?: { data: string; mimeType: string };
  price?: string;
  phone?: string;
}): Promise<MarketingPlan & { sources?: string[] }> => {
  const ai = getAI();
  const prompt = `
    Analyze ${input.link ? `this link: ${input.link}` : 'this product image'} and create a viral Facebook sales post for Myanmar.
    Price: ${input.price || 'Ask Price'}
    Phone: ${input.phone || 'Contact us'}
    Ensure the tone is persuasive and uses trending Myanmar social media slang.
  `;

  // Fix: Upgraded to 'gemini-3-pro-preview' for complex marketing analysis and creative script generation
  const result = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: { 
      parts: [
        { text: prompt },
        ...(input.image ? [{ inlineData: { data: input.image.data, mimeType: input.image.mimeType } }] : [])
      ] 
    },
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productName: { type: Type.STRING },
          postCaption: { type: Type.STRING },
          hashtags: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          postingTimeSuggestion: { type: Type.STRING },
          strategyAdvice: { type: Type.STRING },
          videoScript: { type: Type.STRING }
        },
        required: ["productName", "postCaption", "hashtags", "postingTimeSuggestion", "strategyAdvice", "videoScript"]
      },
      // Fix: Only use googleSearch tool when a link is provided, adhering to grounding guidelines
      tools: input.link ? [{ googleSearch: {} }] : []
    }
  });

  const plan = extractJSON(result.text || '');
  
  const sources: string[] = [];
  if (result.candidates?.[0]?.groundingMetadata?.groundingChunks) {
    result.candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
      if (chunk.web?.uri) sources.push(chunk.web.uri);
    });
  }

  return { ...plan, sources };
};

export const generateProductVisual = async (productName: string): Promise<string> => {
  const ai = getAI();
  // Fix: Use 'gemini-2.5-flash-image' as the default for high-quality image generation tasks
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: `Cinematic high-end commercial product shot of ${productName}. Studio lighting, minimalist aesthetic, 8k resolution.` }] }
  });
  
  const imgPart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
  if (imgPart?.inlineData) return `data:image/png;base64,${imgPart.inlineData.data}`;
  throw new Error("Visual generation failed.");
};

export const generateLogo = async (brandName: string, style: string): Promise<string> => {
  const ai = getAI();
  // Fix: Use 'gemini-2.5-flash-image' for professional brand logo creation
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: { parts: [{ text: `Professional ${style} logo for '${brandName}'. Vector style, high quality, clean lines.` }] }
  });
  const imgPart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
  if (imgPart?.inlineData) return `data:image/png;base64,${imgPart.inlineData.data}`;
  throw new Error("Logo generation failed.");
};
