import { leadsRouter } from "~/server/api/routers/leads";
import { createTRPCRouter } from "~/server/api/trpc";
import { ratesRouter } from "./routers/rates";
import { wordpressRouter } from "./routers/wordpress";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  leads: leadsRouter,
  rates: ratesRouter,
  wp: wordpressRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
