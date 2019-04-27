"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var keywords_1 = require("./keywords");
var tokens_1 = require("./tokens");
exports.createState = function (tokens, numberOfParameters) {
    var initialState = {
        text: [],
        parameters: [],
    };
    return tokens.reduce(function (tokenState, token) {
        return token.reduce(tokenState, tokenState.parameters.length + numberOfParameters);
    }, initialState);
};
var Query = /** @class */ (function () {
    function Query(db, columnsMap) {
        if (columnsMap === void 0) { columnsMap = {}; }
        var tokens = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            tokens[_i - 2] = arguments[_i];
        }
        var _this = this;
        this.getRow = function (row) {
            return row
                ? Object.keys(row).reduce(function (camelCaseRow, key) {
                    var _a;
                    return (__assign({}, camelCaseRow, (_a = {}, _a[_this.columnsMap[key]] = row[key], _a)));
                }, {})
                : undefined;
        };
        this.db = db;
        // TODO: this is actually a result set description as it's only used to match the field from
        // the result set to the expected column in the select or returning call.
        this.columnsMap = columnsMap;
        this.type = 'COUNT';
        this.tokens = tokens || [];
    }
    /** @internal */
    Query.prototype.toTokens = function () {
        return this.tokens;
    };
    Query.prototype.first = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exec()];
                    case 1:
                        ret = _a.sent();
                        switch (this.type) {
                            case 'COUNT':
                                return [2 /*return*/, undefined];
                            case 'ROWS':
                                return [2 /*return*/, ret[0]];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Query.prototype.map = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exec()];
                    case 1:
                        ret = _a.sent();
                        switch (this.type) {
                            case 'COUNT':
                                return [2 /*return*/, []];
                            case 'ROWS':
                                return [2 /*return*/, ret.map(callback)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Query.prototype.filter = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.exec()];
                    case 1:
                        ret = _a.sent();
                        switch (this.type) {
                            case 'COUNT':
                                return [2 /*return*/, []];
                            case 'ROWS':
                                return [2 /*return*/, ret.filter(callback)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Query.prototype.getRet = function (result) {
        switch (this.type) {
            case 'COUNT':
                return result.rowCount;
            case 'ROWS':
                return result.rows.map(this.getRow);
        }
    };
    /** @internal */
    Query.prototype.exec = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this.toQuery();
                        return [4 /*yield*/, this.db.exec(query.text, query.parameters)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, this.getRet(result)];
                }
            });
        });
    };
    Query.prototype.then = function (onFulfilled, onRejected) {
        return __awaiter(this, void 0, void 0, function () {
            var ret, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.exec()];
                    case 1:
                        ret = _a.sent();
                        if (onFulfilled) {
                            return [2 /*return*/, onFulfilled(ret)];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        if (onRejected) {
                            return [2 /*return*/, onRejected(e_1)];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /** @internal */
    Query.prototype.toQuery = function () {
        var state = exports.createState(this.tokens, 0);
        return {
            text: state.text.join(' '),
            parameters: state.parameters,
        };
    };
    Query.prototype.append = function (strings, parameters) {
        var _a, _b;
        if (!strings) {
            return;
        }
        for (var i = 0; i < strings.length; i += 1) {
            var string = strings[i];
            if (string.length > 0) {
                this.tokens.push(new tokens_1.StringToken(string));
            }
            if (parameters && i < parameters.length) {
                var parameter = parameters[i];
                if (parameter instanceof Query) {
                    var query = parameter;
                    (_a = this.tokens).push.apply(_a, query.tokens);
                }
                else if (parameter instanceof tokens_1.Token) {
                    this.tokens.push(parameter);
                }
                else if (Array.isArray(parameter) &&
                    parameter.length > 0 &&
                    parameter[0] instanceof Query) {
                    // We assume everything in the array is a query now. This is tricky.
                    for (var j = 0, jl = parameter.length; j < jl; j++) {
                        var subinstance = parameter[j];
                        (_b = this.tokens).push.apply(_b, subinstance.tokens);
                        if (j + 1 < jl) {
                            this.tokens.push(new tokens_1.StringToken(', '));
                        }
                    }
                }
                else {
                    this.tokens.push(new tokens_1.ParameterToken(parameter));
                }
            }
        }
    };
    Query.prototype.internalFrom = function (table) {
        this.tokens.push(new tokens_1.StringToken("FROM"), new tokens_1.StringToken(table.getName()));
        return this;
    };
    Query.prototype.internalJoin = function (type, table) {
        var _this = this;
        this.tokens.push(new tokens_1.StringToken(type), new tokens_1.StringToken(table.getName()));
        return {
            on: function (tokenable) {
                _this.tokens.push(new tokens_1.StringToken("ON"), new tokens_1.GroupToken(tokenable.toTokens()));
                return _this;
            },
            using: function () {
                var columnNames = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    columnNames[_i] = arguments[_i];
                }
                _this.tokens.push(new tokens_1.StringToken("USING"), new tokens_1.GroupToken(columnNames.map(function (columnName) { return new tokens_1.StringToken(columnName); })));
                return _this;
            },
        };
    };
    Query.prototype.internalWhere = function (tokenable) {
        var _a;
        this.append(templateObject_1 || (templateObject_1 = __makeTemplateObject(["WHERE"], ["WHERE"])));
        (_a = this.tokens).push.apply(_a, tokenable.toTokens());
        return this;
    };
    Query.prototype.internalReturning = function () {
        var columns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columns[_i] = arguments[_i];
        }
        this.type = 'ROWS';
        this.columnsMap = columns.filter(function (column) { return Boolean(column); }).reduce(function (map, column) {
            var _a;
            return (__assign({}, map, (_a = {}, _a[column.getSnakeCaseName()] = column.getCamelCaseName(), _a)));
        }, {});
        this.tokens.push(new tokens_1.StringToken("RETURNING"), new tokens_1.SeparatorToken(",", columns
            .filter(function (column) { return Boolean(column); })
            .map(function (column) { return new tokens_1.CollectionToken(column.toTokens()); })));
        return this;
    };
    return Query;
}());
exports.Query = Query;
var PartialQuery = /** @class */ (function () {
    function PartialQuery() {
        var tokens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tokens[_i] = arguments[_i];
        }
        this.tokens = [];
        this.tokens = tokens || [];
    }
    PartialQuery.prototype.toTokens = function () {
        return this.tokens;
    };
    PartialQuery.prototype.add = function (partialQuery, separator) {
        var _a;
        (_a = this.tokens).push.apply(_a, [new tokens_1.StringToken(separator)].concat(partialQuery.toTokens()));
        return this;
    };
    PartialQuery.prototype.or = function (partialQuery) {
        return this.add(partialQuery, "OR");
    };
    PartialQuery.prototype.and = function (partialQuery) {
        var _a;
        this.tokens.push(new tokens_1.StringToken("AND"));
        if (partialQuery) {
            (_a = this.tokens).push.apply(_a, partialQuery.toTokens());
        }
        return this;
    };
    PartialQuery.prototype.andNotExists = function (partialQuery) {
        this.tokens.push(new tokens_1.StringToken("AND NOT EXISTS"), new tokens_1.GroupToken(partialQuery.toTokens()));
        return this;
    };
    PartialQuery.prototype.andExists = function (partialQuery) {
        this.tokens.push(new tokens_1.StringToken("AND EXISTS"), new tokens_1.GroupToken(partialQuery.toTokens()));
        return this;
    };
    PartialQuery.prototype.minus = function (string) {
        this.tokens.push(new tokens_1.StringToken("-"), new tokens_1.ParameterToken(string));
        return this;
    };
    PartialQuery.prototype.plus = function (string) {
        this.tokens.push(new tokens_1.StringToken("+"), new tokens_1.ParameterToken(string));
        return this;
    };
    PartialQuery.prototype.gt = function (partialQuery) {
        var _a;
        (_a = this.tokens).push.apply(_a, [new tokens_1.StringToken(">")].concat(partialQuery.toTokens()));
        return this;
    };
    PartialQuery.prototype.lt = function (partialQuery) {
        var _a;
        (_a = this.tokens).push.apply(_a, [new tokens_1.StringToken("<")].concat(partialQuery.toTokens()));
        return this;
    };
    PartialQuery.prototype.gte = function (partialQuery) {
        var _a;
        (_a = this.tokens).push.apply(_a, [new tokens_1.StringToken(">=")].concat(partialQuery.toTokens()));
        return this;
    };
    PartialQuery.prototype.lte = function (partialQuery) {
        var _a;
        (_a = this.tokens).push.apply(_a, [new tokens_1.StringToken("<=")].concat(partialQuery.toTokens()));
        return this;
    };
    PartialQuery.prototype.not = function (partialQuery) {
        var _a;
        this.tokens.push(new tokens_1.StringToken("NOT"));
        if (partialQuery) {
            (_a = this.tokens).push.apply(_a, partialQuery.toTokens());
        }
        return this;
    };
    PartialQuery.prototype.in = function (object) {
        if (object instanceof PartialQuery) {
            this.tokens.push(new tokens_1.StringToken("IN"), new tokens_1.GroupToken(object.tokens));
        }
        else if (object instanceof Query) {
            this.tokens.push(new tokens_1.StringToken("IN"), new tokens_1.GroupToken(object.toTokens()));
        }
        else {
            this.tokens.push(new tokens_1.StringToken("IN"), new tokens_1.GroupToken([new tokens_1.ParameterToken(object)]));
        }
        return this;
    };
    // TODO: Move this to an order by query.
    PartialQuery.prototype.nullsFirst = function () {
        this.tokens.push(new tokens_1.StringToken("NULLS FIRST"));
        return this;
    };
    PartialQuery.prototype.nullsLast = function () {
        this.tokens.push(new tokens_1.StringToken("NULLS LAST"));
        return this;
    };
    return PartialQuery;
}());
exports.PartialQuery = PartialQuery;
var InsertQuery = /** @class */ (function (_super) {
    __extends(InsertQuery, _super);
    function InsertQuery(db, table) {
        var tokens = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            tokens[_i - 2] = arguments[_i];
        }
        var _this = _super.apply(this, [db, {}].concat(tokens)) || this;
        _this.table = table;
        return _this;
    }
    InsertQuery.prototype.getRet = function (result) {
        // TODO: we should support an array in InsertQuery#values. Based on the input we determine the output of the insert into.
        switch (this.type) {
            case "COUNT":
                return result.rowCount;
            case "ROWS":
                return this.getRow(result.rows[0]);
        }
    };
    InsertQuery.prototype.getColumn = function (key) {
        return this.table[key];
    };
    InsertQuery.prototype.defaultValues = function () {
        this.tokens.push(new tokens_1.StringToken("DEFAULT VALUES"));
        return this;
    };
    // TODO: the return type of the query, in the object, should only contain a single field and the
    // field name shouldn't matter. Now it may contain multiple fields which is not possible at
    // runtime.
    InsertQuery.prototype.values = function (object) {
        var _this = this;
        var objects = Array.isArray(object) ? object : [object];
        var firstObject = objects[0];
        var keys = Object.keys(firstObject).filter(function (key) { return firstObject[key] !== null; });
        if (keys.length === 0) {
            if (objects.length === 1) {
                return this.defaultValues();
            }
            // TODO: insert multiple rows with default values.
            throw new Error("inserting multiple rows with default values is not possible yet");
        }
        else {
            this.tokens.push(new tokens_1.GroupToken([
                new tokens_1.SeparatorToken(',', keys
                    .map(function (key) { return _this.getColumn(key); })
                    .filter(function (column) { return Boolean(column); })
                    .map(function (column) { return new tokens_1.StringToken(column.snakeCaseName); })),
            ]), new tokens_1.StringToken("VALUES"), new tokens_1.SeparatorToken(',', objects.map(function (object) {
                return new tokens_1.GroupToken([
                    new tokens_1.SeparatorToken(',', keys.map(function (key) { return new tokens_1.ParameterToken(object[key]); })),
                ]);
            })));
        }
        return this;
    };
    InsertQuery.prototype.onConflict = function () {
        var _this = this;
        var columnNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columnNames[_i] = arguments[_i];
        }
        // TODO: It's also possible to specify ON CONSTRAINT :constraintName.
        this.tokens.push(new tokens_1.StringToken("ON CONFLICT"), new tokens_1.GroupToken([
            new tokens_1.SeparatorToken(",", columnNames
                .map(function (columnName) { return _this.getColumn(columnName); })
                .filter(function (column) { return Boolean(column); })
                .map(function (column) { return new tokens_1.StringToken(column.snakeCaseName); })),
        ]));
        return {
            doNothing: function () {
                _this.tokens.push(new tokens_1.StringToken("DO NOTHING"));
                return _this;
            },
            doUpdateSet: function (object) {
                var keys = Object.keys(object);
                var getValueTokens = function (value) {
                    if (value instanceof keywords_1.Keyword) {
                        return new tokens_1.StringToken(value.toSql());
                    }
                    else if (value instanceof Query) {
                        return new tokens_1.GroupToken(value.toTokens());
                    }
                    return new tokens_1.ParameterToken(value);
                };
                _this.tokens.push(new tokens_1.StringToken("DO UPDATE SET"), new tokens_1.SeparatorToken(",", keys
                    .map(function (columnName) { return _this.getColumn(columnName); })
                    .filter(function (column) { return Boolean(column); })
                    .map(function (column) {
                    var value = object[column.camelCaseName];
                    return new tokens_1.CollectionToken([
                        new tokens_1.StringToken(column.snakeCaseName),
                        new tokens_1.StringToken("="),
                        getValueTokens(value),
                    ]);
                })));
                return new (UpsertQuery.bind.apply(UpsertQuery, [void 0, _this.db, _this.table].concat(_this.tokens)))();
            },
        };
    };
    InsertQuery.prototype.returning = function () {
        var _this = this;
        var columns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columns[_i] = arguments[_i];
        }
        return this.internalReturning.apply(this, columns.map(function (columnOrColumnName) {
            return typeof columnOrColumnName === "string"
                ? _this.getColumn(columnOrColumnName)
                : columnOrColumnName;
        }));
    };
    return InsertQuery;
}(Query));
exports.InsertQuery = InsertQuery;
var UpsertQuery = /** @class */ (function (_super) {
    __extends(UpsertQuery, _super);
    function UpsertQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpsertQuery.prototype.where = function (tokenable) {
        return this.internalWhere(tokenable);
    };
    return UpsertQuery;
}(InsertQuery));
exports.UpsertQuery = UpsertQuery;
var SelectQuery = /** @class */ (function (_super) {
    __extends(SelectQuery, _super);
    function SelectQuery() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'ROWS';
        return _this;
    }
    /** @internal */
    SelectQuery.prototype.from = function (table) {
        // TODO: move this to the constructor so we do not have to expose SelectQuery#from().
        return this.internalFrom(table);
    };
    SelectQuery.prototype.join = function (table) {
        return this.internalJoin('JOIN', table);
    };
    SelectQuery.prototype.crossJoin = function (table) {
        return this.internalJoin('CROSS JOIN', table);
    };
    SelectQuery.prototype.innerJoin = function (table) {
        return this.internalJoin('INNER JOIN', table);
    };
    SelectQuery.prototype.leftJoin = function (table) {
        // TODO: this isn't rock solid yet. It's changing the return type of the columns selected from the
        // left joined table to be undefined (as that's how it supposed to be). But, we're targeting the
        // columns based on the name, so a collision is likely and column#as() is not supported as it doesn't
        // change the return type.
        return this.internalJoin('LEFT JOIN', table);
    };
    SelectQuery.prototype.rightJoin = function (table) {
        return this.internalJoin('RIGHT JOIN', table);
    };
    SelectQuery.prototype.leftOuterJoin = function (table) {
        return this.internalJoin('LEFT OUTER JOIN', table);
    };
    SelectQuery.prototype.rightOuterJoin = function (table) {
        return this.internalJoin('RIGHT OUTER JOIN', table);
    };
    SelectQuery.prototype.fulllOuterJoin = function (table) {
        return this.internalJoin('FULL OUTER JOIN', table);
    };
    SelectQuery.prototype.fullJoin = function (table) {
        return this.internalJoin('FULL JOIN', table);
    };
    SelectQuery.prototype.where = function (tokenable) {
        return this.internalWhere(tokenable);
    };
    SelectQuery.prototype.limit = function (limit) {
        this.append(templateObject_2 || (templateObject_2 = __makeTemplateObject(["LIMIT"], ["LIMIT"])));
        if (typeof limit === 'number') {
            this.tokens.push(new tokens_1.StringToken(String(limit)));
        }
        else {
            this.tokens.push(new tokens_1.StringToken("ALL"));
        }
        return this;
    };
    SelectQuery.prototype.offset = function (offset) {
        this.tokens.push(new tokens_1.StringToken("OFFSET " + offset));
        return this;
    };
    SelectQuery.prototype.having = function (tokenable) {
        // TODO: should tokenable be a list like in orderBy?
        var _a;
        (_a = this.tokens).push.apply(_a, [new tokens_1.StringToken("HAVING")].concat(tokenable.toTokens()));
        return this;
    };
    SelectQuery.prototype.orderBy = function () {
        var tokenables = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tokenables[_i] = arguments[_i];
        }
        this.tokens.push(new tokens_1.StringToken("ORDER BY"), new tokens_1.SeparatorToken(",", tokenables.map(function (tokenable) { return new tokens_1.CollectionToken(tokenable.toTokens()); })));
        return this;
    };
    SelectQuery.prototype.forUpdate = function () {
        this.tokens.push(new tokens_1.StringToken("FOR UPDATE"));
        return this;
    };
    SelectQuery.prototype.skipLocked = function () {
        this.tokens.push(new tokens_1.StringToken("SKIP LOCKED"));
        return this;
    };
    SelectQuery.prototype.groupBy = function () {
        var columns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columns[_i] = arguments[_i];
        }
        this.tokens.push(new tokens_1.StringToken("GROUP BY"), new tokens_1.SeparatorToken(",", columns.map(function (column) { return new tokens_1.CollectionToken(column.toTokens()); })));
        return this;
    };
    return SelectQuery;
}(Query));
exports.SelectQuery = SelectQuery;
var UpdateQuery = /** @class */ (function (_super) {
    __extends(UpdateQuery, _super);
    function UpdateQuery(db, table) {
        var tokens = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            tokens[_i - 2] = arguments[_i];
        }
        var _this = _super.apply(this, [db, {}].concat(tokens)) || this;
        _this.table = table;
        return _this;
    }
    UpdateQuery.prototype.getColumn = function (key) {
        return this.table[key];
    };
    UpdateQuery.prototype.from = function (table) {
        return this.internalFrom(table);
    };
    UpdateQuery.prototype.join = function (table) {
        return this.internalJoin('JOIN', table);
    };
    UpdateQuery.prototype.crossJoin = function (table) {
        return this.internalJoin('CROSS JOIN', table);
    };
    UpdateQuery.prototype.innerJoin = function (table) {
        return this.internalJoin('INNER JOIN', table);
    };
    UpdateQuery.prototype.leftJoin = function (table) {
        return this.internalJoin('LEFT JOIN', table);
    };
    UpdateQuery.prototype.rightJoin = function (table) {
        return this.internalJoin('RIGHT JOIN', table);
    };
    UpdateQuery.prototype.leftOuterJoin = function (table) {
        return this.internalJoin('LEFT OUTER JOIN', table);
    };
    UpdateQuery.prototype.rightOuterJoin = function (table) {
        return this.internalJoin('RIGHT OUTER JOIN', table);
    };
    UpdateQuery.prototype.fulllOuterJoin = function (table) {
        return this.internalJoin('FULL OUTER JOIN', table);
    };
    UpdateQuery.prototype.fullJoin = function (table) {
        return this.internalJoin('FULL JOIN', table);
    };
    UpdateQuery.prototype.where = function (tokenable) {
        return this.internalWhere(tokenable);
    };
    UpdateQuery.prototype.returning = function () {
        var _this = this;
        var columns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columns[_i] = arguments[_i];
        }
        return this.internalReturning.apply(this, columns.map(function (columnOrColumnName) {
            return typeof columnOrColumnName === "string"
                ? _this.getColumn(columnOrColumnName)
                : columnOrColumnName;
        }));
    };
    return UpdateQuery;
}(Query));
exports.UpdateQuery = UpdateQuery;
var DeleteQuery = /** @class */ (function (_super) {
    __extends(DeleteQuery, _super);
    function DeleteQuery(db, table) {
        var tokens = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            tokens[_i - 2] = arguments[_i];
        }
        var _this = _super.apply(this, [db, {}].concat(tokens)) || this;
        _this.table = table;
        return _this;
    }
    DeleteQuery.prototype.getColumn = function (key) {
        return this.table[key];
    };
    DeleteQuery.prototype.where = function (tokenable) {
        return this.internalWhere(tokenable);
    };
    DeleteQuery.prototype.returning = function () {
        var _this = this;
        var columns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            columns[_i] = arguments[_i];
        }
        return this.internalReturning.apply(this, columns.map(function (columnOrColumnName) {
            return typeof columnOrColumnName === "string"
                ? _this.getColumn(columnOrColumnName)
                : columnOrColumnName;
        }));
    };
    return DeleteQuery;
}(Query));
exports.DeleteQuery = DeleteQuery;
var templateObject_1, templateObject_2;
//# sourceMappingURL=query.js.map