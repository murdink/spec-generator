import { ConversationUseCase } from "../application/use-cases/conversation-use-case";
import { createLlmService } from "./driven/llm/llm-service-factory";
import { db } from "./driven/persistence/db";
import { PrismaConversationRepository } from "./driven/persistence/prisma-conversation-repository";

const llmService = createLlmService();
const conversationRepository = new PrismaConversationRepository(db);

export const conversationUseCase = new ConversationUseCase(
  llmService,
  conversationRepository
);
