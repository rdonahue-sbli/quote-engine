import { httpBatchLink } from "@trpc/client";
import { appRouter } from ".";
import SuperJSON from "superjson";

// TODO ADD TO ENV
const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.BASE_URL) return `https://${process.env.BASE_URL}`; // SSR should use base url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const serverClient = appRouter.createCaller({
  transformer: SuperJSON,
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/v1`,
      headers: {
        'cache-control': `s-maxage=0, stale-while-revalidate=0`,
      },
    }),
  ],
})
