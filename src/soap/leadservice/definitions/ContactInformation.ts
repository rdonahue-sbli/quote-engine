import { EmailAddresses } from "./EmailAddresses";
import { PhoneNumbers } from "./PhoneNumbers";

/**
 * ContactInformation
 * @targetNSAlias `tns`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/ArrayWorks.Intertask.Services.Cloud.SBLI`
 */
export interface ContactInformation {
    /** xs:string */
    AddressLine1?: string;
    /** xs:string */
    AddressLine2?: string;
    /** EmailAddresses */
    EmailAddresses: EmailAddresses;
    /** xs:string */
    Locality?: string | null;
    /** PhoneNumbers */
    PhoneNumbers?: PhoneNumbers;
    /** xs:string */
    PostalCode?: string | null;
    /** xs:string */
    Region?: string | null;
}
