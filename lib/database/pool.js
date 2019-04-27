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
var pg = require("pg");
var url = require("url");
var _1 = require(".");
var table_1 = require("../table");
var transaction_1 = require("../transaction");
var transaction_2 = require("./transaction");
var PoolDatabase = /** @class */ (function (_super) {
    __extends(PoolDatabase, _super);
    function PoolDatabase(databaseUrl, tables) {
        var _this = _super.call(this, tables) || this;
        _this.databaseUrl = databaseUrl;
        _this.pool = _this.createPool({
            min: process.env.DB_MIN_POOL_SIZE ? parseInt(process.env.DB_MIN_POOL_SIZE, 10) : undefined,
            max: process.env.DB_MAX_POOL_SIZE ? parseInt(process.env.DB_MAX_POOL_SIZE, 10) : undefined,
        });
        return _this;
    }
    PoolDatabase.prototype.createPool = function (options) {
        var _a = url.parse(this.databaseUrl), auth = _a.auth, hostname = _a.hostname, port = _a.port, pathname = _a.pathname;
        var _b = (auth || '').split(':'), user = _b[0], password = _b[1];
        var config = __assign({}, options, { user: user,
            password: password, host: hostname, port: parseInt(port || '5432', 10), database: options.databaseName || (pathname || '').slice(1), ssl: process.env.NODE_ENV !== "test" &&
                !process.env.MAMMOTH_DISABLE_SSL &&
                process.env.PGSSLROOTCERT
                ? {
                    sslmode: 'verify-full',
                    sslrootcert: process.env.PGSSLROOTCERT,
                }
                : false });
        return new pg.Pool(config);
    };
    PoolDatabase.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.pool) return [3 /*break*/, 2];
                        pool = this.pool;
                        this.pool = undefined;
                        return [4 /*yield*/, pool.end()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PoolDatabase.prototype.reconnect = function (databaseName) {
        return __awaiter(this, void 0, void 0, function () {
            var previousPool;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        previousPool = this.pool;
                        this.pool = this.createPool({
                            min: process.env.DB_MIN_POOL_SIZE ? parseInt(process.env.DB_MIN_POOL_SIZE, 10) : undefined,
                            max: process.env.DB_MAX_POOL_SIZE ? parseInt(process.env.DB_MAX_POOL_SIZE, 10) : undefined,
                            databaseName: databaseName,
                        });
                        if (!previousPool) return [3 /*break*/, 2];
                        return [4 /*yield*/, previousPool.end()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PoolDatabase.prototype.transaction = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var client, transaction, database, db, result, e_1, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.pool) {
                            throw new Error("The database is not connected. Did you call disconnect() but not reconnect()?");
                        }
                        return [4 /*yield*/, this.pool.connect()];
                    case 1:
                        client = _a.sent();
                        transaction = new transaction_1.Transaction(client);
                        database = new transaction_2.TransactionDatabase(this.tables, client);
                        db = exports.extendDatabase(this.tables, database);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 11]);
                        return [4 /*yield*/, transaction.begin()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, Promise.resolve(callback(db))];
                    case 4:
                        result = _a.sent();
                        return [4 /*yield*/, transaction.commit()];
                    case 5:
                        _a.sent();
                        client.release();
                        return [2 /*return*/, result];
                    case 6:
                        e_1 = _a.sent();
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        return [4 /*yield*/, transaction.rollback()];
                    case 8:
                        _a.sent();
                        client.release();
                        return [3 /*break*/, 10];
                    case 9:
                        e_2 = _a.sent();
                        // If rollback fails we assume this client is bugged and we don't want to give it back
                        // to the pool. By passing in the error we effectively tell the pool to disconnect and
                        // forget about the client.
                        client.release(e_2);
                        return [3 /*break*/, 10];
                    case 10: throw e_1;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    PoolDatabase.prototype.exec = function (text, parameters) {
        if (parameters === void 0) { parameters = []; }
        return __awaiter(this, void 0, void 0, function () {
            var client, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.pool) {
                            throw new Error("The database is not connected. Did you call disconnect() but not reconnect()?");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, this.pool.connect()];
                    case 2:
                        client = _a.sent();
                        return [4 /*yield*/, client.query(text, parameters)];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 4:
                        e_3 = _a.sent();
                        e_3.query = text;
                        // if (!e.message || e.message.indexOf('schema "db" already exists')) {
                        //   console.log(e);
                        // }
                        throw e_3;
                    case 5:
                        if (client) {
                            client.release();
                        }
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    PoolDatabase.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.pool) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.pool.end()];
                    case 1:
                        _a.sent();
                        this.pool = undefined;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return PoolDatabase;
}(_1.Database));
exports.PoolDatabase = PoolDatabase;
var createTable = function (table, tableName) {
    return new table_1.TableWrapper(table, tableName);
};
exports.extendDatabase = function (tables, database) {
    var db = database;
    var tableNames = Object.keys(tables);
    tableNames.forEach(function (tableName) {
        var table = tables[tableName];
        db[tableName] = createTable(table, tableName);
    });
    tableNames.forEach(function (tableName) {
        var table = db[tableName];
        table.init(database);
    });
    return db;
};
exports.createDatabase = function (databaseUrl, tables) {
    var database = new PoolDatabase(databaseUrl, tables);
    return exports.extendDatabase(tables, database);
};
//# sourceMappingURL=pool.js.map