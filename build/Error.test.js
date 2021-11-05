"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Error_1 = require("./Error");
var requestData_1 = require("./__mocks__/requestData");
describe("Error test", function () {
    it("should convert payload to JSONRPC error ", function () {
        var err = (0, Error_1.convertJSONToRPCError)("message");
        expect(err instanceof Error).toBe(true);
        err = (0, Error_1.convertJSONToRPCError)((0, requestData_1.generateMockErrorResponse)(1, "somedata"));
        expect(err instanceof Error).toBe(true);
    });
    it("should construct JSONRPCError", function () {
        var err = new Error_1.JSONRPCError("test", 9999);
        var err2 = new Error_1.JSONRPCError("test", 9999, "testdata");
    });
    it("should be able to use instanceof", function () {
        var err = new Error_1.JSONRPCError("test", 9999);
        expect(err instanceof Error_1.JSONRPCError).toBe(true);
    });
});
//# sourceMappingURL=Error.test.js.map