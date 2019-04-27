"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var query_1 = require("../query");
var tokens_1 = require("../tokens");
var Database = /** @class */ (function () {
    function Database(tables) {
        this.tables = tables;
    }
    Database.prototype.getTableNames = function () {
        return Object.keys(this.tables);
    };
    Database.prototype.sql = function (strings) {
        var parameters = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            parameters[_i - 1] = arguments[_i];
        }
        var text = strings.reduce(function (query, string, index) { return query + string + (index < parameters.length
            ? "$" + String(index + 1)
            : ""); }, "");
        // FIXME: this returns a pg.QueryResult which has `any[]` as type of the rows. This is
        // less than ideal. Ideally it's passed as a type so we avoid any.
        return this.exec(text, parameters);
    };
    Database.prototype.select = function () {
        var _this = this;
        var columns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columns[_i] = arguments[_i];
        }
        var columnsMap = columns.reduce(function (map, column) {
            var _a;
            return (__assign({}, map, (_a = {}, _a[column.getNameInResultSet()] = column.getCamelCaseName(), _a)));
        }, {});
        return {
            from: function (table) {
                return new query_1.SelectQuery(_this, columnsMap, new tokens_1.StringToken("SELECT"), new tokens_1.SeparatorToken(",", columns
                    .filter(function (column) { return Boolean(column); })
                    .map(function (column) { return new tokens_1.CollectionToken(column.toTokens()); })))
                    .from(table);
            },
        };
    };
    Database.prototype.insertInto = function (table) {
        return new query_1.InsertQuery(this, table, new tokens_1.StringToken("INSERT INTO"), new tokens_1.StringToken(table.getName()));
    };
    Database.prototype.deleteFrom = function (table) {
        return new query_1.DeleteQuery(this, table, new tokens_1.StringToken("DELETE FROM"), new tokens_1.StringToken(table.getName()));
    };
    Database.prototype.update = function (table) {
        var _this = this;
        var getColumn = function (key) { return table[key]; };
        return {
            set: function (object) {
                var keys = Object.keys(object);
                return new query_1.UpdateQuery(_this, table, new tokens_1.StringToken("UPDATE"), new tokens_1.StringToken(table.getName()), new tokens_1.StringToken("SET"), new tokens_1.SeparatorToken(",", keys
                    .map(function (columnName) { return getColumn(columnName); })
                    .filter(function (column) { return Boolean(column); })
                    .map(function (column) {
                    var value = object[column.camelCaseName];
                    return value && value.toTokens
                        ? new tokens_1.CollectionToken([
                            new tokens_1.StringToken(column.snakeCaseName),
                            new tokens_1.StringToken("=")
                        ].concat(value.toTokens()))
                        : new tokens_1.CollectionToken([
                            new tokens_1.StringToken(column.snakeCaseName),
                            new tokens_1.StringToken("="),
                            new tokens_1.ParameterToken(value),
                        ]);
                })));
            },
        };
    };
    return Database;
}());
exports.Database = Database;
//# sourceMappingURL=index.js.map