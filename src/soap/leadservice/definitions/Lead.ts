import { BrowserInstance } from "./BrowserInstance";
import { ContactInformation } from "./ContactInformation";
import { InsuranceNeed } from "./InsuranceNeed";
import { Prescreen } from "./Prescreen";
import { ProductInterest } from "./ProductInterest";
import { Risk } from "./Risk";
import { Spouse } from "./Spouse";

/**
 * lead
 * @targetNSAlias `q1`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/ArrayWorks.Intertask.Services.Cloud.SBLI`
 */
export interface Lead {
    /** xs:string */
    AdditionalCoverageRelationship?: string;
    /** xs:string */
    AffilliateCode?: '020A' | string & {};
    /** xs:string */
    AreasOfInterest?: string;
    /** xs:double */
    BestRateQualifiedFor?: number;
    /** ser:duration */
    BestTimeToCall?: string;
    /** BrowserInstance */
    BrowserInstance: BrowserInstance;
    /** Companies|xs:string|SBLI,Centrian */
    CompanyID?: 'SBLI' | 'Centrian' | string & {};
    /** ContactInformation */
    ContactInformation: ContactInformation;
    /** xs:string */
    ContractState: string;
    /** xs:dateTime */
    DOB: string;
    /** xs:dateTime */
    DateOfVisit?: string;
    /** xs:int */
    DelayNewCaseSeconds?: number;
    /** xs:long */
    EntityID?: number | null;
    /** FamilyCancerOrCardioDeaths|xs:string|None,OneParent,OneParentAndSibling,BothParents,Unknown */
    FamilyCancerOfCardioDeath?: "None" | "OneParent" | "OneParentAndSibling" | "BothParents" | "Unknown";
    /** xs:string */
    FirstName: string;
    /** Genders|xs:string|Male,Female,Unknown */
    Gender: 'Male' | 'Female' | 'Unknown';
    /** xs:string */
    GroupID?: string;
    /** xs:string */
    GroupMemberNumber?: string;
    /** xs:int */
    Height?: number;
    /** xs:string */
    HowDidYouHear?: string;
    /** xs:string */
    HowDidYouHearOther?: string;
    /** xs:double */
    Income?: number;
    /** xs:int */
    InsuranceAge?: number;
    /** InsuranceNeed */
    InsuranceNeed?: InsuranceNeed;
    /** xs:string */
    LastName: string;
    /** xs:string */
    LeadSource?: string;
    /** xs:string */
    LengthOfCoverage?: string;
    /** MaritalStatuses|xs:string|Married,Single,Separated,Divorced,Widowed,Unknown */
    MaritalStatus?: 'Married' | 'Single' | 'Separated' | 'Divorced' | 'Widowed' | 'Unknown';
    /** xs:string */
    Notes?: string;
    /** xs:string */
    OtherLeadSource?: string;
    /** xs:boolean */
    ParentsOrSiblingsCancerDeaths?: boolean;
    /** Prescreen */
    Prescreen?: Prescreen;
    /** ProductInterest */
    ProductInterest?: ProductInterest;
    /** Risk */
    Risk?: Risk;
    /** SmokingHistory|xs:string|No,Yes,Unknown */
    SmokingHistory?: "No" | "Yes" | "Unknown";
    /** Spouse */
    Spouse?: Spouse;
    /** xs:boolean */
    TreatedForHighBloodPressure?: boolean;
    /** xs:string */
    URL?: string;
    /** xs:string */
    UTM_URL?: string;
    /** xs:string */
    UsedCholesterolLoweringMeds?: string;
    /** xs:int */
    Weight?: number;
    /** xs:string */
    WhatPromptedYou?: string;
    /** xs:string */
    WhatPromptedYouOther?: string;
    /** xs:int */
    YearsOfSmoking?: number;
}
