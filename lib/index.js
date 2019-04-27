"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var keywords_1 = require("./keywords");
var query_1 = require("./query");
var tokens_1 = require("./tokens");
__export(require("./database"));
__export(require("./database/pool"));
__export(require("./columns"));
__export(require("./transaction"));
__export(require("./unsafe"));
__export(require("./keywords"));
// TODO: move this to expressions.
exports.not = function (tokenable) { return new query_1.PartialQuery(new tokens_1.StringToken("NOT"), new tokens_1.GroupToken(tokenable.toTokens())); };
exports.now = function () { return new (query_1.PartialQuery.bind.apply(query_1.PartialQuery, [void 0].concat(new keywords_1.Now().toTokens())))(); };
//# sourceMappingURL=index.js.map