import { createLlmService } from "./adapters/driven/llm/llm-service-factory";
import { db } from "./adapters/driven/persistence/db";
import { PrismaConversationRepository } from "./adapters/driven/persistence/prisma-conversation-repository";
import { ConversationUseCase } from "./application/use-cases/conversation-use-case";

const llmService = createLlmService();
const conversationRepository = new PrismaConversationRepository(db);

export const conversationUseCase = new ConversationUseCase(
  llmService,
  conversationRepository
);
