import { Client as SoapClient, createClientAsync as soapCreateClientAsync } from "soap";
import { CreateLead } from "./definitions/CreateLead";
import { CreateLeadResponse } from "./definitions/CreateLeadResponse";
import { RemoveLeadFromLeadNuture } from "./definitions/RemoveLeadFromLeadNuture";
import { RemoveLeadFromLeadNutureResponse } from "./definitions/RemoveLeadFromLeadNutureResponse";
import { GetEmailAddressesForLeadNurturingRemoval } from "./definitions/GetEmailAddressesForLeadNurturingRemoval";
import { GetEmailAddressesForLeadNurturingRemovalResponse } from "./definitions/GetEmailAddressesForLeadNurturingRemovalResponse";
import { GetRisk } from "./definitions/GetRisk";
import { GetRiskResponse } from "./definitions/GetRiskResponse";
import { LeadService } from "./services/LeadService";

export interface LeadServiceClient extends SoapClient {
    LeadService: LeadService;
    CreateLeadAsync(createLead: CreateLead): Promise<[result: CreateLeadResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RemoveLeadFromLeadNutureAsync(removeLeadFromLeadNuture: RemoveLeadFromLeadNuture): Promise<[result: RemoveLeadFromLeadNutureResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetEmailAddressesForLeadNurturingRemovalAsync(getEmailAddressesForLeadNurturingRemoval: GetEmailAddressesForLeadNurturingRemoval): Promise<[result: GetEmailAddressesForLeadNurturingRemovalResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetRiskAsync(getRisk: GetRisk): Promise<[result: GetRiskResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create LeadServiceClient */
export function createClientAsync(...args: Parameters<typeof soapCreateClientAsync>): Promise<LeadServiceClient> {
    return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
