import { z } from "zod";

const links = z.object({
  href: z.string().url(),
  method: z.enum(["GET", "POST"]),
  rel: z.string(),
});

const consumer = z.object({
  links: z.array(links),
  id: z.string(),
  displayName: z.string(),
  displayLocation: z.string().nullable(),
  numberOfReviews: z.number(),
});

export const ReviewSchema = z
  .object({
    consumer,
    id: z.string(),
    links: z.array(links),
    location: z.string().nullable(),
    stars: z.number(),
    title: z.string(),
    text: z.string(),
    language: z.string(),
    createdAt: z.coerce.date(),
    experiencedAt: z.coerce.date(),
    updatedAt: z.coerce.date().nullable(),
    isVerified: z.boolean(),
    source: z.string(),
    numberOfLikes: z.number(),
    status: z.string(),
    reportData: z.string().nullable(),
    complianceLabels: z.array(z.string()),
    countsTowardsTrustScore: z.boolean(),
    countsTowardsLocationTrustScore: z.boolean().nullable(),
    businessUnitHistory: z.array(z.unknown()),
    reviewVerificationLevel: z.string(),
  })
  .passthrough();

export const BusinessUnitSchema = z.object({
  links: z.array(links),
  reviews: z.array(ReviewSchema),
});

const StarIconSchema = z.object({
  width: z.number(),
  height: z.number(),
  url: z.string().transform((val) => {
    return z.string().url().parse(`https:${val}`);
  }),
});

export const StarIconSizeSchema = z.object({
  star128x24: StarIconSchema,
  star256x48: StarIconSchema,
  star512x96: StarIconSchema,
  starSvg: StarIconSchema,
  stars: z.number(),
});

export type Review = z.infer<typeof ReviewSchema>;
export type StarIconSize = z.infer<typeof StarIconSizeSchema>;
