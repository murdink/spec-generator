import type { Conversation } from "../entities/conversation";

export interface ConversationRepository {
  findConversationById(conversationId: number): Promise<Conversation | null>;
  addMessage(message: {
    conversationId: number;
    text: string;
    sender: "user" | "llm";
  }): Promise<void>;
  updateDocument(documentId: number, content: string): Promise<void>;
  create(document: { title: string; content: string }): Promise<{ id: number }>;
}
