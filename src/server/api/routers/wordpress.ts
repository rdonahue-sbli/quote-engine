import { z } from "zod";
import { WPPageSchema } from "~/schema/wordpress";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


const getContent = publicProcedure
.input(z.string())
.query(async ({ input }) => {

  const response = await fetch(
    `http://prototype.local/wp-json/wp/v2/pages?slug=${input}`, { next: { revalidate: 0 }}
  );

  if (!response.ok) {
    throw new Error("There was a problem fetching the page.");
  }
  const json = await response.json();
  return WPPageSchema.parse(json)
})

export const wordpressRouter = createTRPCRouter({
  getContent: getContent,
});

