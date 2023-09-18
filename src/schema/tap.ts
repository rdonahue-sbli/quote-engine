import { Lead } from "~/soap/leadservice/types";
import { QuickQuotePayloadSchema } from "./forms/QuickQuote";
import { differenceInYears } from "date-fns";
import { z } from "zod";

export const TapLeadSchema = QuickQuotePayloadSchema.merge(
  z.object({
    city: z.string(),
    state: z.string().length(2),
  })
).transform(
  ({
    anonymousId,
    email,
    birthdate,
    gender,
    firstName,
    lastName,
    city,
    state,
    postalCode,
    term,
    coverage,
    isNicotineUser,
    hasHealthIssues,
  }) => {
    const lead: Lead = {
      AffilliateCode: "020A",
      BrowserInstance: {
        AnonymousId: anonymousId,
        BrowserSession: {
          SessionStart: new Date().toISOString(),
        },
      },
      CompanyID: "SBLI",
      ContactInformation: {
        EmailAddresses: {
          EmailAddress: {
            Address: email,
            EmailAddressType: "Personal",
            IsVerified: false,
          },
        },
        Locality: city,
        PostalCode: postalCode,
        Region: state,
      },
      ContractState: "MA",
      DOB: new Date(
        `${birthdate.year}-${birthdate.month}-${birthdate.day.padStart(2, "0")}`
      ).toISOString(),
      DateOfVisit: new Date().toISOString(),
      DelayNewCaseSeconds: 0,
      EntityID: 0,
      FirstName: firstName,
      Gender: gender,
      InsuranceAge: differenceInYears(
        new Date(),
        new Date(
          `${birthdate.year}-${birthdate.month}-${birthdate.day.padStart(
            2,
            "0"
          )}`
        )
      ),
      InsuranceNeed: {
        CollegeNeed: "UNKNOWN",
        PrimaryLifeInsuranceGoal: "Unknown",
      },
      LastName: lastName,
      LeadSource: "Mediaforce",
      LengthOfCoverage: term,
      MaritalStatus: "Unknown",
      Prescreen: {},
      ProductInterest: {
        InsuranceAmount: coverage,
        LengthOfTerm: term,
      },
      SmokingHistory: isNicotineUser ? "Yes" : "No",
      URL: "https://sbli.com/quote/",
      UTM_URL: "https://sbli.com/quote/",
    };

    return lead;
  }
);
