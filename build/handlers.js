"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcHandler = void 0;
var RpcHandler = /** @class */ (function () {
    function RpcHandler(respFunc) {
        this.handlers = {};
        this.respFunc = function (request, response) {
            var resStr = JSON.stringify({ request: request, response: response });
            respFunc(btoa(resStr));
        };
    }
    RpcHandler.prototype.makeResponse = function (id, ret) {
        return {
            jsonrpc: "2.0",
            result: ret,
            id: id,
        };
    };
    RpcHandler.prototype.response = function (req, id, ret) {
        var resp = this.makeResponse(id, ret);
        this.respFunc(req, JSON.stringify(resp));
    };
    RpcHandler.prototype.handle = function (req) {
        var reqObj = JSON.parse(req);
        var id = reqObj['id'];
        var method = reqObj['method'];
        var params = reqObj['params'];
        this.handlers[method](id, params, this.response.bind(this, req));
    };
    RpcHandler.prototype.registHandler = function (name, handle) {
        this.handlers[name] = handle;
    };
    return RpcHandler;
}());
exports.RpcHandler = RpcHandler;
//# sourceMappingURL=handlers.js.map