import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "~/server/api"
import { createTRPCContext } from "~/server/api/trpc"


const handler = (req: Request) => {
  
  return fetchRequestHandler({
    endpoint: "/api/v1",
    req,
    router: appRouter,
    createContext: createTRPCContext,
    onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
  })
}

export { handler as GET, handler as POST }

