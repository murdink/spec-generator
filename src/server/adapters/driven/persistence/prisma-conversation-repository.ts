import type { PrismaClient, SenderRole } from "@prisma/client";
import type { Conversation } from "../../../domain/entities/conversation";
import type { ConversationRepository } from "../../../domain/ports/conversation-repository";

export class PrismaConversationRepository implements ConversationRepository {
  constructor(private readonly db: PrismaClient) {}

  public async findConversationById(
    conversationId: number
  ): Promise<Conversation | null> {
    const conversation = await this.db.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: true },
    });

    if (!conversation) {
      return null;
    }

    return {
      id: conversation.id,
      documentId: conversation.documentId,
      messages: conversation.messages.map((message) => ({
        id: message.id,
        conversationId: message.conversationId,
        text: message.text,
        sender: message.sender,
        createdAt: message.createdAt,
      })),
    };
  }

  public async addMessage(message: {
    conversationId: number;
    text: string;
    sender: "user" | "llm";
  }): Promise<void> {
    await this.db.message.create({
      data: {
        ...message,
        sender: message.sender as SenderRole,
      },
    });
  }

  public async updateDocument(
    documentId: number,
    content: string
  ): Promise<void> {
    await this.db.document.update({
      where: { id: documentId },
      data: { content },
    });
  }
}
