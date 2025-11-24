import { GoogleGenAI, Type } from "@google/genai";
import { AiAnalysisResult } from "../types";

export const analyzePhotoVibe = async (base64Image: string): Promise<AiAnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  // Remove data:image/png;base64, prefix if present
  const base64Data = base64Image.split(',')[1] || base64Image;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/png",
              data: base64Data
            }
          },
          {
            text: "Hãy phân tích bức ảnh photobooth này. Đưa ra một nhận xét ngắn gọn, vui nhộn và 'trendy' dành cho Gen Z bằng tiếng Việt. Chấm điểm 'thần thái' từ 1-10. Đưa ra 3 hashtag liên quan. Trả về định dạng JSON."
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caption: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            emoji: { type: Type.STRING, description: "Một emoji đại diện cho bức ảnh" },
            score: { type: Type.NUMBER, description: "Điểm thần thái" }
          },
          required: ["caption", "tags", "emoji", "score"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("Không nhận được phản hồi từ AI");

    return JSON.parse(resultText) as AiAnalysisResult;

  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      caption: "Siêu phẩm! Đẹp không góc chết!",
      tags: ["#photobooth", "#tuoitre", "#chill"],
      emoji: "✨",
      score: 10
    };
  }
};