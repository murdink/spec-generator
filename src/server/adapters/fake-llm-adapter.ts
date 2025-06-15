import { type Message } from "@prisma/client";
import { type LlmService } from "../domain/ports/llm-service";

export class FakeLlmAdapter implements LlmService {
  public async getResponse(messages: Message[]): Promise<string> {
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) {
      return Promise.resolve("No messages found.");
    }
    return Promise.resolve(`You said: ${lastMessage.text}`);
  }
}