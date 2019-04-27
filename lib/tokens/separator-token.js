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
var SeparatorToken = /** @class */ (function (_super) {
    __extends(SeparatorToken, _super);
    function SeparatorToken(separator, tokens) {
        var _this = _super.call(this) || this;
        _this.separator = separator;
        _this.tokens = tokens;
        return _this;
    }
    SeparatorToken.prototype.reduce = function (state, numberOfParameters) {
        var _this = this;
        var length = this.tokens.length;
        var parameterIndex = numberOfParameters;
        this.tokens.forEach(function (token, index) {
            var _a, _b;
            var last = index === length - 1;
            var tokenState = query_1.createState([token], parameterIndex);
            if (tokenState.text.length > 0) {
                if (!last) {
                    tokenState.text[tokenState.text.length - 1] += _this.separator;
                }
            }
            (_a = state.text).push.apply(_a, tokenState.text);
            (_b = state.parameters).push.apply(_b, tokenState.parameters);
            parameterIndex += tokenState.parameters.length;
        });
        return state;
    };
    return SeparatorToken;
}(token_1.Token));
exports.SeparatorToken = SeparatorToken;
//# sourceMappingURL=separator-token.js.map