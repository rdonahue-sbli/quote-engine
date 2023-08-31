import { httpBatchLink } from "@trpc/client";
import { appRouter } from ".";
import SuperJSON from "superjson";

// TODO ADD TO ENV
const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const serverClient = appRouter.createCaller({
  transformer: SuperJSON,
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/v1/`,
    }),
  ],
})

