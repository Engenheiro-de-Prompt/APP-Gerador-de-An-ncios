
import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const strategySchema = {
  type: Type.OBJECT,
  properties: {
    strategy: {
      type: Type.STRING,
      description: "Uma descrição detalhada da estratégia de marketing, focando no público-alvo, nos pontos de dor e nos principais benefícios.",
    },
    adCopy: {
      type: Type.STRING,
      description: "Um texto de anúncio muito curto e impactante, com no máximo 10 palavras.",
    },
  },
  required: ['strategy', 'adCopy'],
};

export const generateAdContent = async (productDescription: string): Promise<{ strategy: string; adCopy: string }> => {
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Analise o seguinte produto e crie uma estratégia de marketing e um texto curto para um anúncio.
Produto: "${productDescription}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: strategySchema,
    },
  });

  try {
    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    if (result.strategy && result.adCopy) {
      return result;
    } else {
      throw new Error("Resposta da IA em formato inválido.");
    }
  } catch (error) {
    console.error("Erro ao processar resposta da IA:", error);
    throw new Error("Não foi possível gerar a estratégia. A resposta da IA pode estar mal formatada.");
  }
};


export const createVisualAd = async (base64Image: string, prompt: string): Promise<string> => {
    const imagePart = {
        inlineData: {
          data: base64Image,
          mimeType: 'image/png',
        },
      };

    const textPart = { text: prompt };

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image-preview',
        contents: { parts: [imagePart, textPart] },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
    }
    
    throw new Error("A IA não retornou uma imagem. Tente novamente.");
};
