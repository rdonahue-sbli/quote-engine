
/**
 * EmailAddress
 * @targetNSAlias `tns`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/ArrayWorks.Intertask.Services.Cloud.SBLI`
 */
export interface EmailAddress {
    /** xs:string */
    Address: string;
    /** EmailAddressTypes|xs:string|Business,Education,LinkedIn,Other,Personal */
    EmailAddressType: "Business" | "Education" | "LinkedIn" | "Other" | "Personal"
    /** xs:boolean */
    IsVerified: boolean;
}
