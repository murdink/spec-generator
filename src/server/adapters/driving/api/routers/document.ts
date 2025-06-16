import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const documentRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      // This is a placeholder. In a real application, you would fetch this from a database.
      return {
        id: input.id,
        title: "Placeholder Document",
        content: "This is the content of the placeholder document.",
        conversation: {
          id: 1,
          messages: [
            { id: 1, text: "Hello from the LLM!", sender: "llm" },
            { id: 2, text: "Hi, this is the user.", sender: "user" },
          ],
        },
      };
    }),
  getAll: publicProcedure.query(() => {
    // Placeholder
    return [
      { id: 1, title: "Document 1", createdAt: new Date().toISOString() },
      { id: 2, title: "Document 2", createdAt: new Date().toISOString() },
    ];
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ input }) => {
      // Placeholder
      return {
        id: Math.floor(Math.random() * 1000),
        ...input,
      };
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        content: z.string(),
      })
    )
    .mutation(({ input }) => {
      // Placeholder
      return {
        id: input.id,
        content: input.content,
      };
    }),
});
