import * as pg from 'pg';
import { Database, TableMap } from '.';
import { ColumnWrapper } from '..';
import { TableWrapper } from '../table';
import { TransactionDatabase } from './transaction';
export interface DatabaseConfig {
    min?: number;
    max?: number;
    databaseName?: string;
}
declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export declare class PoolDatabase<Tables extends TableMap> extends Database<Tables> {
    protected pool?: pg.Pool;
    protected databaseUrl: string;
    private createPool;
    constructor(databaseUrl: string, tables: Tables);
    disconnect(): Promise<void>;
    reconnect(databaseName: string): Promise<void>;
    transaction<Ret, State = {
        [TableName in keyof Tables]: TableWrapper<{
            [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]['selectType'];
        }, Omit<{
            [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]['insertType'];
        }, 'id'> & {
            id?: Tables[TableName]['id']['insertType'];
        }, {
            [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]['updateType'];
        }> & {
            [ColumnName in keyof Tables[TableName]]: ColumnWrapper<ColumnName, Tables[TableName][ColumnName]['type'], Tables[TableName][ColumnName]['selectType'], Tables[TableName][ColumnName]['insertType'], Tables[TableName][ColumnName]['updateType']>;
        };
    }>(callback: (db: TransactionDatabase<Tables> & State) => Promise<Ret>): Promise<Ret>;
    exec(text: string, parameters?: any[]): Promise<pg.QueryResult>;
    destroy(): Promise<void>;
}
export declare const extendDatabase: <State, Tables extends TableMap, D extends Database<any>>(tables: Tables, database: D) => D & State;
export declare const createDatabase: <Tables extends TableMap, State = { [TableName in keyof Tables]: TableWrapper<{ [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]["selectType"]; }, Pick<{ [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]["insertType"]; }, Exclude<keyof Tables[TableName], "id">> & {
    id?: Tables[TableName]["id"]["insertType"] | undefined;
}, { [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]["updateType"]; }> & { [ColumnName in keyof Tables[TableName]]: ColumnWrapper<ColumnName, Tables[TableName][ColumnName]["type"], Tables[TableName][ColumnName]["selectType"], Tables[TableName][ColumnName]["insertType"], Tables[TableName][ColumnName]["updateType"]>; }; }>(databaseUrl: string, tables: Tables) => State & PoolDatabase<Tables>;
export {};
