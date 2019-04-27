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
var chalk_1 = require("chalk");
var fs = require("fs");
var path = require("path");
var sql_creator_1 = require("../../sql-creator");
var table_1 = require("../../sql-generator/table");
var sql_simulator_1 = require("../../sql-simulator");
var writeFileSync = function (path, data) {
    fs.writeFileSync(path, data);
};
var mkdirSync = function (path, shouldSucceedIfAlreadyExists) {
    if (shouldSucceedIfAlreadyExists === void 0) { shouldSucceedIfAlreadyExists = false; }
    try {
        fs.mkdirSync(path);
    }
    catch (e) {
        if (!shouldSucceedIfAlreadyExists || e.code !== 'EEXIST') {
            throw e;
        }
    }
};
var getMigrationTimestamp = function (migrationName) {
    return parseInt(migrationName.split("-")[0].replace(/\./g, ''), 10);
};
var createFromSimulator = function (migrationsDir) { return __awaiter(_this, void 0, void 0, function () {
    var from, transaction, migrations, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                from = new sql_simulator_1.default();
                transaction = {
                    sql: function (strings) {
                        var _parameters = [];
                        for (var _i = 1; _i < arguments.length; _i++) {
                            _parameters[_i - 1] = arguments[_i];
                        }
                        if (strings.length > 1) {
                            throw new Error("Parameters in migration transactions are not supported yet.");
                        }
                        from.simulateQuery(strings[0]);
                        return Promise.resolve();
                    },
                };
                migrations = fs
                    .readdirSync(migrationsDir)
                    .filter(function (fileName) { return fileName !== '.DS_Store'; })
                    .sort(function (a, b) { return getMigrationTimestamp(a) - getMigrationTimestamp(b); })
                    .map(function (migration) { return path.join(process.cwd(), migrationsDir, migration); })
                    .map(function (path) { return require(path); });
                result = Promise.resolve(true);
                migrations.forEach(function (migration) {
                    result = result.then(function () { return migration.up(transaction); });
                });
                return [4 /*yield*/, result];
            case 1:
                _a.sent();
                return [2 /*return*/, from];
        }
    });
}); };
var createToSimulator = function (db) {
    var to = new sql_simulator_1.default();
    var tableNames = db.getTableNames();
    // TODO: sort these table names so all references are resolved before the actual tables.
    tableNames.forEach(function (tableName) {
        var table = db[tableName];
        var queries = table_1.generateSql(table);
        queries.forEach(function (query) {
            to.simulateQuery(query);
        });
    });
    return to;
};
var generateZeros = function (count) { return new Array(count).fill('0').join(''); };
var leftpad = function (number, size) {
    return generateZeros(String(size).length - String(number).length) + number;
};
var getTimestamp = function () {
    var now = new Date();
    return [
        leftpad(now.getFullYear(), 1000),
        leftpad(now.getMonth() + 1, 10),
        leftpad(now.getDate(), 10),
        leftpad(now.getHours(), 10),
        leftpad(now.getMinutes(), 10),
    ].join('.');
};
var addTabs = function (string) {
    var tab = '  ';
    return string
        .split("\n")
        .map(function (string) { return tab + string; })
        .join("\n");
};
exports.generate = function (db, migrationsDir) { return __awaiter(_this, void 0, void 0, function () {
    var from, to, fromCopy, toCopy, up, down, timestamp, name, contents;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                mkdirSync(migrationsDir, true);
                return [4 /*yield*/, createFromSimulator(migrationsDir)];
            case 1:
                from = _a.sent();
                to = createToSimulator(db);
                fromCopy = new sql_simulator_1.default(from);
                toCopy = new sql_simulator_1.default(to);
                up = sql_creator_1.default(from, to, true);
                if (up.queries.length > 0) {
                    down = sql_creator_1.default(toCopy, fromCopy);
                    timestamp = getTimestamp();
                    name = timestamp + "-" + up.names.join('-').slice(0, 50) + ".ts";
                    contents = "import { Transaction } from '@ff00ff/db';\n\nexport const up = async (db: Transaction) => {\n" + up.queries.map(function (query) { return addTabs("await db.sql `" + query + "`;"); }).join("\n\n") + "\n}\n\nexport const down = async (db: Transaction) => {\n" + down.queries.map(function (query) { return addTabs("await db.sql `" + query + "`;"); }).join("\n\n") + "\n}";
                    writeFileSync(path.join(migrationsDir, name), contents);
                    console.log(chalk_1.default.green("Successfully generated migration ") + chalk_1.default.green.bold(name + "."));
                }
                else {
                    console.log(chalk_1.default.green("Everything up to date."));
                }
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=generate.js.map