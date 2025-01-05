"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_tls_1 = require("./check-tls");
test("checkTls", async () => {
    const tcpResult = await (0, check_tls_1.checkTls)({
        address: "frohnmeyer-wds.de",
        port: 465
    });
    expect(tcpResult.results.every((result) => Object.prototype.toString.call(result.err) === "[object Error]")).toBe(false);
    expect(tcpResult.avg || -1).toBeGreaterThan(0);
    expect(tcpResult.avg || 0).toBeLessThan(60000);
});
test("checkTls2", async () => {
    const tcpResult = await (0, check_tls_1.checkTls)({
        address: "wrong.host.badssl.com",
    });
    console.log(tcpResult);
    expect(tcpResult.results.every((result) => Object.prototype.toString.call(result.err) === "[object Error]")).toBe(true);
    expect(tcpResult.avg).toBe(0);
});
test("checkTls3", async () => {
    const tcpResult = await (0, check_tls_1.checkTls)({
        address: "expired.host.badssl.com",
    });
    expect(tcpResult.results.every((result) => Object.prototype.toString.call(result.err) === "[object Error]")).toBe(true);
    expect(tcpResult.avg).toBe(0);
});
test("checkTls4", async () => {
    const tcpResult = await (0, check_tls_1.checkTls)({
        address: "self-signed.badssl.com",
    });
    expect(tcpResult.results.every((result) => Object.prototype.toString.call(result.err) === "[object Error]")).toBe(true);
    expect(tcpResult.avg).toBe(0);
});
//# sourceMappingURL=check-tls.spec.js.map