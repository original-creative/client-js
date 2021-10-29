import { Transport } from "./Transport";
import { JSONRPCRequestData } from "../Request";
export interface ResponseFunc {
    (msg: string): void;
}
export interface Intermediary {
    request(msg: string, response: ResponseFunc): void;
}
export declare class IndirectTransport extends Transport {
    intermediary: Intermediary;
    constructor(intermediary: Intermediary);
    onResponse(msg: string): void;
    connect(): Promise<any>;
    sendData(data: JSONRPCRequestData, timeout?: number | null): Promise<any>;
    close(): void;
}
