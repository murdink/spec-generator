import { PrismaConversationRepository } from "@/server/adapters/prisma-conversation-repository";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { createLlmService } from "@/server/domain/factories/llm-service-factory";
import { ConversationUseCase } from "@/server/domain/use-cases/conversation-use-case";
import { z } from "zod";

export const conversationRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(
      z.object({
        conversationId: z.number(),
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const useCase = new ConversationUseCase(
        createLlmService(),
        new PrismaConversationRepository(ctx.db),
      );
      await useCase.sendMessage(input.conversationId, input.text);
    }),
});