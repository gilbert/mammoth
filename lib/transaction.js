"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction = /** @class */ (function () {
    function Transaction(client) {
        this.client = client;
    }
    Transaction.prototype.begin = function () {
        return this.client.query("BEGIN");
    };
    Transaction.prototype.commit = function () {
        return this.client.query("COMMIT");
    };
    Transaction.prototype.rollback = function () {
        return this.client.query("ROLLBACK");
    };
    return Transaction;
}());
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map