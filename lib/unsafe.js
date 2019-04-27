"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("./tokens");
var Unsafe = /** @class */ (function () {
    function Unsafe(sql) {
        this.sql = sql;
    }
    Unsafe.prototype.toSql = function () {
        return this.sql;
    };
    Unsafe.prototype.toTokens = function () {
        return [
            new tokens_1.StringToken(this.sql),
        ];
    };
    return Unsafe;
}());
exports.Unsafe = Unsafe;
//# sourceMappingURL=unsafe.js.map