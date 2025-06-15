import { type Message } from "@prisma/client";

export interface LlmService {
  getResponse(messages: Message[]): Promise<string>;
}