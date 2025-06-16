import { type ConversationRepository } from "../ports/conversation-repository";
import { type LlmService } from "../ports/llm-service";

export class ConversationUseCase {
  constructor(
    private readonly llmService: LlmService,
    private readonly conversationRepository: ConversationRepository,
  ) {}

  public async sendMessage(conversationId: number, text: string) {
    await this.conversationRepository.addMessage({
      conversationId,
      text,
      sender: "user",
    });

    const conversation =
      await this.conversationRepository.findConversationById(conversationId);

    if (conversation) {
      const llmResponse = await this.llmService.getResponse(
        conversation.messages,
      );

      if (llmResponse.clarifying_question) {
        await this.conversationRepository.addMessage({
          conversationId,
          text: llmResponse.clarifying_question,
          sender: "llm",
        });
      }

      if (llmResponse.updated_spec_document) {
        await this.conversationRepository.updateDocument(
          conversation.documentId,
          llmResponse.updated_spec_document,
        );
      }
    }
  }
}