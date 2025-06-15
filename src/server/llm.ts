import { type Message } from "@prisma/client";

export async function getLlmResponse(messages: Message[]): Promise<string> {
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage) {
    return Promise.resolve("No messages found.");
  }
  return Promise.resolve(`You said: ${lastMessage.text}`);
}