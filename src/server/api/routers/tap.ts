import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { createClientAsync as createSecurityClient } from "~/soap/securityservice";
import { TapLeadSchema } from "~/schema/tap";
import { createClientAsync as createLeadClient } from "~/soap/leadservice";
import { QuickQuotePayloadSchema } from "~/schema/forms/QuickQuote";
import { validateZip } from "./locations";

// TODO: Add to env file
const securityServiceWSDL =
  "https://sbli-services-qa.sblisales.com/cloud-services/SecurityService.svc?wsdl";
const leadServiceWSDL =
  "https://sbli-services-qa.sblisales.com/cloud-services/LeadService.svc?wsdl";
const username = "wordpresssite";
const password = "w0rdPre$$site";

export const authenticate = async () => {
  const client = await createSecurityClient(securityServiceWSDL);

  const [authUser] = await client.AuthenticateUserAsync({
    username,
    password,
  });

  return authUser.AuthenticateUserResult;
};

const createLead = publicProcedure
  .input(QuickQuotePayloadSchema)
  .mutation(async ({ input: payload }) => {

    const { City, State } = await validateZip(payload.postalCode)

    const lead =TapLeadSchema.parse({
      ...payload,
      city: City,
      state: State,
    })
    console.log(lead)

    const authUser = await authenticate();
    const leadClient = await createLeadClient(leadServiceWSDL);

    const [{ CreateLeadResult }, raw, headers, req] =
      await leadClient.CreateLeadAsync({
        lead: lead,
        securityToken: authUser,
      });

    console.log(CreateLeadResult?.Errors)

    return CreateLeadResult;
  });

export const tapRouter = createTRPCRouter({
  createLead: createLead,
});
