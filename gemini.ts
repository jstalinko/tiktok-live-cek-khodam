import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "node:fs";
import cliMd from "cli-markdown";
const API_KEY = fs.readFileSync(".gemini-api", "utf-8").trim();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

// ...

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export async function checkNama(nama: string) {
  const prompt = "Arti nama "+nama+" secara umuma dalam satu kalimat";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(cliMd(text));
//   const result = await model.generateContentStream(prompt);

//   let text = "";
//   for await (const chunk of result.stream) {
//     const chunkText = chunk.text();
//     console.log(chunkText);
//     text += chunkText;
//   }

}

