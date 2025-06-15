import { type Message } from "@prisma/client";
import OpenAI from "openai";
import { type LlmService } from "../domain/ports/llm-service";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAiAdapter implements LlmService {
  public async getResponse(messages: Message[]): Promise<string> {
    const completion = await openai.chat.completions.create({
      messages: messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      model: "gpt-3.5-turbo",
    });

    return completion.choices[0]?.message?.content ?? "No response from LLM.";
  }
}