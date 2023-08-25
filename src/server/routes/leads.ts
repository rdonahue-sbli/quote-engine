import { publicProcedure, router } from "../trpc";


export const leadsRouter = router({
  getLeads: publicProcedure.query(async ({input, ctx}) => {
    return [10, 20, 30]
  }),
  createLead: publicProcedure.mutation(async ({input, ctx}) => {
    
  })
});