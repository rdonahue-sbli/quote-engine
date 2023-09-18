
/**
 * ProductInterest
 * @targetNSAlias `tns`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/ArrayWorks.Intertask.Services.Cloud.SBLI`
 */
export interface ProductInterest {
    /** xs:boolean */
    Childrens?: boolean;
    /** xs:boolean */
    Group?: boolean;
    /** xs:decimal */
    InsuranceAmount?: number;
    /** xs:boolean */
    InsurancePlanning?: boolean;
    /** LengthsOfTerm|xs:string|Unknown,T10,T15,T20,T25,T30,YRT */
    LengthOfTerm?: "T10" | "T15" | "T20" | "T25" | "T30" | "YRT" | "Unknown";
    /** xs:string */
    ReasonForInsurance?: string;
    /** xs:boolean */
    Retirement?: boolean;
    /** xs:boolean */
    SeniorLife?: boolean;
    /** xs:boolean */
    TermLife?: boolean;
    /** xs:boolean */
    WholeLife?: boolean;
}
