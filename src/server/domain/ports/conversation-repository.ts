import type { Conversation } from "../entities/conversation";
import type { Message } from "../entities/message";

export interface ConversationRepository {
  findConversationById(conversationId: number): Promise<Conversation | null>;
  addMessage(message: Omit<Message, "id" | "createdAt">): Promise<void>;
  updateDocument(documentId: number, content: string): Promise<void>;
}
