"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndirectTransport = void 0;
var Transport_1 = require("./Transport");
var Request_1 = require("../Request");
var Error_1 = require("../Error");
var IndirectTransport = /** @class */ (function (_super) {
    __extends(IndirectTransport, _super);
    function IndirectTransport(intermediary) {
        var _this = _super.call(this) || this;
        _this.intermediary = intermediary;
        intermediary.setup(_this.onResponse.bind(_this));
        return _this;
    }
    IndirectTransport.prototype.onResponse = function (msg) {
        this.transportRequestManager.resolveResponse(msg);
    };
    IndirectTransport.prototype.connect = function () {
        return Promise.resolve();
    };
    IndirectTransport.prototype.sendData = function (data, timeout) {
        if (timeout === void 0) { timeout = null; }
        var prom = this.transportRequestManager.addRequest(data, timeout);
        var notifications = (0, Request_1.getNotifications)(data);
        var parsedData = this.parseData(data);
        if (data instanceof Array) {
            return Promise.reject();
        }
        try {
            this.intermediary.request(JSON.stringify(parsedData));
            this.transportRequestManager.settlePendingRequest(notifications);
            return prom;
        }
        catch (e) {
            var responseErr = new Error_1.JSONRPCError(e.message, Error_1.ERR_UNKNOWN, e);
            this.transportRequestManager.settlePendingRequest(notifications, responseErr);
            return Promise.reject(responseErr);
        }
    };
    IndirectTransport.prototype.close = function () {
    };
    return IndirectTransport;
}(Transport_1.Transport));
exports.IndirectTransport = IndirectTransport;
//# sourceMappingURL=IndirectTransport.js.map