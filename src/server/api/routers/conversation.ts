import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getLlmResponse } from "@/server/llm";
import { z } from "zod";

export const conversationRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ documentId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.conversation.create({
        data: {
          documentId: input.documentId,
        },
      });
    }),

  sendMessage: publicProcedure
    .input(
      z.object({
        conversationId: z.number(),
        text: z.string().min(1),
        sender: z.enum(["user", "llm"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userMessage = await ctx.db.message.create({
        data: {
          conversationId: input.conversationId,
          text: input.text,
          sender: input.sender,
        },
      });

      const conversation = await ctx.db.conversation.findUnique({
        where: { id: input.conversationId },
        include: { messages: true },
      });

      if (conversation) {
        const llmResponse = await getLlmResponse(conversation.messages);
        await ctx.db.message.create({
          data: {
            conversationId: input.conversationId,
            text: llmResponse,
            sender: "llm",
          },
        });
      }

      return userMessage;
    }),
});