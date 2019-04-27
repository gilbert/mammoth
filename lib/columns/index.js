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
var keywords_1 = require("../keywords");
var query_1 = require("../query");
var tokens_1 = require("../tokens");
var unsafe_1 = require("../unsafe");
var ColumnWrapper = /** @class */ (function () {
    function ColumnWrapper(table, column, camelCaseName, snakeCaseName) {
        this.table = table;
        this.column = column;
        this.camelCaseName = camelCaseName;
        this.snakeCaseName = snakeCaseName;
        this.name = undefined;
        this.baseType = undefined;
        this.selectType = undefined;
        this.insertType = undefined;
        this.updateType = undefined;
    }
    ColumnWrapper.prototype.getNameInResultSet = function () {
        return this.snakeCaseName;
    };
    ColumnWrapper.prototype.getSnakeCaseName = function () {
        return this.snakeCaseName;
    };
    ColumnWrapper.prototype.getCamelCaseName = function () {
        return this.camelCaseName;
    };
    ColumnWrapper.prototype.getConfig = function () {
        return this.column.config;
    };
    ColumnWrapper.prototype.as = function (aliasName) {
        return new AliasedColumnWrapper(aliasName, this.toTokens(), this.table, this.column, this.camelCaseName, this.snakeCaseName);
    };
    ColumnWrapper.prototype.isNull = function () {
        var query = new query_1.PartialQuery();
        query.tokens.push(new tokens_1.StringToken(this.toSql()), new tokens_1.StringToken("IS NULL"));
        return query;
    };
    ColumnWrapper.prototype.isNotNull = function () {
        var query = new query_1.PartialQuery();
        query.tokens.push(new tokens_1.StringToken(this.toSql()), new tokens_1.StringToken("IS NOT NULL"));
        return query;
    };
    ColumnWrapper.prototype.asc = function () {
        return new query_1.PartialQuery(new tokens_1.StringToken(this.toSql()), new tokens_1.StringToken("ASC"));
    };
    ColumnWrapper.prototype.desc = function () {
        return new query_1.PartialQuery(new tokens_1.StringToken(this.toSql()), new tokens_1.StringToken("DESC"));
    };
    // TODO: we should make the return value of the SelectQuery type safe here.
    ColumnWrapper.prototype.in = function (array) {
        if (array instanceof query_1.SelectQuery) {
            return new (query_1.PartialQuery.bind.apply(query_1.PartialQuery, [void 0].concat(this.toTokens(), [new tokens_1.StringToken("IN"),
                new tokens_1.GroupToken(array.toTokens())])))();
        }
        return new (query_1.PartialQuery.bind.apply(query_1.PartialQuery, [void 0].concat(this.toTokens(), [new tokens_1.StringToken("IN"),
            // FIXME: it should be possible to just pass a single parameter token into the group with an
            // array as parameter. Unfortunately this fails in practice.
            new tokens_1.GroupToken([new tokens_1.SeparatorToken(',', array.map(function (param) { return new tokens_1.ParameterToken(param); }))])])))();
    };
    ColumnWrapper.prototype.aggregate = function (aggregateType) {
        return new AggregateColumnWrapper(aggregateType, this.table, this.column, this.camelCaseName, this.snakeCaseName);
    };
    ColumnWrapper.prototype.toSql = function () {
        return this.table.getName() + "." + this.snakeCaseName;
    };
    ColumnWrapper.prototype.toTokens = function () {
        return [new tokens_1.StringToken(this.toSql())];
    };
    ColumnWrapper.prototype.toReferenceExpressionTokens = function () {
        return this.toTokens();
    };
    ColumnWrapper.prototype.count = function () {
        return this.aggregate("COUNT");
    };
    ColumnWrapper.prototype.sum = function () {
        return this.aggregate("SUM");
    };
    ColumnWrapper.prototype.min = function () {
        return this.aggregate("MIN");
    };
    ColumnWrapper.prototype.max = function () {
        return this.aggregate("MAX");
    };
    ColumnWrapper.prototype.avg = function () {
        return this.aggregate("AVG");
    };
    ColumnWrapper.prototype.operate = function (operator, value) {
        return new query_1.PartialQuery(new tokens_1.StringToken(this.toSql()), new tokens_1.StringToken(operator), new tokens_1.ParameterToken(value));
    };
    // TODO: should we add these on specific column types only? E.g. NumberColumn.
    ColumnWrapper.prototype.plus = function (value) {
        return this.operate("+", value);
    };
    ColumnWrapper.prototype.minus = function (value) {
        return this.operate("-", value);
    };
    ColumnWrapper.prototype.multiply = function (value) {
        return this.operate("+", value);
    };
    ColumnWrapper.prototype.divide = function (value) {
        return this.operate("/", value);
    };
    ColumnWrapper.prototype.modulo = function (value) {
        return this.operate("%", value);
    };
    // TODO: should this only be on TextColumn exclusively?
    ColumnWrapper.prototype.concat = function (value) {
        return new query_1.PartialQuery(new tokens_1.StringToken(this.toSql()), new tokens_1.StringToken("||"), value instanceof ColumnWrapper
            ? new tokens_1.CollectionToken(value.toTokens())
            : new tokens_1.ParameterToken(value));
    };
    ColumnWrapper.prototype.between = function (a) {
        var _this = this;
        return {
            and: function (b) {
                return new query_1.PartialQuery(new tokens_1.StringToken(_this.toSql()), new tokens_1.StringToken("BETWEEN"), new tokens_1.ParameterToken(a), new tokens_1.StringToken("AND"), new tokens_1.ParameterToken(b));
            },
        };
    };
    ColumnWrapper.prototype.betweenSymmetric = function (a) {
        var _this = this;
        return {
            and: function (b) {
                return new query_1.PartialQuery(new tokens_1.StringToken(_this.toSql()), new tokens_1.StringToken("BETWEEN SYMMETRIC"), new tokens_1.ParameterToken(a), new tokens_1.StringToken("AND"), new tokens_1.ParameterToken(b));
            },
        };
    };
    ColumnWrapper.prototype.isDistinctFrom = function (a) {
        return new query_1.PartialQuery(new tokens_1.StringToken(this.toSql()), new tokens_1.StringToken("IS DISTINCT FROM"), new tokens_1.ParameterToken(a));
    };
    ColumnWrapper.prototype.isNotDistinctFrom = function (a) {
        return new query_1.PartialQuery(new tokens_1.StringToken(this.toSql()), new tokens_1.StringToken("IS NOT DISTINCT FROM"), new tokens_1.ParameterToken(a));
    };
    ColumnWrapper.prototype.notIn = function (value) {
        return new query_1.PartialQuery(new tokens_1.StringToken(this.toSql()), new tokens_1.StringToken("NOT IN"), new tokens_1.GroupToken([new tokens_1.SeparatorToken(',', value.map(function (val) { return new tokens_1.ParameterToken(val); }))]));
    };
    ColumnWrapper.prototype.compare = function (value, comparator) {
        var _a, _b, _c;
        var query = new query_1.PartialQuery();
        query.tokens.push(new tokens_1.StringToken(this.toSql()), new tokens_1.StringToken(comparator));
        if (value instanceof ColumnWrapper) {
            (_a = query.tokens).push.apply(_a, value.toReferenceExpressionTokens());
        }
        else if (value instanceof query_1.PartialQuery) {
            (_b = query.tokens).push.apply(_b, value.tokens);
        }
        else if (value instanceof query_1.Query) {
            (_c = query.tokens).push.apply(_c, value.toTokens());
        }
        else {
            query.tokens.push(new tokens_1.ParameterToken(value));
        }
        return query;
    };
    ColumnWrapper.prototype.like = function (value) {
        return this.compare(value, "LIKE");
    };
    ColumnWrapper.prototype.ilike = function (value) {
        return this.compare(value, "ILIKE");
    };
    ColumnWrapper.prototype.eq = function (value) {
        return this.compare(value, "=");
    };
    ColumnWrapper.prototype.ne = function (value) {
        return this.compare(value, "!=");
    };
    ColumnWrapper.prototype.gt = function (value) {
        return this.compare(value, ">");
    };
    ColumnWrapper.prototype.gte = function (value) {
        return this.compare(value, ">=");
    };
    ColumnWrapper.prototype.lt = function (value) {
        return this.compare(value, ">=");
    };
    ColumnWrapper.prototype.lte = function (value) {
        return this.compare(value, "<=");
    };
    return ColumnWrapper;
}());
exports.ColumnWrapper = ColumnWrapper;
var AliasedColumnWrapper = /** @class */ (function (_super) {
    __extends(AliasedColumnWrapper, _super);
    function AliasedColumnWrapper(name, tokens, table, column, camelCaseName, snakeCaseName) {
        var _this = _super.call(this, table, column, camelCaseName, snakeCaseName) || this;
        _this.tokens = tokens;
        _this.name = name;
        return _this;
    }
    AliasedColumnWrapper.prototype.getNameInResultSet = function () {
        return this.name;
    };
    AliasedColumnWrapper.prototype.getSnakeCaseName = function () {
        return this.name;
    };
    AliasedColumnWrapper.prototype.getCamelCaseName = function () {
        return this.name;
    };
    AliasedColumnWrapper.prototype.toTokens = function () {
        return this.tokens.concat([new tokens_1.StringToken("AS \"" + this.name + "\"")]);
    };
    AliasedColumnWrapper.prototype.toReferenceExpressionTokens = function () {
        return this.tokens;
    };
    return AliasedColumnWrapper;
}(ColumnWrapper));
exports.AliasedColumnWrapper = AliasedColumnWrapper;
var AggregateColumnWrapper = /** @class */ (function (_super) {
    __extends(AggregateColumnWrapper, _super);
    function AggregateColumnWrapper(aggregateType, table, column, camelCaseName, snakeCaseName) {
        var _this = _super.call(this, table, column, camelCaseName, snakeCaseName) || this;
        _this.aggregateType = aggregateType;
        return _this;
    }
    AggregateColumnWrapper.prototype.toSql = function () {
        return this.aggregateType + "(" + _super.prototype.toSql.call(this) + ")";
    };
    AggregateColumnWrapper.prototype.getNameInResultSet = function () {
        return this.aggregateType.toLowerCase();
    };
    return AggregateColumnWrapper;
}(ColumnWrapper));
exports.AggregateColumnWrapper = AggregateColumnWrapper;
exports.toSnakeCase = function (string) {
    return string.replace(/([^A-Z]|[A-Z]{1,})([A-Z])/g, '$1_$2').toLowerCase();
};
var Column = /** @class */ (function () {
    function Column(name, config) {
        if (config === void 0) { config = {}; }
        this.name = name;
        this.dataType = undefined;
        this.type = undefined;
        this.insertType = undefined;
        this.selectType = undefined;
        this.updateType = undefined;
        this.config = config;
    }
    /** @internal */
    Column.prototype.getSnakeCaseName = function (camelCaseName) {
        // TODO: this should be a string, not string | undefined.
        return this.name || exports.toSnakeCase(camelCaseName);
    };
    /** @internal */
    Column.prototype.setSnakeCaseName = function (name) {
        // TODO: is this even used?
        this.name = name;
    };
    /** @internal */
    Column.prototype.setKey = function (key) {
        // TODO: should this be camelCaseName instead?
        this.key = key;
    };
    /** @internal */
    Column.prototype.setTable = function (table) {
        // TODO: why do we need the complete table here? If it's just for the table's name, can we just set the name instead?
        this.table = table;
    };
    Column.prototype.primary = function () {
        this.config.primary = true;
        return this;
    };
    Column.prototype.primaryKey = function () {
        return this.primary();
    };
    Column.prototype.unique = function () {
        this.config.unique = true;
        return this;
    };
    Column.prototype.notNull = function () {
        this.config.notNull = true;
        return this;
    };
    Column.prototype.check = function (sql) {
        this.config.check = sql;
        return this;
    };
    Column.prototype.default = function (sql) {
        var escape = function (val) {
            if (typeof val === 'number' || typeof val === 'boolean') {
                return val;
            }
            // FIXME: this escaping is too simple.
            return "'" + val + "'";
        };
        this.config.default =
            sql && (sql instanceof unsafe_1.Unsafe || sql instanceof keywords_1.Keyword) ? sql.toSql() : escape(sql);
        return this;
    };
    /** @internal */
    Column.prototype.createReference = function (db) {
        if (this.config.columnFunction) {
            var column = this.config.columnFunction(db);
            this.config.references = {
                tableName: column.table.getName(),
                columnName: column.snakeCaseName,
            };
            this.config.columnFunction = undefined;
        }
    };
    Column.prototype.references = function (columnFunction) {
        this.config.columnFunction = columnFunction;
        return this;
    };
    Column.prototype.onDelete = function () {
        var _this = this;
        return {
            cascade: function () {
                _this.config.onDelete = 'cascade';
                return _this;
            },
            restrict: function () {
                _this.config.onDelete = 'restrict';
                return _this;
            },
            noAction: function () {
                _this.config.onDelete = 'no action';
                return _this;
            },
        };
    };
    Column.prototype.onUpdate = function () {
        // TODO: add SET NULL, SET DEFAULT as well.
        var _this = this;
        return {
            cascade: function () {
                _this.config.onUpdate = 'cascade';
                return _this;
            },
            restrict: function () {
                _this.config.onUpdate = 'restrict';
                return _this;
            },
            noAction: function () {
                _this.config.onUpdate = 'no action';
                return _this;
            },
        };
    };
    return Column;
}());
exports.Column = Column;
var TextColumn = /** @class */ (function (_super) {
    __extends(TextColumn, _super);
    function TextColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'TEXT';
        return _this;
    }
    return TextColumn;
}(Column));
exports.TextColumn = TextColumn;
var CitextColumn = /** @class */ (function (_super) {
    __extends(CitextColumn, _super);
    function CitextColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'CITEXT';
        return _this;
    }
    return CitextColumn;
}(Column));
exports.CitextColumn = CitextColumn;
var CaseInsensitiveTextColumn = /** @class */ (function (_super) {
    __extends(CaseInsensitiveTextColumn, _super);
    function CaseInsensitiveTextColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CaseInsensitiveTextColumn;
}(CitextColumn));
exports.CaseInsensitiveTextColumn = CaseInsensitiveTextColumn;
var IntegerColumn = /** @class */ (function (_super) {
    __extends(IntegerColumn, _super);
    function IntegerColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'INTEGER';
        return _this;
    }
    return IntegerColumn;
}(Column));
exports.IntegerColumn = IntegerColumn;
var DecimalColumn = /** @class */ (function (_super) {
    __extends(DecimalColumn, _super);
    function DecimalColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'DECIMAL';
        return _this;
    }
    return DecimalColumn;
}(Column));
exports.DecimalColumn = DecimalColumn;
var SerialColumn = /** @class */ (function (_super) {
    __extends(SerialColumn, _super);
    function SerialColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'SERIAL';
        return _this;
    }
    return SerialColumn;
}(Column));
exports.SerialColumn = SerialColumn;
var JSONColumn = /** @class */ (function (_super) {
    __extends(JSONColumn, _super);
    function JSONColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'JSON';
        return _this;
    }
    return JSONColumn;
}(Column));
exports.JSONColumn = JSONColumn;
var JSONBColumn = /** @class */ (function (_super) {
    __extends(JSONBColumn, _super);
    function JSONBColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'JSONB';
        return _this;
    }
    return JSONBColumn;
}(Column));
exports.JSONBColumn = JSONBColumn;
var TimestampWithTimeZoneColumn = /** @class */ (function (_super) {
    __extends(TimestampWithTimeZoneColumn, _super);
    function TimestampWithTimeZoneColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'TIMESTAMP WITH TIME ZONE';
        return _this;
    }
    return TimestampWithTimeZoneColumn;
}(Column));
exports.TimestampWithTimeZoneColumn = TimestampWithTimeZoneColumn;
var TimestampWithoutTimeZoneColumn = /** @class */ (function (_super) {
    __extends(TimestampWithoutTimeZoneColumn, _super);
    function TimestampWithoutTimeZoneColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'TIMESTAMP WITHOUT TIME ZONE';
        return _this;
    }
    return TimestampWithoutTimeZoneColumn;
}(Column));
exports.TimestampWithoutTimeZoneColumn = TimestampWithoutTimeZoneColumn;
var TimestampColumn = /** @class */ (function (_super) {
    __extends(TimestampColumn, _super);
    function TimestampColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'TIMESTAMP';
        return _this;
    }
    return TimestampColumn;
}(Column));
exports.TimestampColumn = TimestampColumn;
var DateColumn = /** @class */ (function (_super) {
    __extends(DateColumn, _super);
    function DateColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'DATE';
        return _this;
    }
    return DateColumn;
}(Column));
exports.DateColumn = DateColumn;
var TimeColumn = /** @class */ (function (_super) {
    __extends(TimeColumn, _super);
    function TimeColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'TIME';
        return _this;
    }
    return TimeColumn;
}(Column));
exports.TimeColumn = TimeColumn;
var TimeWithoutTimeZoneColumn = /** @class */ (function (_super) {
    __extends(TimeWithoutTimeZoneColumn, _super);
    function TimeWithoutTimeZoneColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'TIME WITHOUT TIME ZONE';
        return _this;
    }
    return TimeWithoutTimeZoneColumn;
}(Column));
exports.TimeWithoutTimeZoneColumn = TimeWithoutTimeZoneColumn;
var TimeWithTimeZoneColumn = /** @class */ (function (_super) {
    __extends(TimeWithTimeZoneColumn, _super);
    function TimeWithTimeZoneColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'TIME WITH TIME ZONE';
        return _this;
    }
    return TimeWithTimeZoneColumn;
}(Column));
exports.TimeWithTimeZoneColumn = TimeWithTimeZoneColumn;
var IntervalColumn = /** @class */ (function (_super) {
    __extends(IntervalColumn, _super);
    function IntervalColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'INTERVAL';
        return _this;
    }
    return IntervalColumn;
}(Column));
exports.IntervalColumn = IntervalColumn;
var MoneyColumn = /** @class */ (function (_super) {
    __extends(MoneyColumn, _super);
    function MoneyColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'MONEY';
        return _this;
    }
    return MoneyColumn;
}(Column));
exports.MoneyColumn = MoneyColumn;
var BooleanColumn = /** @class */ (function (_super) {
    __extends(BooleanColumn, _super);
    function BooleanColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'BOOLEAN';
        return _this;
    }
    return BooleanColumn;
}(Column));
exports.BooleanColumn = BooleanColumn;
var UuidColumn = /** @class */ (function (_super) {
    __extends(UuidColumn, _super);
    function UuidColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'UUID';
        return _this;
    }
    return UuidColumn;
}(Column));
exports.UuidColumn = UuidColumn;
var StringColumn = /** @class */ (function (_super) {
    __extends(StringColumn, _super);
    function StringColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StringColumn;
}(TextColumn));
exports.StringColumn = StringColumn;
var NumberColumn = /** @class */ (function (_super) {
    __extends(NumberColumn, _super);
    function NumberColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NumberColumn;
}(IntegerColumn));
exports.NumberColumn = NumberColumn;
var ByteaColumn = /** @class */ (function (_super) {
    __extends(ByteaColumn, _super);
    function ByteaColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataType = 'BYTEA';
        return _this;
    }
    return ByteaColumn;
}(Column));
exports.ByteaColumn = ByteaColumn;
var BlobColumn = /** @class */ (function (_super) {
    __extends(BlobColumn, _super);
    function BlobColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BlobColumn;
}(ByteaColumn));
exports.BlobColumn = BlobColumn;
var BinaryColumn = /** @class */ (function (_super) {
    __extends(BinaryColumn, _super);
    function BinaryColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BinaryColumn;
}(ByteaColumn));
exports.BinaryColumn = BinaryColumn;
var EnumColumn = /** @class */ (function (_super) {
    __extends(EnumColumn, _super);
    function EnumColumn(values, name) {
        var _this = _super.call(this) || this;
        _this.dataType = name;
        _this.values = values;
        return _this;
    }
    return EnumColumn;
}(Column));
exports.EnumColumn = EnumColumn;
//# sourceMappingURL=index.js.map