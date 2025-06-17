import { db } from "@/server/adapters/driven/persistence/db";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const documentRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await db.document.findUnique({
        where: { id: input.id },
        include: {
          conversation: {
            include: {
              messages: true,
            },
          },
        },
      });
    }),
  getAll: publicProcedure.query(async () => {
    return await db.document.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.document.create({
        data: {
          ...input,
          conversation: {
            create: {},
          },
        },
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        content: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.document.update({
        where: { id: input.id },
        data: { content: input.content },
      });
    }),
});
