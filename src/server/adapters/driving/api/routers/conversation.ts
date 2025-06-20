import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { conversationUseCase } from "@/server/composition";
import { z } from "zod";

export const conversationRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(
      z.object({
        conversationId: z.number(),
        text: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      await conversationUseCase.sendMessage(input.conversationId, input.text);
    }),
});
