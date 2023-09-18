import { z } from "zod";
import validator from "validator";
import { differenceInYears, isValid } from "date-fns";
import { CoverageLabelsSchema, GenderSchema, TermValueSchema } from "../global";

export const QuickQuoteSchema = z.object({
  firstName: z.string().min(2, { message: "Invalid name."}),
  lastName: z.string().min(2, { message: "Invalid name."}),
  email: z.string().email("Invalid email."),
  phone: z
    .string()
    .refine(validator.isMobilePhone, "Invalid number."),
  postalCode: z.string().refine((input) => validator.isPostalCode(input, "US"), { message: "Invalid zip code."}),
  birthdate: z
    .object({
      year: z.string(),
      month: z.string(),
      day: z.string(),
    })
    .refine(({ year, month, day }) => year && month && day, "Invalid date field.")
    .refine(({ year, month, day }) => isValid(new Date(`${month}/${day}/${year}`)), "Invalid date.")
    .refine(
      ({ year, month, day }) => differenceInYears(new Date(), new Date(`${month}/${day}/${year}`)) < 100,
      "Invalid date range"
    )
    .refine(
      ({ year, month, day }) => differenceInYears(new Date(), new Date(`${month}/${day}/${year}`)) > 18,
      "Invalid date range"
    ),
  gender: GenderSchema,
  term: TermValueSchema,
  coverage: CoverageLabelsSchema,
  isNicotineUser: z.coerce.number().transform((val) => Boolean(val)).or(z.boolean()),
  hasHealthIssues: z.coerce.number().transform((val) => Boolean(val)).or(z.boolean()),
});

export const QuickQuotePayloadSchema = QuickQuoteSchema.extend({
  anonymousId: z.string(),
});
