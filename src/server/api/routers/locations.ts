import { z } from "zod";
import { BusinessUnitSchema, StarIconSizeSchema } from "~/schema/reviews";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { XMLParser } from "fast-xml-parser";
import {
  CityStateErrorSchema,
  CityStateLookupSchema,
  CityStateResultSchema,
} from "~/schema/locations";

const businessID = "57add5dc0000ff000593675b";

export const validateZip = async (zip: string) => {
  const response = await fetch(
    `http://production.shippingapis.com/ShippingAPI.dll?API=CityStateLookup%20&XML=%3CCityStateLookupRequest%20USERID=%22${process.env.USPS_ID}%22%3E%3CZipCode%20ID=%20%220%22%3E%20%3CZip5%3E${zip}%3C/Zip5%3E%3C/ZipCode%3E%3C/CityStateLookupRequest%3E`
  );

  if (!response.ok) {
    throw new Error("There was a problem fetching the data.");
  }
  const rawText = await response.text();
  const xml = new XMLParser().parse(rawText) as unknown;

  const { CityStateLookupResponse } = CityStateLookupSchema.parse(xml);
  const { ZipCode } = CityStateLookupResponse;

  const ZipErrors = CityStateErrorSchema.safeParse(ZipCode);
  if (ZipErrors.success) throw new Error(ZipErrors.data.Error.Description);

  return CityStateResultSchema.parse(ZipCode);
};

const cityStateLookup = publicProcedure
  .input(z.string())
  .mutation(({ input: postalCode }) => {
    return validateZip(postalCode);
  });

export const locationsRouter = createTRPCRouter({
  cityStateLookup,
});
