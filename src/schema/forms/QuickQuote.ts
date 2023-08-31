import { z } from "zod";
import validator from "validator";
import { differenceInYears, isValid } from "date-fns";
import { CoverageLabelsSchema, GenderSchema, TermValueSchema } from "../global";

export const QuickQuoteSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email("Please provide a valid email."),
  phone: z
    .string()
    .refine(validator.isMobilePhone, "Please enter a valid number."),
  postalCode: z.string().refine((input) => validator.isPostalCode(input, "US")),
  birthdate: z
    .object({
      year: z.string(),
      month: z.string(),
      day: z.string(),
    })
    .refine(({ year, month, day }) => year && month && day, "Please enter a all date fields.")
    .refine(({ year, month, day }) => isValid(new Date(`${month}/${day}/${year}`)), "Please enter a valid date.")
    .refine(
      ({ year, month, day }) => differenceInYears(new Date(), new Date(`${month}/${day}/${year}`)) < 100,
      "Please enter a date within the valid range"
    )
    .refine(
      ({ year, month, day }) => differenceInYears(new Date(), new Date(`${month}/${day}/${year}`)) > 18,
      "Please enter a date within the valid range"
    ),
  gender: GenderSchema,
  term: TermValueSchema,
  coverage: CoverageLabelsSchema,
  isNicotineUser: z.coerce.number().transform((val) => Boolean(val)).or(z.boolean()),
  hasHealthIssues: z.coerce.number().transform((val) => Boolean(val)).or(z.boolean()),
});
