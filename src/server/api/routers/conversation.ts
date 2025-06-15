import { OpenAiAdapter } from "@/server/adapters/open-ai-adapter";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
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
        new OpenAiAdapter(),
        ctx.db,
      );
      await useCase.sendMessage(input.conversationId, input.text);
    }),
});