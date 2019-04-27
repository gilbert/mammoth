"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = require("../tokens");
var Keyword = /** @class */ (function () {
    function Keyword() {
    }
    Keyword.prototype.toTokens = function () {
        return [
            new tokens_1.StringToken(this.toSql()),
        ];
    };
    return Keyword;
}());
exports.Keyword = Keyword;
__export(require("./current-timestamp"));
__export(require("./default"));
__export(require("./now"));
__export(require("./uuid-generate-v4"));
//# sourceMappingURL=index.js.map