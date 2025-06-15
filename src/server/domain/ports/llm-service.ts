import { type Message } from "@prisma/client";

export type LlmResponse = {
  clarifying_question?: string;
  updated_spec_document?: string;
};

export interface LlmService {
  getResponse(messages: Message[]): Promise<LlmResponse>;
}