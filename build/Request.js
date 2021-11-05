"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = exports.getBatchRequests = exports.isNotification = void 0;
var isNotification = function (data) {
    return (data.request.id === undefined || data.request.id === null);
};
exports.isNotification = isNotification;
var getBatchRequests = function (data) {
    if (data instanceof Array) {
        return data.filter(function (datum) {
            var id = datum.request.request.id;
            return id !== null && id !== undefined;
        }).map(function (batchRequest) {
            return batchRequest.request;
        });
    }
    return [];
};
exports.getBatchRequests = getBatchRequests;
var getNotifications = function (data) {
    if (data instanceof Array) {
        return data.filter(function (datum) {
            return (0, exports.isNotification)(datum.request);
        }).map(function (batchRequest) {
            return batchRequest.request;
        });
    }
    if ((0, exports.isNotification)(data)) {
        return [data];
    }
    return [];
};
exports.getNotifications = getNotifications;
//# sourceMappingURL=Request.js.map