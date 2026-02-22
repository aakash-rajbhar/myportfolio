import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { RESUME_DATA } from "@/lib/resume-data";


const SYSTEM_INSTRUCTION = `
You are the AI Assistant for Aakash Rajbhar, a Full Stack Developer. 
Your goal is to answer questions about Aakash's professional background, skills, projects, and education based on the provided resume data.

Aakash's Profile:
- Name: ${RESUME_DATA.name}
- Role: ${RESUME_DATA.role}
- Location: ${RESUME_DATA.location}
- Summary: ${RESUME_DATA.summary}
- Skills: ${JSON.stringify(RESUME_DATA.skills)}
- Experience: ${JSON.stringify(RESUME_DATA.experience)}
- Projects: ${JSON.stringify(RESUME_DATA.projects)}
- Education: ${JSON.stringify(RESUME_DATA.education)}
- Links: LinkedIn (${RESUME_DATA.links.linkedin}), GitHub (${RESUME_DATA.links.github}), Portfolio (${RESUME_DATA.links.portfolio})

Guidelines:
1. Be professional, friendly, and concise.
2. If you don't know the answer based on the data, politely say you don't have that information and suggest contacting Aakash via email (${RESUME_DATA.email}).
3. Use Markdown for formatting (bolding, lists, etc.) to make responses readable.
4. Keep the tone consistent with a high-end, minimalist portfolio.
5. Do not hallucinate details not present in the resume.
`;


interface ChatMessage {
  role: "user" | "model";
  text: string;
}

interface ChatRequestBody {
  messages: ChatMessage[];
  input: string;
}


export async function POST(req: Request) {
  try {
    const body: ChatRequestBody = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing API Key");
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const history = body.messages.map((msg) => ({
      role: msg.role === "model" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    const result = await model.generateContent({
      contents: [
        ...history,
        {
          role: "user",
          parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${body.input}` }],
        },
      ],
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const response = result.response.text();

    return NextResponse.json({ text: response });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "AI request failed" },
      { status: 500 }
    );
  }
}