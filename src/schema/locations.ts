import { z } from "zod";

export const CityStateResultSchema = z
  .object({
    Zip5: z.number(),
    City: z.string(),
    State: z.string().min(2),
  })

export const CityStateErrorSchema = z.object({
  Error: z.object({
    Number: z.number(),
    Source: z.string(),
    Description: z.string(),
  }),
})

export const CityStateLookupSchema = z.object({
  CityStateLookupResponse: z.object({
    ZipCode: CityStateResultSchema.or(CityStateErrorSchema)
  }),
});

