import { NextResponse } from 'next/server';
import { publicProcedure, router } from './trpc';
import { z } from 'zod';
 
export const appRouter = router({
  getQuote: publicProcedure.query(async ({input, ctx}) => {

    return [10, 20, 30]
  })
});
 
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;