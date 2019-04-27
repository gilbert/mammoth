"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var columns_1 = require("./columns");
var Table = /** @class */ (function () {
    function Table() {
    }
    return Table;
}());
exports.Table = Table;
var TableWrapper = /** @class */ (function () {
    function TableWrapper(table, name) {
        var _this = this;
        this.$table = table;
        this.$name = columns_1.toSnakeCase(name);
        this.$columnNames = Object.keys(table);
        var self = this;
        this.$columnNames.forEach(function (camelCaseName) {
            var column = table[camelCaseName];
            if (!(column instanceof columns_1.Column)) {
                throw new Error("Invalid column at " + name + "#" + camelCaseName);
            }
            var snakeCaseName = column.getSnakeCaseName(camelCaseName);
            if (self[camelCaseName]) {
                throw new Error("Column `" + camelCaseName + "` in table `" + name + "` collides with property of the same name in TableWrapper class.");
            }
            self[camelCaseName] = new _1.ColumnWrapper(_this, column, camelCaseName, snakeCaseName);
        });
        this.$row = undefined;
        this.$insertRow = undefined;
        this.$updateRow = undefined;
    }
    TableWrapper.prototype.init = function (db) {
        var _this = this;
        this.$columnNames.forEach(function (columnName) {
            var column = _this.$table[columnName];
            column.createReference(db);
        });
    };
    /** @internal */
    TableWrapper.prototype.getColumns = function () {
        var _this = this;
        return this.$columnNames.map(function (columnName) { return _this.getColumn(columnName); });
    };
    /** @internal */
    TableWrapper.prototype.getColumn = function (columnName) {
        return this[columnName];
    };
    /** @internal */
    TableWrapper.prototype.getName = function () {
        return this.$name;
    };
    return TableWrapper;
}());
exports.TableWrapper = TableWrapper;
//# sourceMappingURL=table.js.map