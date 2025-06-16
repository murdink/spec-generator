import { conversationRouter } from "@/server/adapters/driving/api/routers/conversation";
import { documentRouter } from "@/server/adapters/driving/api/routers/document";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  document: documentRouter,
  conversation: conversationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.document.all();
 *       ^? Document[]
 */
export const createCaller = createCallerFactory(appRouter);
