import { tapRouter } from "~/server/api/routers/tap";
import { createTRPCRouter } from "~/server/api/trpc";
import { ratesRouter } from "./routers/rates";
import { wordpressRouter } from "./routers/wordpress";
import { reviewsRouter } from "./routers/reviews";
import { locationsRouter } from "./routers/locations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tap: tapRouter,
  rates: ratesRouter,
  wp: wordpressRouter,
  reviews: reviewsRouter,
  locations: locationsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
