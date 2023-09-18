import { PhoneNumber } from "./PhoneNumber";

/**
 * PhoneNumbers
 * @targetNSAlias `tns`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/ArrayWorks.Intertask.Services.Cloud.SBLI`
 */
export type PhoneNumbers =
  | {
      /** PhoneNumber[] */
      // PhoneNumber?: Array<PhoneNumber>;
      PhoneNumber: {
        /** xs:string */
        Extension?: string;
        /** xs:boolean */
        IsVerified?: boolean;
        /** xs:string */
        Number?: string;
        /** PhoneNumberTypes|xs:string|Business,BusinessFax,BusinessMobile,Home,HomeFax,Mobile,Other,Pager */
        PhoneNumberType?: string;
      };
    }
  | Array<{
      PhoneNumber: PhoneNumber;
    }>;
