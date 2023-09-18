import { EmailAddress } from "./EmailAddress";

/**
 * EmailAddresses
 * @targetNSAlias `tns`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/ArrayWorks.Intertask.Services.Cloud.SBLI`
 */
// export type EmailAddresses = Array<EmailAddress>;
export type EmailAddresses =
  | {
      EmailAddress: {
        /** xs:string */
        Address: string;
        /** EmailAddressTypes|xs:string|Business,Education,LinkedIn,Other,Personal */
        EmailAddressType:
          | "Business"
          | "Education"
          | "LinkedIn"
          | "Other"
          | "Personal";
        /** xs:boolean */
        IsVerified: boolean;
      };
    }
  | Array<{
      EmailAddress: EmailAddress;
    }>;
