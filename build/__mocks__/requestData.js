"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMockResponseData = exports.generateMockErrorResponse = exports.generateMockNotificationResponse = exports.generateMockResponse = exports.generateMockRequest = exports.generateMockNotificationRequest = void 0;
var url_1 = __importDefault(require("url"));
var generateMockNotificationRequest = function (method, params) {
    return {
        jsonrpc: "2.0",
        method: method,
        params: params,
    };
};
exports.generateMockNotificationRequest = generateMockNotificationRequest;
var generateMockRequest = function (id, method, params) {
    return {
        id: id,
        jsonrpc: "2.0",
        method: method,
        params: params,
    };
};
exports.generateMockRequest = generateMockRequest;
var generateMockResponse = function (id, result, error) {
    return {
        id: id,
        jsonrpc: "2.0",
        result: result,
        error: error,
    };
};
exports.generateMockResponse = generateMockResponse;
var generateMockNotificationResponse = function (result, error) {
    return {
        jsonrpc: "2.0",
        result: result,
        error: error,
    };
};
exports.generateMockNotificationResponse = generateMockNotificationResponse;
var generateMockErrorResponse = function (id, data) {
    return {
        id: id,
        jsonrpc: "2.0",
        error: {
            code: -32000,
            message: "Error message",
            data: data,
        },
    };
};
exports.generateMockErrorResponse = generateMockErrorResponse;
var generateMockResponseData = function (uri, data) {
    var parsedUrl = url_1.default.parse(uri);
    var path = parsedUrl.path || "";
    var rpcNotification = path.search("rpc-notification");
    var rpcResponse = path.search("rpc-response");
    var rpcRequest = path.search("rpc-request");
    var rpcError = path.search("rpc-error");
    var rpcGarbage = path.search("rpc-garbage");
    if (rpcResponse > 0 || rpcRequest > 0) {
        return generateRequestResponse(false, data);
    }
    if (rpcError > 0) {
        return generateRequestResponse(true, data);
    }
    if (rpcNotification > 0) {
        return;
    }
    if (rpcGarbage > 0) {
        return "Garbage Response";
    }
    return data;
};
exports.generateMockResponseData = generateMockResponseData;
var generateSingleRequestResponse = function (error, data) {
    if (error) {
        return (0, exports.generateMockErrorResponse)(data.id, data);
    }
    return (0, exports.generateMockResponse)(data.id, data);
};
var generateRequestResponse = function (error, data) {
    var parsedReq = data;
    if (typeof data === "string") {
        parsedReq = JSON.parse(data);
    }
    if (parsedReq instanceof Array) {
        return JSON.stringify(parsedReq.map(function (parsed) { return generateSingleRequestResponse(error, parsed); }));
    }
    return JSON.stringify(generateSingleRequestResponse(error, parsedReq));
};
//# sourceMappingURL=requestData.js.map