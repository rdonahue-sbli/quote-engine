import { CreateLead } from "../definitions/CreateLead";
import { CreateLeadResponse } from "../definitions/CreateLeadResponse";
import { RemoveLeadFromLeadNuture } from "../definitions/RemoveLeadFromLeadNuture";
import { RemoveLeadFromLeadNutureResponse } from "../definitions/RemoveLeadFromLeadNutureResponse";
import { GetEmailAddressesForLeadNurturingRemoval } from "../definitions/GetEmailAddressesForLeadNurturingRemoval";
import { GetEmailAddressesForLeadNurturingRemovalResponse } from "../definitions/GetEmailAddressesForLeadNurturingRemovalResponse";
import { GetRisk } from "../definitions/GetRisk";
import { GetRiskResponse } from "../definitions/GetRiskResponse";

export interface BasicHttpBindingILeadService {
    CreateLead(createLead: CreateLead, callback: (err: any, result: CreateLeadResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    RemoveLeadFromLeadNuture(removeLeadFromLeadNuture: RemoveLeadFromLeadNuture, callback: (err: any, result: RemoveLeadFromLeadNutureResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    GetEmailAddressesForLeadNurturingRemoval(getEmailAddressesForLeadNurturingRemoval: GetEmailAddressesForLeadNurturingRemoval, callback: (err: any, result: GetEmailAddressesForLeadNurturingRemovalResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    GetRisk(getRisk: GetRisk, callback: (err: any, result: GetRiskResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
