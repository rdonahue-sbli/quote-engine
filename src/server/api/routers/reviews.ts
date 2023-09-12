import { z } from "zod";
import { BusinessUnitSchema, StarIconSizeSchema } from "~/schema/reviews";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const businessID = "57add5dc0000ff000593675b";

const listReviews = publicProcedure.query(async ({ input }) => {
  const response = await fetch(
    `https://api.trustpilot.com/v1/business-units/${businessID}/reviews?stars=5,4&perPage=5&apikey=${process.env.TRUSTPILOT_KEY}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    throw new Error("There was a problem fetching the data.");
  }
  const json = await response.json();

  return BusinessUnitSchema.parse(json);
});

const getStarIcon = publicProcedure
  .input(z.string().url())
  .query(async ({ input: url }) => {
    const response = await fetch(
      `${url}?apikey=${process.env.TRUSTPILOT_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error("There was a problem fetching the data.");
    }
    const json = await response.json();

    return StarIconSizeSchema.parse(json);
  });

export const reviewsRouter = createTRPCRouter({
  list: listReviews,
  getStarIcon: getStarIcon,
});
