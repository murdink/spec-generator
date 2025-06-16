export interface Message {
  id: number;
  conversationId: number;
  text: string;
  sender: "user" | "llm";
  createdAt: Date;
}
