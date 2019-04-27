"use strict";
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var uuid = require("uuid");
var __1 = require("..");
var columns_1 = require("../columns");
var pool_1 = require("../database/pool");
var keywords_1 = require("../keywords");
var Account = /** @class */ (function () {
    function Account() {
        this.id = new columns_1.UuidColumn()
            .primary()
            .notNull()
            .default(new keywords_1.UuidGenerateV4());
        this.createdAt = new columns_1.TimestampWithTimeZoneColumn().notNull().default(new keywords_1.Now());
        this.updatedAt = new columns_1.TimestampWithTimeZoneColumn();
        this.value = new columns_1.IntegerColumn().notNull();
    }
    return Account;
}());
var Test = /** @class */ (function () {
    function Test() {
        this.id = new columns_1.UuidColumn();
        this.accountId = new columns_1.UuidColumn().notNull().references(function (db) { return db.account.id; });
    }
    return Test;
}());
var Foo = /** @class */ (function () {
    function Foo() {
        this.id = new columns_1.UuidColumn().primary().default(new keywords_1.UuidGenerateV4());
        this.value = new columns_1.IntegerColumn();
    }
    return Foo;
}());
var BinaryTest = /** @class */ (function () {
    function BinaryTest() {
        this.id = new columns_1.UuidColumn().primary().default(new keywords_1.UuidGenerateV4());
        this.value = new columns_1.ByteaColumn().notNull();
    }
    return BinaryTest;
}());
var EnumTest = /** @class */ (function () {
    function EnumTest() {
        this.id = new columns_1.UuidColumn().primaryKey().default(new keywords_1.UuidGenerateV4());
        this.letter = new __1.EnumColumn(['a', 'b']).notNull();
    }
    return EnumTest;
}());
var Bar = /** @class */ (function () {
    function Bar() {
        this.id = new columns_1.UuidColumn().primaryKey().default(new keywords_1.UuidGenerateV4());
        this.val = new columns_1.TextColumn().notNull();
    }
    return Bar;
}());
var db = pool_1.createDatabase(process.env.DATABASE_URL, {
    account: new Account(),
    test: new Test(),
    foo: new Foo(),
    binaryTest: new BinaryTest(),
    enumTest: new EnumTest(),
    bar: new Bar(),
});
describe('Query', function () {
    afterAll(function () { return db.destroy(); });
    beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.exec("CREATE TABLE IF NOT EXISTS account (\n      id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),\n      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),\n      updated_at TIMESTAMP WITH TIME ZONE,\n      value INTEGER NOT NULL\n    )")];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, db.exec("CREATE TABLE IF NOT EXISTS bar (\n      id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),\n      val TEXT NOT NULL\n    )")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.exec("CREATE TABLE IF NOT EXISTS foo (\n      id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),\n      value INTEGER\n    )")];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.exec("DROP TABLE IF EXISTS account, foo")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('Array', function () {
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insertInto(db.foo).values([
                            {
                                value: 1,
                            },
                            {
                                value: 2,
                            },
                            {
                                value: 3,
                            },
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return db.deleteFrom(db.foo); });
        it('should map all rows', function () { return __awaiter(_this, void 0, void 0, function () {
            var values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select(db.foo.value)
                            .from(db.foo)
                            .orderBy(db.foo.value)
                            .map(function (row) { return row.value * 2; })];
                    case 1:
                        values = _a.sent();
                        expect(values).toEqual([2, 4, 6]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should filter all rows', function () { return __awaiter(_this, void 0, void 0, function () {
            var values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select(db.foo.value)
                            .from(db.foo)
                            .orderBy(db.foo.value)
                            .filter(function (row) { return row.value < 2; })];
                    case 1:
                        values = _a.sent();
                        expect(values).toEqual([{ value: 1 }]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('first', function () {
        it('should return undefined when calling first on countable', function () { return __awaiter(_this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .insertInto(db.foo)
                            .values({
                            value: 123,
                        })
                            .first()];
                    case 1:
                        result = _a.sent();
                        expect(result).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('error handling', function () {
        it('should throw error on invalid query', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, expect(db
                            .select(db.foo.value)
                            .from(db.account)
                            .limit(1)).rejects.toThrow()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('enum', function () {
        beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.exec("CREATE TYPE LETTER_ENUM AS ENUM ('a', 'b')")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db.exec("CREATE TABLE enum_test (\n        id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),\n        letter LETTER_ENUM NOT NULL\n      )")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.exec("DROP TABLE enum_test")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db.exec("DROP TYPE LETTER_ENUM")];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should create row', function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insertInto(db.enumTest).values({
                            id: null,
                            letter: 'a',
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('bytea', function () {
        beforeEach(function () {
            return db.exec("CREATE TABLE binary_test (\n      id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),\n      value BYTEA NOT NULL\n    )");
        });
        afterEach(function () { return db.exec("DROP TABLE binary_test"); });
        it("should create row", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insertInto(db.binaryTest).values({
                            id: null,
                            value: new Buffer("this is a test :)"),
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it("should read from row", function () { return __awaiter(_this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insertInto(db.binaryTest).values({ id: null, value: new Buffer("Hello, world!") })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, db.select(db.binaryTest.id, db.binaryTest.value).from(db.binaryTest)];
                    case 2:
                        rows = _a.sent();
                        expect(rows).toEqual([
                            {
                                id: rows[0].id,
                                value: new Buffer("Hello, world!"),
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('rows', function () {
        var ids = [uuid.v4(), uuid.v4(), uuid.v4()];
        beforeEach(function () {
            return db.exec("CREATE TABLE IF NOT EXISTS account (\n        id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),\n        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),\n        updated_at TIMESTAMP WITH TIME ZONE,\n        value INTEGER NOT NULL\n      )");
        });
        beforeEach(function () {
            return db.exec("CREATE TABLE IF NOT EXISTS account_item (\n        id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),\n        account_id UUID NOT NULL REFERENCES account (id)\n      )");
        });
        beforeEach(function () {
            return db.exec("INSERT INTO account (id, value) VALUES ($1, 123), ($2, 100), ($3, 42)", ids);
        });
        afterEach(function () { return db.exec("DROP TABLE account_item, account"); });
        it("transaction should rollback", function () { return __awaiter(_this, void 0, void 0, function () {
            var result, account;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = db.transaction(function (db) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, db
                                            .insertInto(db.account)
                                            .values({
                                            id: null,
                                            createdAt: null,
                                            updatedAt: null,
                                            value: 101,
                                        })
                                            .returning("id", "value")
                                            .first()];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, Promise.reject("Simulating a failure somewhere in the transaction.")];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        expect(result).rejects.toBe("Simulating a failure somewhere in the transaction.");
                        return [4 /*yield*/, db
                                .select(db.account.id)
                                .from(db.account)
                                .where(db.account.value.eq(101))
                                .limit(1)
                                .first()];
                    case 1:
                        account = _a.sent();
                        expect(account).toBeUndefined();
                        return [2 /*return*/];
                }
            });
        }); });
        it("transaction should commit", function () { return __awaiter(_this, void 0, void 0, function () {
            var account;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.transaction(function (db) { return __awaiter(_this, void 0, void 0, function () {
                            var account;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, db
                                            .insertInto(db.account)
                                            .values({
                                            id: null,
                                            createdAt: null,
                                            updatedAt: null,
                                            value: 654,
                                        })
                                            .returning("id")];
                                    case 1:
                                        account = _a.sent();
                                        return [2 /*return*/, account];
                                }
                            });
                        }); })];
                    case 1:
                        account = _a.sent();
                        expect(account).toBeDefined();
                        expect(account.id).toBeTruthy();
                        return [2 /*return*/];
                }
            });
        }); });
        it('select with alias', function () { return __awaiter(_this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.select(db.account.id.as('test')).from(db.account)];
                    case 1:
                        rows = _a.sent();
                        expect(rows).toEqual([
                            {
                                test: ids[0],
                            },
                            {
                                test: ids[1],
                            },
                            {
                                test: ids[2],
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('select with camelCase alias', function () { return __awaiter(_this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select(db.account.createdAt)
                            .from(db.account)
                            .limit(1)];
                    case 1:
                        rows = _a.sent();
                        expect(rows).toEqual([
                            {
                                createdAt: rows[0].createdAt,
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should select with max aggregate", function () { return __awaiter(_this, void 0, void 0, function () {
            var row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select(db.account.value.max().as("test"))
                            .from(db.account)
                            .limit(1)
                            .first()];
                    case 1:
                        row = _a.sent();
                        expect(row).toBeDefined();
                        expect(row.test).toEqual(123);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should select with count aggregate and alias", function () { return __awaiter(_this, void 0, void 0, function () {
            var row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select(db.account.id.count().as("test"))
                            .from(db.account)
                            .limit(1)
                            .first()];
                    case 1:
                        row = _a.sent();
                        expect(row).toBeDefined();
                        expect(row.test).toEqual('3');
                        return [2 /*return*/];
                }
            });
        }); });
        it("should select with count aggregate without alias", function () { return __awaiter(_this, void 0, void 0, function () {
            var row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select(db.account.id.count())
                            .from(db.account)
                            .limit(1)
                            .first()];
                    case 1:
                        row = _a.sent();
                        expect(row).toEqual({
                            id: '3',
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it("should select first row", function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .select(db.account.id)
                            .from(db.account)
                            .first()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should insert row with returning', function () { return __awaiter(_this, void 0, void 0, function () {
            var account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .insertInto(db.account)
                            .values({
                            id: null,
                            createdAt: null,
                            updatedAt: null,
                            value: 123,
                        })
                            .returning(db.account.id)];
                    case 1:
                        account = _a.sent();
                        expect(account).toEqual({
                            id: account.id,
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should insert without returning', function () { return __awaiter(_this, void 0, void 0, function () {
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db.insertInto(db.account).values({
                            id: null,
                            createdAt: null,
                            updatedAt: null,
                            value: 101,
                        })];
                    case 1:
                        count = _a.sent();
                        expect(count).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update', function () { return __awaiter(_this, void 0, void 0, function () {
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .update(db.account)
                            .set({
                            value: 654,
                        })
                            .where(db.account.value.gt(100))];
                    case 1:
                        count = _a.sent();
                        expect(count).toEqual(1);
                        return [2 /*return*/];
                }
            });
        }); });
        it("should update with returning", function () { return __awaiter(_this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db
                            .update(db.account)
                            .set({
                            value: 654,
                        })
                            .where(db.account.value.gt(100))
                            .returning(db.account.id)];
                    case 1:
                        rows = _a.sent();
                        expect(rows).toEqual([
                            {
                                id: ids[0],
                            },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    var account = {
        id: null,
        createdAt: new Date(),
        value: 123,
        updatedAt: null,
    };
    var queries = [
        {
            text: "SELECT account.created_at FROM account",
            query: db.select(db.account.createdAt).from(db.account),
        },
        {
            text: "SELECT account.id AS \"id\" FROM account",
            query: db.select(db.account.id.as("id")).from(db.account),
        },
        {
            text: "SELECT account.id AS \"id\", test.id AS \"testId\" FROM account INNER JOIN test ON test.account_id = account.id",
            query: db
                .select(db.account.id, db.test.id.as("testId"))
                .from(db.account)
                .innerJoin(db.test)
                .on(db.test.accountId.eq(db.account.id)),
        },
        {
            text: "SELECT account.id FROM account WHERE account.id = $1",
            parameters: ["test"],
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(db.account.id.eq("test")),
        },
        {
            text: "SELECT account.id FROM account WHERE account.id = $1 AND account.id = $2",
            parameters: ["test", "test2"],
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(db.account.id.eq("test").and(db.account.id.eq("test2"))),
        },
        {
            text: "SELECT account.id, account.created_at FROM account WHERE account.created_at > NOW() - $1 LIMIT 10",
            parameters: ["2 days"],
            query: db
                .select(db.account.id, db.account.createdAt)
                .from(db.account)
                .where(db.account.createdAt.gt(__1.now().minus("2 days")))
                .limit(10),
        },
        {
            text: "SELECT account.id FROM account WHERE account.value = $1 LIMIT 1",
            parameters: [123],
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(db.account.value.eq(123))
                .limit(1),
        },
        {
            text: "SELECT account.id FROM account",
            query: db.select(db.account.id).from(db.account),
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(db.account.updatedAt.isNull()),
            text: "SELECT account.id FROM account WHERE account.updated_at IS NULL",
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(db.account.updatedAt.isNotNull()),
            text: "SELECT account.id FROM account WHERE account.updated_at IS NOT NULL",
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .orderBy(db.account.createdAt.desc().nullsFirst()),
            text: "SELECT account.id FROM account ORDER BY account.created_at DESC NULLS FIRST",
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .orderBy(db.account.createdAt.asc().nullsLast()),
            text: "SELECT account.id FROM account ORDER BY account.created_at ASC NULLS LAST",
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .orderBy(db.account.createdAt.desc(), db.account.updatedAt.asc()),
            text: "SELECT account.id FROM account ORDER BY account.created_at DESC, account.updated_at ASC",
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .having(db.account.value.gt(100)),
            text: "SELECT account.id FROM account HAVING account.value > $1",
            parameters: [100],
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .having(db.account.value.in([1, 2, 3])),
            text: "SELECT account.id FROM account HAVING account.value IN ($1)",
            parameters: [[1, 2, 3]],
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(__1.not(db.account.value.eq(123))),
            text: "SELECT account.id FROM account WHERE NOT (account.value = $1)",
            parameters: [123],
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .groupBy(db.account.value),
            text: "SELECT account.id FROM account GROUP BY account.value",
        },
        {
            query: db
                .select(db.account.id.count().as("count"))
                .from(db.account)
                .groupBy(db.account.value),
            text: "SELECT COUNT(account.id) AS \"count\" FROM account GROUP BY account.value",
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(db.account.value.between(0).and(100)),
            text: "SELECT account.id FROM account WHERE account.value BETWEEN $1 AND $2",
            parameters: [0, 100],
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(db.account.value.betweenSymmetric(0).and(100)),
            text: "SELECT account.id FROM account WHERE account.value BETWEEN SYMMETRIC $1 AND $2",
            parameters: [0, 100],
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .limit(5)
                .offset(10),
            text: "SELECT account.id FROM account LIMIT 5 OFFSET 10",
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(db.account.id.in(db
                .select(db.test.accountId)
                .from(db.test)
                .where(db.test.id.eq('1')))),
            text: "SELECT account.id FROM account WHERE account.id IN (SELECT test.account_id FROM test WHERE test.id = $1)",
            parameters: ['1'],
        },
        {
            query: db.select(db.account.id.as("test")).from(db.account),
            text: "SELECT account.id AS \"test\" FROM account",
        },
        {
            query: db.select(db.account.value.sum()).from(db.account),
            text: "SELECT SUM(account.value) FROM account",
        },
        {
            query: db.select(db.account.value.min()).from(db.account),
            text: "SELECT MIN(account.value) FROM account",
        },
        {
            query: db.select(db.account.value.avg()).from(db.account),
            text: "SELECT AVG(account.value) FROM account",
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(db.account.value.notIn([1, 2, 3])),
            text: "SELECT account.id FROM account WHERE account.value NOT IN ([$1, $2, $3])",
            parameters: [1, 2, 3],
        },
        {
            query: db
                .select(db.bar.id)
                .from(db.bar)
                .where(db.bar.val.like('%test%')),
            text: "SELECT bar.id FROM bar WHERE bar.val LIKE $1",
            parameters: ["%test%"],
        },
        {
            query: db
                .select(db.bar.id)
                .from(db.bar)
                .where(db.bar.val.ilike('%test%')),
            text: "SELECT bar.id FROM bar WHERE bar.val ILIKE $1",
            parameters: ["%test%"],
        },
        {
            query: db
                .select(db.bar.id)
                .from(db.bar)
                .where(db.bar.val.ne('test')),
            text: "SELECT bar.id FROM bar WHERE bar.val != $1",
            parameters: ["test"],
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(db.account.value.gte(1)),
            text: "SELECT account.id FROM account WHERE account.value >= $1",
            parameters: [1],
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(db.account.value.lt(1)),
            text: "SELECT account.id FROM account WHERE account.value < $1",
            parameters: [1],
        },
        {
            query: db
                .select(db.account.id)
                .from(db.account)
                .where(db.account.value.lte(1)),
            text: "SELECT account.id FROM account WHERE account.value <= $1",
            parameters: [1],
        },
        // TODO: minus, multiply, divide, modulo, concat
        // Insert
        {
            text: "INSERT INTO account (created_at, value) VALUES ($1, $2)",
            query: db.insertInto(db.account).values(account),
            parameters: [account.createdAt, account.value],
        },
        {
            text: "INSERT INTO account (created_at, value) VALUES ($1, $2) RETURNING account.id AS \"id\"",
            query: db
                .insertInto(db.account)
                .values(account)
                .returning(db.account.id),
            parameters: [account.createdAt, account.value],
        },
        {
            text: "INSERT INTO foo DEFAULT VALUES",
            query: db.insertInto(db.foo).values({
                id: null,
                value: null,
            }),
            parameters: [],
        },
        {
            text: "INSERT INTO foo (value) VALUES ($1) ON CONFLICT (value) DO NOTHING",
            query: db
                .insertInto(db.foo)
                .values({
                id: null,
                value: 123,
            })
                .onConflict("value")
                .doNothing(),
            parameters: [123],
        },
        {
            text: "INSERT INTO foo (value) VALUES ($1) ON CONFLICT (value) DO UPDATE SET value = $2",
            query: db
                .insertInto(db.foo)
                .values({ id: null, value: 123 })
                .onConflict('value')
                .doUpdateSet({
                value: 124,
            }),
            parameters: [123, 124],
        },
        // Update
        {
            query: db
                .update(db.account)
                .set({
                value: 1,
            })
                .where(db.account.id.eq("123")),
            text: "UPDATE account SET value = $1 WHERE account.id = $2",
            parameters: [1, "123"],
        },
        {
            query: db.update(db.account).set({ createdAt: new keywords_1.Default() }),
            parameters: [],
            text: "UPDATE account SET created_at = DEFAULT",
        },
        {
            query: db.update(db.account).set({ value: db.account.value.plus(1) }),
            text: "UPDATE account SET value = account.value + $1",
            parameters: [1],
        },
    ];
    describe('query tests', function () {
        (queries.filter(function (queryTest) { return queryTest.only; }) || queries).forEach(function (queryTest) {
            it(queryTest.text, function () {
                var query = queryTest.query.toQuery();
                expect(query).toEqual({
                    text: queryTest.text,
                    parameters: queryTest.parameters || [],
                });
            });
        });
    });
});
//# sourceMappingURL=query.test.js.map