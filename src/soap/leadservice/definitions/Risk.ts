import { FamilyHistoryDeath } from "./FamilyHistoryDeath";
import { FamilyHistoryIndication } from "./FamilyHistoryIndication";
import { HazardousActivitiesScubaDivingLocations } from "./HazardousActivitiesScubaDivingLocations";

/**
 * Risk
 * @targetNSAlias `tns`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/ArrayWorks.Intertask.Services.Cloud.SBLI`
 */
export interface Risk {
    /** xs:string */
    AdditionalInformation?: string;
    /** xs:boolean */
    ArmedServices?: string;
    /** xs:dateTime */
    BirthDate?: string;
    /** xs:boolean */
    CholesterolBloodPressure?: string;
    /** Risk.CHOLESTEROL_BLOOD_PRESSURE_DURATIONS|xs:string|within-1-year,over-1-year */
    CholesterolBloodPressureDuration?: string;
    /** xs:boolean */
    CholesterolBloodPressureUnderControl?: string;
    /** xs:boolean */
    ConditionHistory?: string;
    /** xs:boolean */
    ConditionHistoryAlcoholAbuse?: string;
    /** xs:string */
    ConditionHistoryAlcoholAbuseLastDrink?: string;
    /** xs:string */
    ConditionHistoryAlcoholAbuseQuantity?: string;
    /** xs:boolean */
    ConditionHistoryAnxiety?: string;
    /** Risk.CONDITION_HISTORY_ANXIETY_SEVERITIES|xs:string|mild,moderate,severe */
    ConditionHistoryAnxietySeverity?: string;
    /** xs:string */
    ConditionHistoryAnxietyTreatment?: string;
    /** xs:string */
    ConditionHistoryAnxietyType?: string;
    /** xs:boolean */
    ConditionHistoryAsthma?: string;
    /** xs:boolean */
    ConditionHistoryAsthmaHospitalized?: string;
    /** xs:string */
    ConditionHistoryAsthmaMostRecentAttack?: string;
    /** xs:boolean */
    ConditionHistoryAsthmaPrednisone?: string;
    /** Risk.CONDITION_HISTORY_ASTHMA_SEVERITIES|xs:string|mild,moderate,severe */
    ConditionHistoryAsthmaSeverity?: string;
    /** xs:boolean */
    ConditionHistoryCancer?: string;
    /** xs:string */
    ConditionHistoryCancerTreatment?: string;
    /** xs:string */
    ConditionHistoryCancerType?: string;
    /** xs:boolean */
    ConditionHistoryCardioVascularDisease?: string;
    /** xs:boolean */
    ConditionHistoryCardioVascularDiseaseSurgery?: string;
    /** xs:dateTime */
    ConditionHistoryCardioVascularDiseaseWhen?: string;
    /** xs:boolean */
    ConditionHistoryCirrhosis?: string;
    /** xs:boolean */
    ConditionHistoryDepression?: string;
    /** xs:boolean */
    ConditionHistoryDiabetes?: string;
    /** xs:string */
    ConditionHistoryDiabetesDiagnosisDate?: string;
    /** Risk.MedicalConditions_Diabetes_Treatments|xs:string|diet,oral-medication,insulin */
    ConditionHistoryDiabetesTreatment?: string;
    /** xs:boolean */
    ConditionHistoryDrugAbuse?: string;
    /** xs:string */
    ConditionHistoryDrugAbuseDrugs?: string;
    /** xs:string */
    ConditionHistoryDrugAbuseLastUsed?: string;
    /** xs:boolean */
    ConditionHistoryEmphysema?: string;
    /** xs:boolean */
    ConditionHistoryOther?: string;
    /** xs:string */
    ConditionHistoryOtherExplanation?: string;
    /** xs:boolean */
    ConditionHistoryPanicAttacks?: string;
    /** Risk.CONDITION_HISTORY_PANIC_ATTACKS_SEVERITIES|xs:string|mild,moderate,severe */
    ConditionHistoryPanicAttacksSeverity?: string;
    /** xs:boolean */
    ConditionHistorySleepApnea?: string;
    /** xs:string */
    ConditionHistorySleepApneaHowLong?: string;
    /** xs:string */
    ConditionHistorySleepApneaTreatment?: string;
    /** xs:boolean */
    Conviction?: string;
    /** xs:string */
    ConvictionDetails?: string;
    /** xs:boolean */
    ConvictionProbation?: string;
    /** xs:string */
    CountryOfCitizenship?: string;
    /** xs:boolean */
    DUI?: string;
    /** xs:boolean */
    FamilyHistory?: string;
    /** FamilyHistoryDeath */
    FamilyHistoryDeath?: FamilyHistoryDeath;
    /** FamilyHistoryIndication */
    FamilyHistoryIndication?: FamilyHistoryIndication;
    /** xs:boolean */
    HazardousActivitiesBallooning?: string;
    /** xs:boolean */
    HazardousActivitiesClimbing?: string;
    /** xs:boolean */
    HazardousActivitiesFlyingPlane?: string;
    /** Risk.HAZARDOUS_ACTIVITIES_FLYING_PLANE_CERTIFICATIONS|xs:string|student,private,commercial */
    HazardousActivitiesFlyingPlaneCertification?: string;
    /** xs:dateTime */
    HazardousActivitiesFlyingPlaneCertificationDate?: string;
    /** xs:int */
    HazardousActivitiesFlyingPlaneFutureHours?: string;
    /** xs:int */
    HazardousActivitiesFlyingPlanePastHours?: string;
    /** xs:boolean */
    HazardousActivitiesHangGliding?: string;
    /** xs:boolean */
    HazardousActivitiesScubaDiving?: string;
    /** xs:boolean */
    HazardousActivitiesScubaDivingCertified?: string;
    /** Risk.HAZARDOUS_ACTIVITIES_SCUBA_DIVING_DEPTHS|xs:string|to-75-feet,76-to-100-feet,below-100-feet */
    HazardousActivitiesScubaDivingDepth?: string;
    /** xs:boolean */
    HazardousActivitiesScubaDivingDiveAlone?: string;
    /** xs:string */
    HazardousActivitiesScubaDivingEquipmentType?: string;
    /** xs:boolean */
    HazardousActivitiesScubaDivingForCompensation?: string;
    /** HazardousActivitiesScubaDivingLocations */
    HazardousActivitiesScubaDivingLocations?: HazardousActivitiesScubaDivingLocations;
    /** xs:boolean */
    HazardousActivitiesScubaDivingMemberClub?: string;
    /** xs:int */
    HazardousActivitiesScubaDivingNumberDives?: string;
    /** xs:int */
    HazardousActivitiesScubaDivingNumberFutureDives?: string;
    /** xs:string */
    HazardousActivitiesScubaDivingTimePerDive?: string;
    /** xs:boolean */
    HazardousActivitiesSkyDiving?: string;
    /** xs:boolean */
    HazardousActivitiesVehicleRacing?: string;
    /** Risk.HEIGHTS|xs:string|4-8-or-less,4-9,4-10,4-11,5-0,5-1,5-2,5-3,5-4,5-5,5-6,5-7,5-8,5-9,5-10,5-11,6-0,6-1,6-2,6-3,6-4,6-5,6-6,6-7,6-8,6-9,6-10,6-11-or-more */
    Height?: string;
    /** xs:boolean */
    LifestyleActivities?: string;
    /** xs:boolean */
    Medications?: string;
    /** xs:string */
    MedicationsDetails?: string;
    /** xs:boolean */
    MovingViolations?: string;
    /** Risk.MOVING_VIOLATIONS_NUMBERS|xs:string|1,2,3,4-or-more */
    MovingViolationsNumber?: string;
    /** xs:boolean */
    Procedures?: string;
    /** xs:string */
    ProceduresDetails?: string;
    /** xs:boolean */
    TobaccoUse?: string;
    /** xs:string */
    TobaccoUseDateLastUsed?: string;
    /** Risk.TOBACCO_USE_LENGTH_OF_USES|xs:string|1-2-years,3-5-years,6-10-years,greater-than-10-years */
    TobaccoUseLengthOfUse?: string;
    /** Risk.TOBACCO_USE_PRODUCT_TYPES|xs:string|cigarettes,cigars,pipe-tobacco,chewing-tobacco,other */
    TobaccoUseProductType?: string;
    /** Risk.TOBACCO_USE_PRODUCT_TYPE_CIGARS_FREQUENCIES|xs:string|0-2,more-than-2 */
    TobaccoUseProductTypeCigarsFrequency?: string;
    /** xs:boolean */
    Travel?: string;
    /** xs:boolean */
    TravelFuture?: string;
    /** xs:string */
    TravelFutureCurrentDuties1?: string;
    /** xs:string */
    TravelFutureCurrentDuties2?: string;
    /** xs:string */
    TravelFutureCurrentDuties3?: string;
    /** xs:string */
    TravelFutureCurrentOccupation1?: string;
    /** xs:string */
    TravelFutureCurrentOccupation2?: string;
    /** xs:string */
    TravelFutureCurrentOccupation3?: string;
    /** Risk.TRAVEL_FUTURE_DURATIONS|xs:string|0-2-months,greater-than-2-months */
    TravelFutureDuration1?: string;
    /** Risk.TRAVEL_FUTURE_DURATIONS|xs:string|0-2-months,greater-than-2-months */
    TravelFutureDuration2?: string;
    /** Risk.TRAVEL_FUTURE_DURATIONS|xs:string|0-2-months,greater-than-2-months */
    TravelFutureDuration3?: string;
    /** Risk.TRAVEL_PURPOSES|xs:string|student,missionary,government,employer,business,pleasure,other */
    TravelFuturePurpose1?: string;
    /** Risk.TRAVEL_PURPOSES|xs:string|student,missionary,government,employer,business,pleasure,other */
    TravelFuturePurpose2?: string;
    /** Risk.TRAVEL_PURPOSES|xs:string|student,missionary,government,employer,business,pleasure,other */
    TravelFuturePurpose3?: string;
    /** xs:string */
    TravelFutureWhen1?: string;
    /** xs:string */
    TravelFutureWhen2?: string;
    /** xs:string */
    TravelFutureWhen3?: string;
    /** xs:string */
    TravelFutureWhere1?: string;
    /** xs:string */
    TravelFutureWhere2?: string;
    /** xs:string */
    TravelFutureWhere3?: string;
    /** Risk.TRAVEL_FUTURE_WORK_ENVIRONMENTS|xs:string|metropolitan-area,rural-area,primitive-area */
    TravelFutureWorkEnvironment1?: string;
    /** Risk.TRAVEL_FUTURE_WORK_ENVIRONMENTS|xs:string|metropolitan-area,rural-area,primitive-area */
    TravelFutureWorkEnvironment2?: string;
    /** Risk.TRAVEL_FUTURE_WORK_ENVIRONMENTS|xs:string|metropolitan-area,rural-area,primitive-area */
    TravelFutureWorkEnvironment3?: string;
    /** xs:boolean */
    TravelPast?: string;
    /** Risk.TRAVEL_PAST_DURATIONS|xs:string|1-3-weeks,1-month,2-5-months,6-months-or-longer */
    TravelPastDuration1?: string;
    /** Risk.TRAVEL_PAST_DURATIONS|xs:string|1-3-weeks,1-month,2-5-months,6-months-or-longer */
    TravelPastDuration2?: string;
    /** Risk.TRAVEL_PAST_DURATIONS|xs:string|1-3-weeks,1-month,2-5-months,6-months-or-longer */
    TravelPastDuration3?: string;
    /** Risk.TRAVEL_PURPOSES|xs:string|student,missionary,government,employer,business,pleasure,other */
    TravelPastPurpose1?: string;
    /** Risk.TRAVEL_PURPOSES|xs:string|student,missionary,government,employer,business,pleasure,other */
    TravelPastPurpose2?: string;
    /** Risk.TRAVEL_PURPOSES|xs:string|student,missionary,government,employer,business,pleasure,other */
    TravelPastPurpose3?: string;
    /** xs:string */
    TravelPastWhen1?: string;
    /** xs:string */
    TravelPastWhen2?: string;
    /** xs:string */
    TravelPastWhen3?: string;
    /** xs:string */
    TravelPastWhere1?: string;
    /** xs:string */
    TravelPastWhere2?: string;
    /** xs:string */
    TravelPastWhere3?: string;
    /** xs:string */
    UnderwritingClass?: string;
    /** xs:boolean */
    UsCitizen?: string;
    /** Risk.US_CITIZEN_VISA_TYPES|xs:string|permanent,student,work */
    UsCitizenVisaType?: string;
    /** xs:boolean */
    UsCitizenVisaTypeWorkHealthcare?: string;
    /** xs:boolean */
    UsCitizenVisaTypeWorkRemain?: string;
    /** xs:boolean */
    UsCitizenVisaTypeWorkYears?: string;
    /** xs:int */
    Weight?: string;
}
