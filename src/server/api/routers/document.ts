import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const documentRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ title: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.document.create({
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.document.findUnique({
        where: { id: input.id },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.document.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
});
