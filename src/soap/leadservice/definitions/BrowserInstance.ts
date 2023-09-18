import { BrowserSession } from "./BrowserSession";

/**
 * BrowserInstance
 * @targetNSAlias `tns`
 * @targetNamespace `http://schemas.datacontract.org/2004/07/ArrayWorks.Intertask.Services.Cloud.SBLI`
 */
export interface BrowserInstance {
    /** xs:string */
    AnonymousId: string;
    /** xs:string */
    BrowserName?: string | null;
    /** BrowserSession */
    BrowserSession?: BrowserSession;
    /** xs:string */
    BrowserVersion?: string | null;
    /** xs:string */
    DeviceType?: string | null;
    /** xs:string */
    DeviceVendor?: string | null;
    /** xs:string */
    OSFamily?: string | null;
}
