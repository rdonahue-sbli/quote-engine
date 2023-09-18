import { Client as SoapClient, createClientAsync as soapCreateClientAsync } from "soap";
import { AuthenticateUser } from "./definitions/AuthenticateUser";
import { AuthenticateUserResponse } from "./definitions/AuthenticateUserResponse";
import { GetCredentials } from "./definitions/GetCredentials";
import { GetCredentialsResponse } from "./definitions/GetCredentialsResponse";
import { GetInternalDomainList } from "./definitions/GetInternalDomainList";
import { GetInternalDomainListResponse } from "./definitions/GetInternalDomainListResponse";
import { CanPerformAction } from "./definitions/CanPerformAction";
import { CanPerformActionResponse } from "./definitions/CanPerformActionResponse";
import { Recache } from "./definitions/Recache";
import { RecacheResponse } from "./definitions/RecacheResponse";
import { GetRemoteSystems } from "./definitions/GetRemoteSystems";
import { GetRemoteSystemsResponse } from "./definitions/GetRemoteSystemsResponse";
import { InsertJobLog } from "./definitions/InsertJobLog";
import { InsertJobLogResponse } from "./definitions/InsertJobLogResponse";
import { SecurityService } from "./services/SecurityService";

export interface SecurityServiceClient extends SoapClient {
    SecurityService: SecurityService;
    AuthenticateUserAsync(authenticateUser: AuthenticateUser): Promise<[result: AuthenticateUserResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetCredentialsAsync(getCredentials: GetCredentials): Promise<[result: GetCredentialsResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetInternalDomainListAsync(getInternalDomainList: GetInternalDomainList): Promise<[result: GetInternalDomainListResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    CanPerformActionAsync(canPerformAction: CanPerformAction): Promise<[result: CanPerformActionResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    RecacheAsync(recache: Recache): Promise<[result: RecacheResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    GetRemoteSystemsAsync(getRemoteSystems: GetRemoteSystems): Promise<[result: GetRemoteSystemsResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
    InsertJobLogAsync(insertJobLog: InsertJobLog): Promise<[result: InsertJobLogResponse, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/** Create SecurityServiceClient */
export function createClientAsync(...args: Parameters<typeof soapCreateClientAsync>): Promise<SecurityServiceClient> {
    return soapCreateClientAsync(args[0], args[1], args[2]) as any;
}
