"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
// TODO: We could also immediately generate the AST from here?
exports.generateSql = function (table) {
    return exports.generateTypeSql(table).concat([exports.generateCreateTableSql(table)]);
};
exports.generateTypeSql = function (table) {
    return table
        .getColumns()
        .filter(function (column) { return column.column instanceof __1.EnumColumn; })
        .map(function (column) {
        var enumColumn = column.column;
        if (!enumColumn.dataType) {
            enumColumn.dataType = (table.getName() + "_" + column.snakeCaseName + "_ENUM").toUpperCase();
        }
        return "CREATE TYPE " + enumColumn.dataType + " AS ENUM (" + enumColumn.values
            .map(function (value) { return "'" + value + "'"; })
            .join(", ") + ")";
    });
};
exports.generateCreateTableSql = function (table) {
    var columns = table.getColumns().map(function (column) {
        var config = column.getConfig();
        var parts = [
            "  " + column.snakeCaseName,
            // TODO: it's probably nicer to have a function here so once we refactor the original column
            // out of the column wrapper this still works.
            column.column.dataType,
        ];
        if (config.primary) {
            parts.push("PRIMARY KEY");
        }
        if (config.notNull) {
            parts.push("NOT NULL");
        }
        if (config.default !== undefined) {
            // TODO: should we escape this?
            parts.push("DEFAULT " + config.default);
        }
        if (config.check) {
            // TODO: should we escape this?
            parts.push("CHECK (" + config.check + ")");
        }
        if (config.unique) {
            parts.push("UNIQUE");
        }
        if (config.references) {
            parts.push("REFERENCES " + config.references.tableName + " (" + config.references.columnName + ")");
            if (config.onUpdate) {
                if (config.onUpdate === 'cascade') {
                    parts.push("ON UPDATE CASCADE");
                }
                else if (config.onUpdate === 'restrict') {
                    parts.push("ON UPDATE RESTRICT");
                }
                else {
                    //
                }
            }
            if (config.onDelete) {
                if (config.onDelete === 'cascade') {
                    parts.push("ON DELETE CASCADE");
                }
                else if (config.onDelete === 'restrict') {
                    parts.push("ON DELETE RESTRICT");
                }
                else {
                    //
                }
            }
        }
        return parts.join(' ');
    });
    return "CREATE TABLE " + table.getName() + " (\n" + columns.join(",\n") + "\n)";
};
//# sourceMappingURL=table.js.map