
/**
 * PhoneNumber
 * @targetNSAlias `tns`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/ArrayWorks.Intertask.Services.Cloud.SBLI`
 */
export interface PhoneNumber {
    /** xs:string */
    Extension?: string;
    /** xs:boolean */
    IsVerified?: string;
    /** xs:string */
    Number?: string;
    /** PhoneNumberTypes|xs:string|Business,BusinessFax,BusinessMobile,Home,HomeFax,Mobile,Other,Pager */
    PhoneNumberType?: string;
}
