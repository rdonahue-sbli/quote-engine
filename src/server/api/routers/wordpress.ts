import { promise, z } from "zod";
import {
  CustomMarketingSchema,
  WPMediaSchema,
  WPPageSchema,
} from "~/schema/wordpress";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const baseUrl = 'https://sblimarketing.wpenginepowered.com'

const getPageBySlug = publicProcedure
  .input(z.string())
  .query(async ({ input }) => {
    const response = await fetch(
      `${ baseUrl }/wp-json/wp/v2/pages?slug=${input}`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      throw new Error("There was a problem fetching the data.");
    }
    const json = await response.json();

    return z
      .array(WPPageSchema.merge(CustomMarketingSchema).passthrough())
      .parse(json);
  });

const getMediaById = publicProcedure
  .input(z.number())
  .query(async ({ input }) => {
    const response = await fetch(
      `${ baseUrl }/wp-json/wp/v2/media/${input}`,
      { next: { revalidate: 0 } }
    );

    if (!response.ok) {
      throw new Error("There was a problem fetching the data.");
    }
    const json = await response.json();
    return WPMediaSchema.parse(json);
  });

const getMediaByIds = publicProcedure
  .input(z.array(z.number()))
  .query(async ({ input }) => {
    const fetchCalls = input.map(async (id) => {
      const response = await fetch(
        `${ baseUrl }/wp-json/wp/v2/media/${id}`,
        { next: { revalidate: 0 } }
      );
      if (!response.ok) {
        throw new Error("There was a problem fetching the data.");
      }
      const json = await response.json();
      return WPMediaSchema.parse(json);
    });

    return await Promise.all(fetchCalls);
  });
export const wordpressRouter = createTRPCRouter({
  getPageBySlug,
  getMediaById,
  getMediaByIds
});
