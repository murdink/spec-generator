import type { Message } from "./message";

export interface Conversation {
  id: number;
  documentId: number;
  messages: Message[];
}
