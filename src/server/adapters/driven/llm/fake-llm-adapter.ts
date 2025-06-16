import type { Message } from "@prisma/client";
import type {
  LlmResponse,
  LlmService,
} from "../../../domain/ports/llm-service";

export class FakeLlmAdapter implements LlmService {
  public async getResponse(messages: Message[]): Promise<LlmResponse> {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) {
      return Promise.resolve({
        clarifying_question: "I need more information.",
      });
    }

    if (lastMessage.text.toLowerCase().includes("update")) {
      return Promise.resolve({
        updated_spec_document: "This is the updated spec.",
      });
    }

    return Promise.resolve({
      clarifying_question: `What do you mean by "${lastMessage.text}"?`,
    });
  }
}
