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
var columns_1 = require("./../../columns");
var __1 = require("../..");
var columns_2 = require("../../columns");
var pool_1 = require("../../database/pool");
var table_1 = require("../../table");
var table_2 = require("../table");
var test = function (clazz) {
    var db = pool_1.createDatabase(process.env.DATABASE_URL, {
        test: clazz,
    });
    return table_2.generateSql(db.test);
};
describe('generate sql', function () {
    it('should generate a simple table', function () {
        var Organization = /** @class */ (function (_super) {
            __extends(Organization, _super);
            function Organization() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.id = new columns_2.UuidColumn()
                    .primary()
                    .notNull()
                    .default(new __1.Unsafe("uuid_generate_v4()"));
                _this.apiKey = new columns_2.TextColumn().notNull().unique();
                return _this;
            }
            return Organization;
        }(table_1.Table));
        var sql = test(new Organization());
        expect(sql).toMatchInlineSnapshot("\n                                    Array [\n                                      \"CREATE TABLE test (\n                                      id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),\n                                      api_key TEXT NOT NULL UNIQUE\n                                    )\",\n                                    ]\n                        ");
    });
    it('should generate a table with enum without name', function () {
        var EnumTest = /** @class */ (function () {
            function EnumTest() {
                this.id = new columns_2.UuidColumn()
                    .primaryKey()
                    .notNull()
                    .default(new __1.UuidGenerateV4());
                this.value = new columns_2.EnumColumn(["A", "B"]).notNull();
            }
            return EnumTest;
        }());
        var sql = test(new EnumTest());
        expect(sql).toMatchInlineSnapshot("\n                                    Array [\n                                      \"CREATE TYPE TEST_VALUE_ENUM AS ENUM ('A', 'B')\",\n                                      \"CREATE TABLE test (\n                                      id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),\n                                      value TEST_VALUE_ENUM NOT NULL\n                                    )\",\n                                    ]\n                        ");
    });
    it('should generate a table with enum with name', function () {
        var EnumTest = /** @class */ (function () {
            function EnumTest() {
                this.id = new columns_2.UuidColumn()
                    .primaryKey()
                    .notNull()
                    .default(new __1.UuidGenerateV4());
                this.value = new columns_2.EnumColumn(["A", "B"], "MY_ENUM").notNull();
            }
            return EnumTest;
        }());
        var sql = test(new EnumTest());
        expect(sql).toMatchInlineSnapshot("\n                                    Array [\n                                      \"CREATE TYPE MY_ENUM AS ENUM ('A', 'B')\",\n                                      \"CREATE TABLE test (\n                                      id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v4(),\n                                      value MY_ENUM NOT NULL\n                                    )\",\n                                    ]\n                        ");
    });
    it("should create table with check", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.id = new columns_2.UuidColumn().primaryKey().notNull();
                this.bar = new columns_2.TextColumn().check("bar <> 'test'");
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n                              Array [\n                                \"CREATE TABLE test (\n                                id UUID PRIMARY KEY NOT NULL,\n                                bar TEXT CHECK (bar <> 'test')\n                              )\",\n                              ]\n                    ");
    });
    it("should create table with references", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.id = new columns_2.UuidColumn().primaryKey().notNull();
                this.bar = new columns_2.UuidColumn().references(function (db) { return db.bar.id; });
            }
            return Foo;
        }());
        var Bar = /** @class */ (function () {
            function Bar() {
                this.id = new columns_2.UuidColumn().primaryKey().notNull();
            }
            return Bar;
        }());
        var db = pool_1.createDatabase(process.env.DATABASE_URL, {
            foo: new Foo(),
            bar: new Bar(),
        });
        var sql = table_2.generateSql(db.foo);
        expect(sql).toMatchInlineSnapshot("\n                              Array [\n                                \"CREATE TABLE foo (\n                                id UUID PRIMARY KEY NOT NULL,\n                                bar UUID REFERENCES bar (id)\n                              )\",\n                              ]\n                    ");
    });
    it("should create table with references on update cascade", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.id = new columns_2.UuidColumn().primaryKey().notNull();
                this.bar = new columns_2.UuidColumn()
                    .references(function (db) { return db.bar.id; })
                    .onUpdate()
                    .cascade();
            }
            return Foo;
        }());
        var Bar = /** @class */ (function () {
            function Bar() {
                this.id = new columns_2.UuidColumn().primaryKey().notNull();
            }
            return Bar;
        }());
        var db = pool_1.createDatabase(process.env.DATABASE_URL, {
            foo: new Foo(),
            bar: new Bar(),
        });
        var sql = table_2.generateSql(db.foo);
        expect(sql).toMatchInlineSnapshot("\n                        Array [\n                          \"CREATE TABLE foo (\n                          id UUID PRIMARY KEY NOT NULL,\n                          bar UUID REFERENCES bar (id) ON UPDATE CASCADE\n                        )\",\n                        ]\n                ");
    });
    it("should create table with references on update restrict", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.id = new columns_2.UuidColumn().primaryKey().notNull();
                this.bar = new columns_2.UuidColumn()
                    .references(function (db) { return db.bar.id; })
                    .onUpdate()
                    .restrict();
            }
            return Foo;
        }());
        var Bar = /** @class */ (function () {
            function Bar() {
                this.id = new columns_2.UuidColumn().primaryKey().notNull();
            }
            return Bar;
        }());
        var db = pool_1.createDatabase(process.env.DATABASE_URL, {
            foo: new Foo(),
            bar: new Bar(),
        });
        var sql = table_2.generateSql(db.foo);
        expect(sql).toMatchInlineSnapshot("\n                        Array [\n                          \"CREATE TABLE foo (\n                          id UUID PRIMARY KEY NOT NULL,\n                          bar UUID REFERENCES bar (id) ON UPDATE RESTRICT\n                        )\",\n                        ]\n                ");
    });
    it("should create table with references on delete cascade", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.id = new columns_2.UuidColumn().primaryKey().notNull();
                this.bar = new columns_2.UuidColumn()
                    .references(function (db) { return db.bar.id; })
                    .onDelete()
                    .cascade();
            }
            return Foo;
        }());
        var Bar = /** @class */ (function () {
            function Bar() {
                this.id = new columns_2.UuidColumn().primaryKey().notNull();
            }
            return Bar;
        }());
        var db = pool_1.createDatabase(process.env.DATABASE_URL, {
            foo: new Foo(),
            bar: new Bar(),
        });
        var sql = table_2.generateSql(db.foo);
        expect(sql).toMatchInlineSnapshot("\n                        Array [\n                          \"CREATE TABLE foo (\n                          id UUID PRIMARY KEY NOT NULL,\n                          bar UUID REFERENCES bar (id) ON DELETE CASCADE\n                        )\",\n                        ]\n                ");
    });
    it("should create table with references on delete restrict", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.id = new columns_2.UuidColumn().primaryKey().notNull();
                this.bar = new columns_2.UuidColumn()
                    .references(function (db) { return db.bar.id; })
                    .onDelete()
                    .restrict();
            }
            return Foo;
        }());
        var Bar = /** @class */ (function () {
            function Bar() {
                this.id = new columns_2.UuidColumn().primaryKey().notNull();
            }
            return Bar;
        }());
        var db = pool_1.createDatabase(process.env.DATABASE_URL, {
            foo: new Foo(),
            bar: new Bar(),
        });
        var sql = table_2.generateSql(db.foo);
        expect(sql).toMatchInlineSnapshot("\n                        Array [\n                          \"CREATE TABLE foo (\n                          id UUID PRIMARY KEY NOT NULL,\n                          bar UUID REFERENCES bar (id) ON DELETE RESTRICT\n                        )\",\n                        ]\n                ");
    });
    it("should create table with citext", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.CitextColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n                  Array [\n                    \"CREATE TABLE test (\n                    val CITEXT\n                  )\",\n                  ]\n            ");
    });
    it("should create table with integer column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.IntegerColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val INTEGER\n            )\",\n            ]\n        ");
    });
    it("should create table with decimal column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.DecimalColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val DECIMAL\n            )\",\n            ]\n        ");
    });
    it("should create table with serial column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.SerialColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val SERIAL\n            )\",\n            ]\n        ");
    });
    it("should create table with JSON column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.JSONColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val JSON\n            )\",\n            ]\n        ");
    });
    it("should create table with JSONB column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.JSONBColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val JSONB\n            )\",\n            ]\n        ");
    });
    it("should create table with TimestampWithTimeZone column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.TimestampWithTimeZoneColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val TIMESTAMP WITH TIME ZONE\n            )\",\n            ]\n        ");
    });
    it("should create table with TimestampWithoutTimeZone column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.TimestampWithoutTimeZoneColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val TIMESTAMP WITHOUT TIME ZONE\n            )\",\n            ]\n        ");
    });
    it("should create table with timestamp column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.TimestampColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val TIMESTAMP\n            )\",\n            ]\n        ");
    });
    it("should create table with date column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.DateColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val DATE\n            )\",\n            ]\n        ");
    });
    it("should create table with time column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.TimeColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val TIME\n            )\",\n            ]\n        ");
    });
    it("should create table with time with time zone column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.TimeWithTimeZoneColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val TIME WITH TIME ZONE\n            )\",\n            ]\n        ");
    });
    it("should create table with time without time zone column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.TimeWithoutTimeZoneColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val TIME WITHOUT TIME ZONE\n            )\",\n            ]\n        ");
    });
    it("should create table with interval column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.IntervalColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val INTERVAL\n            )\",\n            ]\n        ");
    });
    it("should create table with money column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.MoneyColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val MONEY\n            )\",\n            ]\n        ");
    });
    it("should create table with boolean column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.BooleanColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n            Array [\n              \"CREATE TABLE test (\n              val BOOLEAN\n            )\",\n            ]\n        ");
    });
    it("should create table with bytea column", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
                this.val = new columns_1.ByteaColumn();
            }
            return Foo;
        }());
        var sql = test(new Foo());
        expect(sql).toMatchInlineSnapshot("\n      Array [\n        \"CREATE TABLE test (\n        val BYTEA\n      )\",\n      ]\n    ");
    });
});
//# sourceMappingURL=table.test.js.map