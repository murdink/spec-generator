import type { Message } from "@prisma/client";
import OpenAI from "openai";
import type {
  LlmResponse,
  LlmService,
} from "../../../domain/ports/llm-service";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
You are an expert in writing technical specifications. Your role is to help a user create a detailed spec document.
The user will provide you with instructions. You must respond in one of two ways:

1. If you have enough information to update the spec, you MUST respond with a JSON object containing the key "updated_spec_document". The value should be the complete, updated markdown document.
2. If you need more information from the user, you MUST respond with a JSON object containing the key "clarifying_question". The value should be a single question to ask the user.

You must only respond with a valid JSON object.
`;

export class OpenAiAdapter implements LlmService {
  public async getResponse(messages: Message[]): Promise<LlmResponse> {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((msg) => {
          const role: "user" | "assistant" =
            msg.sender === "user" ? "user" : "assistant";
          return {
            role,
            content: msg.text,
          };
        }),
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      return { clarifying_question: "I'm sorry, I didn't understand that." };
    }

    try {
      return JSON.parse(response) as LlmResponse;
    } catch (error) {
      return {
        clarifying_question:
          "I'm sorry, I had trouble understanding the response.",
      };
    }
  }
}
