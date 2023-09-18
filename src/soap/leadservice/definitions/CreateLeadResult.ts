import { Errors } from "./Errors";

/**
 * CreateLeadResult
 * @targetNSAlias `q2`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/ArrayWorks.Intertask.Services.Cloud`
 */
export interface CreateLeadResult {
    /** xs:long */
    EntityID?: string;
    /** Errors */
    Errors?: Errors;
}
