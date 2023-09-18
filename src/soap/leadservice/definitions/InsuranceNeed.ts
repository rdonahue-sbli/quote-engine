
/**
 * InsuranceNeed
 * @targetNSAlias `tns`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/ArrayWorks.Intertask.Services.Cloud.SBLI`
 */
export interface InsuranceNeed {
    /** xs:double */
    AutoAndCreditCards?: number;
    /** xs:double */
    BusinessLoans?: number;
    /** xs:double */
    CharitiesOrOther?: number;
    /** xs:int */
    Child1Age?: number;
    /** xs:int */
    Child2Age?: number;
    /** xs:int */
    Child3Age?: number;
    /** xs:int */
    Child4Age?: number;
    /** xs:int */
    Child5Age?: number;
    /** xs:int */
    Child6Age?: number;
    /** xs:double */
    ChildMovedBackHome?: number;
    /** CollegeNeeds|xs:string|No,Public,Private,CommunityCollege,TradeSchool,UNKNOWN */
    CollegeNeed?: "No" | "Public" | "Private" | "CommunityCollege" | "TradeSchool" | "UNKNOWN";
    /** xs:double */
    CreditCards?: number;
    /** xs:double */
    EducationLoans?: number;
    /** xs:double */
    ElderlyParentCare?: number;
    /** xs:double */
    ExistingLifeInsurance?: number;
    /** xs:double */
    HomeValue?: number;
    /** xs:dateTime */
    LastRevised?: string;
    /** xs:double */
    MonthlyRent?: number;
    /** xs:double */
    MortgageBalance?: number;
    /** xs:int */
    NumberOfChildren10to17?: number;
    /** xs:int */
    NumberOfChildren18Plus?: number;
    /** xs:int */
    NumberOfChildrenUnder10?: number;
    /** xs:double */
    OtherAssets?: number;
    /** xs:double */
    OtherDebt?: number;
    /** xs:double */
    PersonalLoans?: number;
    /** PrimaryLifeInsuranceGoals|xs:string|FamilyProtection,MortgageProtection,BusinessProtection,PlanningRetirement,TaxAdvantagedEstatePlanning,Unknown */
    PrimaryLifeInsuranceGoal?: "FamilyProtection" | "MortgageProtection" | "BusinessProtection" | "PlanningRetirement" | "TaxAdvantagedEstatePlanning" | "Unknown";
    /** xs:double */
    RetirementOrPension?: number;
    /** xs:double */
    SavingsInvestments?: number;
    /** xs:double */
    SpecialNeedsDependents?: number;
    /** xs:double */
    TotalInsuranceNeeds?: number;
    /** xs:double */
    Trusts?: number;
    /** xs:int */
    YearsOfProtection?: number;
    /** xs:string */
    ZipCode?: string;
}
