import { differenceInYears } from "date-fns";
import { z } from "zod";
import useRates from "~/hooks/useRates";
import { QuickQuoteSchema } from "~/schema/forms/QuickQuote";
import {
  NonNicotineRateClassSchema,
  NicotineRateClassSchema,
  RatesSchema,
  AnyRateClassSchema,
} from "~/schema/global";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import ratesJson from "~/assets/rates.json";

/**
 * API Call used in Quick Quote to generate rates from CSV/JSON data
 * @returns array of available rates for given input
 */
const getRate = publicProcedure.input(QuickQuoteSchema).mutation(({ input }) => {
  const { getBand, getFee } = useRates();

  const userAge = differenceInYears(
    new Date(),
    new Date(
      `${input.birthdate.year}-${input.birthdate.month}-${input.birthdate.day} 00:00`
    )
  );

  const userClassRates = input.isNicotineUser
    ? Object.values(NicotineRateClassSchema.Values)
    : Object.values(NonNicotineRateClassSchema.Values);

  const { rates } = RatesSchema.parse(ratesJson);

  // Filter rates by age, gender, and smoker
  const userRates = rates.filter(
    (rate) =>
      rate.term === input.term &&
      rate.age === userAge &&
      rate.gender === input.gender &&
      (
        userClassRates as ReadonlyArray<z.infer<typeof AnyRateClassSchema>>
      ).includes(rate.rate_class)
  );

  const monthlyRates: number[] = [];
  const band = getBand(input.coverage);
  const appFee = getFee(input.coverage);

  for (const userRate of userRates) {
    const bandRate = userRate[`band_${band}`];
    const annualCost = (input.coverage / 1000) * bandRate;
    const monthlyCost = Number(((annualCost + appFee) * 0.08333).toFixed(2)); // This was hardcoded prior

    monthlyRates.push(monthlyCost);
  }

  monthlyRates.sort((a , b) => a - b)

  console.log(monthlyRates)
  return monthlyRates;
});

export const ratesRouter = createTRPCRouter({
  getRate: getRate,
});
