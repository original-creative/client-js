declare type WebJsonRpcResponse = (res: string) => void;
export interface RpcResponseFunc {
    (request: any, response?: any): void;
}
export interface RpcHandleFunc {
    (id: any, params: any, respFunc: RpcResponseFunc): void;
}
export declare class RpcHandler {
    private respFunc;
    private handlers;
    constructor(respFunc: WebJsonRpcResponse);
    makeResponse(id: any, ret: any): object;
    response(req: string, id: any, ret: any): void;
    handle(req: string): void;
    registHandler(name: string, handle: RpcHandleFunc): void;
}
export {};
