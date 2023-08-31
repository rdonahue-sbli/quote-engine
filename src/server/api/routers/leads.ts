import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


// export const leadsRouter = router({
//   getLeads: publicProcedure.query(async ({input, ctx}) => {
//     return [10, 20, 30]
//   }),
//   createLead: publicProcedure.mutation(async ({input, ctx}) => {
    
//   })
// });

export const leadsRouter = createTRPCRouter({
  createLead: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
