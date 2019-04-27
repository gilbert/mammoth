/// <reference types="node" />
import { Default, Keyword } from '../keywords';
import { PartialQuery, SelectQuery, Query } from '../query';
import { TableWrapper } from '../table';
import { Token } from '../tokens';
import { Unsafe } from '../unsafe';
export declare type RowActionType = 'restrict' | 'cascade' | 'no action';
export interface ColumnConfig<T> {
    primary?: boolean;
    default?: T | string;
    check?: string;
    notNull?: boolean;
    unique?: boolean;
    references?: {
        tableName: string;
        columnName: string;
    };
    columnFunction?: ColumnFunction<T, any>;
    onDelete?: RowActionType;
    onUpdate?: RowActionType;
}
export declare type ColumnFunction<T, Db> = (db: Db) => ColumnWrapper<any, T, any, any, any>;
export declare type AggregateType = 'COUNT' | 'MIN' | 'MAX' | 'AVG' | 'SUM';
export declare class ColumnWrapper<Name, BaseType, SelectType, InsertType, UpdateType> {
    table: TableWrapper<any>;
    column: Column<any>;
    name: Name;
    baseType: BaseType;
    selectType: SelectType;
    insertType: InsertType;
    updateType: UpdateType;
    snakeCaseName: string;
    camelCaseName: string;
    constructor(table: TableWrapper<any>, column: Column<any>, camelCaseName: string, snakeCaseName: string);
    getNameInResultSet(): string;
    getSnakeCaseName(): string;
    getCamelCaseName(): string;
    getConfig(): ColumnConfig<any>;
    as<A extends string>(aliasName: A): ColumnWrapper<A, BaseType, SelectType, InsertType, UpdateType>;
    isNull(): PartialQuery;
    isNotNull(): PartialQuery;
    asc(): PartialQuery;
    desc(): PartialQuery;
    in(array: BaseType[] | SelectQuery<any, any, any, any, any, any>): PartialQuery;
    private aggregate;
    toSql(): string;
    toTokens(): Token[];
    toReferenceExpressionTokens(): Token[];
    count(): AggregateColumnWrapper<Name, string, string, string, string>;
    sum(): AggregateColumnWrapper<Name, BaseType, BaseType, BaseType, BaseType>;
    min(): AggregateColumnWrapper<'min', BaseType, BaseType, BaseType, BaseType>;
    max(): AggregateColumnWrapper<Name, BaseType, BaseType, BaseType, BaseType>;
    avg(): AggregateColumnWrapper<Name, BaseType, BaseType, BaseType, BaseType>;
    private operate;
    plus(value: BaseType): PartialQuery;
    minus(value: BaseType): PartialQuery;
    multiply(value: BaseType): PartialQuery;
    divide(value: BaseType): PartialQuery;
    modulo(value: BaseType): PartialQuery;
    concat(value: BaseType | ColumnWrapper<any, any, any, any, any>): PartialQuery;
    between(a: BaseType): {
        and: (b: BaseType) => PartialQuery;
    };
    betweenSymmetric(a: BaseType): {
        and: (b: BaseType) => PartialQuery;
    };
    isDistinctFrom(a: BaseType): PartialQuery;
    isNotDistinctFrom(a: BaseType): PartialQuery;
    notIn(value: BaseType[]): PartialQuery;
    private compare;
    like(value: BaseType | ColumnWrapper<any, BaseType, any, any, any> | PartialQuery): PartialQuery;
    ilike(value: BaseType | ColumnWrapper<any, BaseType, any, any, any> | PartialQuery): PartialQuery;
    eq(value: BaseType | ColumnWrapper<any, BaseType, any, any, any> | PartialQuery | Query<any, any, {
        [id: string]: BaseType;
    }>): PartialQuery;
    ne(value: BaseType | ColumnWrapper<any, BaseType, any, any, any> | PartialQuery): PartialQuery;
    gt(value: BaseType | ColumnWrapper<any, BaseType, any, any, any> | PartialQuery): PartialQuery;
    gte(value: BaseType | ColumnWrapper<any, BaseType, any, any, any> | PartialQuery): PartialQuery;
    lt(value: BaseType | ColumnWrapper<any, BaseType, any, any, any> | PartialQuery): PartialQuery;
    lte(value: BaseType | ColumnWrapper<any, BaseType, any, any, any> | PartialQuery): PartialQuery;
}
export declare class AliasedColumnWrapper<Name extends string, BaseType, SelectType, InsertType, UpdateType> extends ColumnWrapper<Name, BaseType, SelectType, InsertType, UpdateType> {
    private tokens;
    constructor(name: Name, tokens: Token[], table: TableWrapper<any>, column: Column<any>, camelCaseName: string, snakeCaseName: string);
    getNameInResultSet(): Name;
    getSnakeCaseName(): Name;
    getCamelCaseName(): Name;
    toTokens(): Token[];
    toReferenceExpressionTokens(): Token[];
}
export declare class AggregateColumnWrapper<Name, BaseType, SelectType, InsertType, UpdateType> extends ColumnWrapper<Name, BaseType, SelectType, InsertType, UpdateType> {
    aggregateType: AggregateType;
    constructor(aggregateType: AggregateType, table: TableWrapper<any>, column: Column<any>, camelCaseName: string, snakeCaseName: string);
    toSql(): string;
    getNameInResultSet(): string;
}
export declare const toSnakeCase: (string: string) => string;
export declare class Column<T, IT = T | null, ST = T | null, UT = T> {
    dataType?: string;
    type: T;
    insertType: IT;
    selectType: ST;
    updateType: UT;
    config: ColumnConfig<T>;
    constructor(name?: string, config?: {});
    primary(): Column<T, T, T>;
    primaryKey(): Column<T, T, T, T>;
    unique(): this;
    notNull(): Column<T, T, T>;
    check(sql: string): this;
    default(sql: T | Unsafe | Keyword): Column<T, T | null, ST, UT | Default>;
    references<Db>(columnFunction: ColumnFunction<T, Db>): this;
    onDelete(): {
        cascade: () => Column<T, IT, ST, UT>;
        restrict: () => Column<T, IT, ST, UT>;
        noAction: () => Column<T, IT, ST, UT>;
    };
    onUpdate(): {
        cascade: () => Column<T, IT, ST, UT>;
        restrict: () => Column<T, IT, ST, UT>;
        noAction: () => Column<T, IT, ST, UT>;
    };
}
export declare class TextColumn<T = string> extends Column<T> {
    dataType: string;
}
export declare class CitextColumn extends Column<string> {
    dataType: string;
}
export declare class CaseInsensitiveTextColumn extends CitextColumn {
}
export declare class IntegerColumn extends Column<number> {
    dataType: string;
}
export declare class DecimalColumn extends Column<number> {
    dataType: string;
}
export declare class SerialColumn extends Column<number, number | null, number, number | Default> {
    dataType: string;
}
export declare class JSONColumn<T> extends Column<T> {
    dataType: string;
}
export declare class JSONBColumn<T> extends Column<T> {
    dataType: string;
}
export declare class TimestampWithTimeZoneColumn extends Column<Date> {
    dataType: string;
}
export declare class TimestampWithoutTimeZoneColumn extends Column<Date> {
    dataType: string;
}
export declare class TimestampColumn extends Column<Date> {
    dataType: string;
}
export declare class DateColumn extends Column<Date> {
    dataType: string;
}
export declare class TimeColumn extends Column<Date> {
    dataType: string;
}
export declare class TimeWithoutTimeZoneColumn extends Column<Date> {
    dataType: string;
}
export declare class TimeWithTimeZoneColumn extends Column<Date> {
    dataType: string;
}
export declare class IntervalColumn extends Column<number> {
    dataType: string;
}
export declare class MoneyColumn extends Column<number> {
    dataType: string;
}
export declare class BooleanColumn extends Column<boolean> {
    dataType: string;
}
export declare class UuidColumn extends Column<string> {
    dataType: string;
}
export declare class StringColumn extends TextColumn {
}
export declare class NumberColumn extends IntegerColumn {
}
export declare class ByteaColumn extends Column<Buffer> {
    dataType: string;
}
export declare class BlobColumn extends ByteaColumn {
}
export declare class BinaryColumn extends ByteaColumn {
}
export declare class EnumColumn<A extends string> extends Column<A> {
    values: string[];
    constructor(values: A[], name?: string);
}
