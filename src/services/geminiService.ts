
import { GoogleGenAI } from "@google/genai";
import { PROJECTS, EXPERIENCE, EDUCATION, BIO, SKILLS } from "../constants.tsx";

export const getAIResponse = async (userMessage: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are the AI assistant for Aakash Rajbhar, a Full Stack Developer.
    Your tone is professional, confident, and helpful.
    
    Professional Snapshot:
    - Bio: ${BIO}
    - Key Projects: ${PROJECTS.map(p => `${p.title}: ${p.description}`).join('\n')}
    - Work Experience: ${EXPERIENCE.map(e => `${e.role} at ${e.company} (${e.year})`).join('\n')}
    - Education: ${EDUCATION.map(ed => `${ed.degree} from ${ed.institution} (${ed.year})`).join('\n')}
    - Technical Stack:
      * Languages: ${SKILLS.languages.join(', ')}
      * Web: ${SKILLS.web.join(', ')}
      * Databases: ${SKILLS.database.join(', ')}
      * Tools: ${SKILLS.tools.join(', ')}
    
    Answer questions about Aakash's technical skills, internship achievements, and project details (like SecureKeep's AES-256 encryption). If you don't know something, suggest they reach out via email: akash.kumarajbhar@gmail.com.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently updating my knowledge base. Please feel free to explore my projects or reach out via email!";
  }
};
