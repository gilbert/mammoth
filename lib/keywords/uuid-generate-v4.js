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
var _1 = require(".");
var UuidGenerateV4 = /** @class */ (function (_super) {
    __extends(UuidGenerateV4, _super);
    function UuidGenerateV4() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UuidGenerateV4.prototype.toSql = function () { return "uuid_generate_v4()"; };
    return UuidGenerateV4;
}(_1.Keyword));
exports.UuidGenerateV4 = UuidGenerateV4;
//# sourceMappingURL=uuid-generate-v4.js.map