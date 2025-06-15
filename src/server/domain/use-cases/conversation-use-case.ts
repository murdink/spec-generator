import { type PrismaClient } from "@prisma/client";
import { type LlmService } from "../ports/llm-service";

export class ConversationUseCase {
  constructor(
    private readonly llmService: LlmService,
    private readonly db: PrismaClient,
  ) {}

  public async sendMessage(conversationId: number, text: string) {
    await this.db.message.create({
      data: {
        conversationId,
        text,
        sender: "user",
      },
    });

    const conversation = await this.db.conversation.findUnique({
      where: { id: conversationId },
      include: { messages: true },
    });

    if (conversation) {
      const llmResponse = await this.llmService.getResponse(
        conversation.messages,
      );

      if (llmResponse.clarifying_question) {
        await this.db.message.create({
          data: {
            conversationId,
            text: llmResponse.clarifying_question,
            sender: "llm",
          },
        });
      }

      if (llmResponse.updated_spec_document) {
        await this.db.document.update({
          where: { id: conversation.documentId },
          data: { content: llmResponse.updated_spec_document },
        });
      }
    }
  }
}