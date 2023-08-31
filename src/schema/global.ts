import { differenceInYears, isValid } from "date-fns";
import { z } from "zod";

export const CoverageAmountSchema = z.union([
  z.literal(100_000),
  z.literal(200_000),
  z.literal(300_000),
  z.literal(400_000),
  z.literal(500_000),
  z.literal(600_000),
  z.literal(700_000),
  z.literal(750_000),
  z.literal(800_000),
  z.literal(900_000),
  z.literal(1_000_000),
  z.literal(2_000_000),
  z.literal(2_500_000),
  z.literal(3_000_000),
  z.literal(4_000_000),
  z.literal(5_000_000),
  z.literal(10_000_000),
], { errorMap: () => ({ message: "asdsadsa"})});
export type CoverageAmount = z.infer<typeof CoverageAmountSchema>;

const [test, ...rest] = CoverageAmountSchema.options.map((opt) =>
  opt.value.toString()
);

export const CoverageLabelsSchema = z
  .enum([test, ...rest], {
    errorMap: () => ({ message: "Please select a coverage." }),
  })
  .transform((val) => +val as CoverageAmount)
  .or(CoverageAmountSchema);

export const TermOptionsSchema = z.tuple([
  z.object({
    label: z.literal("10 Years"),
    value: z.literal("T10"),
  }),
  z.object({
    label: z.literal("15 Years"),
    value: z.literal("T15"),
  }),
  z.object({
    label: z.literal("20 Years"),
    value: z.literal("T20"),
  }),
  z.object({
    label: z.literal("25 Years"),
    value: z.literal("T25"),
  }),
  z.object({
    label: z.literal("30 Years"),
    value: z.literal("T30"),
  }),
]);

export const TermLabelSchema = z.enum([
  TermOptionsSchema.items[0].shape.label.value,
  TermOptionsSchema.items[1].shape.label.value,
  TermOptionsSchema.items[2].shape.label.value,
  TermOptionsSchema.items[3].shape.label.value,
  TermOptionsSchema.items[4].shape.label.value,
] as const);

export const TermValueSchema = z.enum(
  [
    TermOptionsSchema.items[0].shape.value.value,
    TermOptionsSchema.items[1].shape.value.value,
    TermOptionsSchema.items[2].shape.value.value,
    TermOptionsSchema.items[3].shape.value.value,
    TermOptionsSchema.items[4].shape.value.value,
  ] as const,
  {
    errorMap: () => ({ message: "Please select a term." }),
  }
);

export const months = [
  "Select...",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export const DateOfBirthSchema = z
  .object({
    year: z.string(),
    month: z.string(),
    day: z.string(),
  })
  .refine(
    ({ year, month, day }) => year && month && day,
    "Please enter a all date fields."
  )
  .refine(
    ({ year, month, day }) => isValid(new Date(`${month}/${day}/${year}`)),
    "Please enter a valid date."
  )
  .refine(
    ({ year, month, day }) =>
      differenceInYears(new Date(), new Date(`${month}/${day}/${year}`)) < 100,
    "Please enter a date within the valid range"
  )
  .refine(
    ({ year, month, day }) =>
      differenceInYears(new Date(), new Date(`${month}/${day}/${year}`)) > 18,
    "Please enter a date within the valid range"
  );

export const GenderSchema = z.enum(["Male", "Female"], {
  errorMap: () => ({ message: "Please select your gender." }),
});

export const NonNicotineRateClassSchema = z.enum([
  "Preferred Plus Non Nicotine",
  "Preferred Non Nicotine",
  "Select Non Nicotine",
  "Standard Non Nicotine",
] as const);

export const NicotineRateClassSchema = z.enum([
  "Preferred Nicotine",
  "Standard Nicotine",
] as const);

export const AnyRateClassSchema = z.enum([
  ...NonNicotineRateClassSchema.options,
  ...NicotineRateClassSchema.options,
] as const);

export const RateSchema = z.object({
  rate_class: AnyRateClassSchema,
  term: TermValueSchema,
  gender: GenderSchema,
  age: z.number().int().min(18),
  band_1: z.number().nonnegative(),
  band_2: z.number().nonnegative(),
  band_3: z.number().nonnegative(),
  band_4: z.number().nonnegative(),
  band_5: z.number().nonnegative(),
  band_6: z.number().nonnegative(),
});

export const RatesSchema = z.object({
  rates: z.array(RateSchema),
});

// export type CoverageOptions = z.infer<typeof CoverageOptionsSchema>;
// export type CoverageOption = CoverageOptions[number];
// export type CoverageOptionLabel = z.infer<typeof CoverageLabelSchema>;

export type TermOptions = z.infer<typeof TermOptionsSchema>;
export type TermOption = TermOptions[number];
export type TermOptionLabel = z.infer<typeof TermLabelSchema>;
export type TermOptionValue = z.infer<typeof TermValueSchema>;
