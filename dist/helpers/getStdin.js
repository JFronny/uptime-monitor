"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStdin = void 0;
const getStdin = async () => {
    let result = '';
    if (process.stdin.isTTY) {
        return result;
    }
    process.stdin.setEncoding('utf8');
    for await (const chunk of process.stdin) {
        result += chunk;
    }
    return result;
};
exports.getStdin = getStdin;
//# sourceMappingURL=getStdin.js.map