import { AuthenticateUser } from "../definitions/AuthenticateUser";
import { AuthenticateUserResponse } from "../definitions/AuthenticateUserResponse";
import { GetCredentials } from "../definitions/GetCredentials";
import { GetCredentialsResponse } from "../definitions/GetCredentialsResponse";
import { GetInternalDomainList } from "../definitions/GetInternalDomainList";
import { GetInternalDomainListResponse } from "../definitions/GetInternalDomainListResponse";
import { CanPerformAction } from "../definitions/CanPerformAction";
import { CanPerformActionResponse } from "../definitions/CanPerformActionResponse";
import { Recache } from "../definitions/Recache";
import { RecacheResponse } from "../definitions/RecacheResponse";
import { GetRemoteSystems } from "../definitions/GetRemoteSystems";
import { GetRemoteSystemsResponse } from "../definitions/GetRemoteSystemsResponse";
import { InsertJobLog } from "../definitions/InsertJobLog";
import { InsertJobLogResponse } from "../definitions/InsertJobLogResponse";

export interface BasicHttpBindingISecurityService {
    AuthenticateUser(authenticateUser: AuthenticateUser, callback: (err: any, result: AuthenticateUserResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    GetCredentials(getCredentials: GetCredentials, callback: (err: any, result: GetCredentialsResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    GetInternalDomainList(getInternalDomainList: GetInternalDomainList, callback: (err: any, result: GetInternalDomainListResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    CanPerformAction(canPerformAction: CanPerformAction, callback: (err: any, result: CanPerformActionResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    Recache(recache: Recache, callback: (err: any, result: RecacheResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    GetRemoteSystems(getRemoteSystems: GetRemoteSystems, callback: (err: any, result: GetRemoteSystemsResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
    InsertJobLog(insertJobLog: InsertJobLog, callback: (err: any, result: InsertJobLogResponse, rawResponse: any, soapHeader: any, rawRequest: any) => void): void;
}
