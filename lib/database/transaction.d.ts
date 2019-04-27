import * as pg from 'pg';
import { Database } from '.';
import { ColumnWrapper } from '../columns';
import { TableWrapper } from '../table';
export interface TableMap {
    [tableName: string]: any;
}
export declare class TransactionDatabase<Tables extends TableMap> extends Database<Tables> {
    private $client;
    constructor(tables: Tables, client: pg.PoolClient);
    sql(strings: TemplateStringsArray, ...parameters: any[]): Promise<pg.QueryResult>;
    reconnect(_databaseName: string): Promise<void>;
    disconnect(): Promise<void>;
    exec(text: string, parameters?: any[]): Promise<pg.QueryResult>;
    destroy(): Promise<void>;
    transaction<Ret, State = {
        [TableName in keyof Tables]: TableWrapper<{
            [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]['selectType'];
        }, {
            [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]['insertType'];
        }, {
            [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]['updateType'];
        }> & {
            [ColumnName in keyof Tables[TableName]]: ColumnWrapper<ColumnName, Tables[TableName][ColumnName]['type'], Tables[TableName][ColumnName]['selectType'], Tables[TableName][ColumnName]['insertType'], Tables[TableName][ColumnName]['updateType']>;
        };
    }>(callback: (db: TransactionDatabase<Tables> & State) => Promise<Ret>): Promise<Ret | undefined>;
}
