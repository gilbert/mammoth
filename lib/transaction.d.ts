import * as pg from 'pg';
export declare class Transaction {
    private client;
    constructor(client: pg.PoolClient);
    begin(): Promise<pg.QueryResult>;
    commit(): Promise<pg.QueryResult>;
    rollback(): Promise<pg.QueryResult>;
}
