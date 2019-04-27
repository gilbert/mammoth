"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = require("../query");
var token_1 = require("./token");
var GroupToken = /** @class */ (function (_super) {
    __extends(GroupToken, _super);
    function GroupToken(tokens, open, close) {
        if (open === void 0) { open = '('; }
        if (close === void 0) { close = ')'; }
        var _this = _super.call(this) || this;
        _this.open = open;
        _this.close = close;
        _this.tokens = tokens;
        return _this;
    }
    GroupToken.prototype.reduce = function (state, numberOfParameters) {
        var _a, _b;
        var tokensState = query_1.createState(this.tokens, numberOfParameters);
        (_a = state.parameters).push.apply(_a, tokensState.parameters);
        var index = tokensState.text.length - 1;
        if (index >= 0) {
            tokensState.text[0] = "" + this.open + tokensState.text[0];
            tokensState.text[tokensState.text.length - 1] = "" + tokensState.text[tokensState.text.length - 1] + this.close;
        }
        else {
            // TODO: If there are no items. Shuold we still add the () characters? Or a fallback?
        }
        (_b = state.text).push.apply(_b, tokensState.text);
        return state;
    };
    return GroupToken;
}(token_1.Token));
exports.GroupToken = GroupToken;
//# sourceMappingURL=group-token.js.map