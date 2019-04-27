import * as pg from 'pg';
import { ColumnWrapper } from '../columns';
import { DeleteQuery, InsertQuery, PartialQuery, SelectQuery, UpdateQuery } from '../query';
import { TableWrapper } from '../table';
export interface TableMap {
    [tableName: string]: any;
}
export declare abstract class Database<Tables extends TableMap> {
    protected tables: Tables;
    constructor(tables: Tables);
    abstract reconnect(databaseName: string): Promise<void>;
    abstract disconnect(): Promise<void>;
    getTableNames(): string[];
    sql(strings: TemplateStringsArray, ...parameters: any[]): Promise<pg.QueryResult>;
    select<A extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    })>(columnA: A): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    select<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    } & {
        [P in B['name']]: B['selectType'];
    })>(columnA: A, columnB: B): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    select<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    } & {
        [P in B['name']]: B['selectType'];
    } & {
        [P in C['name']]: C['selectType'];
    })>(columnA: A, columnB: B, columnC: C): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    select<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    } & {
        [P in B['name']]: B['selectType'];
    } & {
        [P in C['name']]: C['selectType'];
    } & {
        [P in D['name']]: D['selectType'];
    })>(columnA: A, columnB: B, columnC: C, columnD: D): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    select<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    } & {
        [P in B['name']]: B['selectType'];
    } & {
        [P in C['name']]: C['selectType'];
    } & {
        [P in D['name']]: D['selectType'];
    } & {
        [P in E['name']]: E['selectType'];
    })>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    select<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    } & {
        [P in B['name']]: B['selectType'];
    } & {
        [P in C['name']]: C['selectType'];
    } & {
        [P in D['name']]: D['selectType'];
    } & {
        [P in E['name']]: E['selectType'];
    } & {
        [P in F['name']]: F['selectType'];
    })>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    select<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    } & {
        [P in B['name']]: B['selectType'];
    } & {
        [P in C['name']]: C['selectType'];
    } & {
        [P in D['name']]: D['selectType'];
    } & {
        [P in E['name']]: E['selectType'];
    } & {
        [P in F['name']]: F['selectType'];
    } & {
        [P in G['name']]: G['selectType'];
    })>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    select<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    } & {
        [P in B['name']]: B['selectType'];
    } & {
        [P in C['name']]: C['selectType'];
    } & {
        [P in D['name']]: D['selectType'];
    } & {
        [P in E['name']]: E['selectType'];
    } & {
        [P in F['name']]: F['selectType'];
    } & {
        [P in G['name']]: G['selectType'];
    } & {
        [P in H['name']]: H['selectType'];
    })>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    select<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, I extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    } & {
        [P in B['name']]: B['selectType'];
    } & {
        [P in C['name']]: C['selectType'];
    } & {
        [P in D['name']]: D['selectType'];
    } & {
        [P in E['name']]: E['selectType'];
    } & {
        [P in F['name']]: F['selectType'];
    } & {
        [P in G['name']]: G['selectType'];
    } & {
        [P in H['name']]: H['selectType'];
    } & {
        [P in I['name']]: I['selectType'];
    })>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H, columnI: I): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    select<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, I extends ColumnWrapper<any, any, any, any, any>, J extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    } & {
        [P in B['name']]: B['selectType'];
    } & {
        [P in C['name']]: C['selectType'];
    } & {
        [P in D['name']]: D['selectType'];
    } & {
        [P in E['name']]: E['selectType'];
    } & {
        [P in F['name']]: F['selectType'];
    } & {
        [P in G['name']]: G['selectType'];
    } & {
        [P in H['name']]: H['selectType'];
    } & {
        [P in I['name']]: I['selectType'];
    } & {
        [P in J['name']]: J['selectType'];
    })>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H, columnI: I, columnJ: J): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    select<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, I extends ColumnWrapper<any, any, any, any, any>, J extends ColumnWrapper<any, any, any, any, any>, K extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    } & {
        [P in B['name']]: B['selectType'];
    } & {
        [P in C['name']]: C['selectType'];
    } & {
        [P in D['name']]: D['selectType'];
    } & {
        [P in E['name']]: E['selectType'];
    } & {
        [P in F['name']]: F['selectType'];
    } & {
        [P in G['name']]: G['selectType'];
    } & {
        [P in H['name']]: H['selectType'];
    } & {
        [P in I['name']]: I['selectType'];
    } & {
        [P in J['name']]: J['selectType'];
    } & {
        [P in K['name']]: K['selectType'];
    })>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H, columnI: I, columnJ: J, columnK: K): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    select<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, I extends ColumnWrapper<any, any, any, any, any>, J extends ColumnWrapper<any, any, any, any, any>, K extends ColumnWrapper<any, any, any, any, any>, L extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    } & {
        [P in B['name']]: B['selectType'];
    } & {
        [P in C['name']]: C['selectType'];
    } & {
        [P in D['name']]: D['selectType'];
    } & {
        [P in E['name']]: E['selectType'];
    } & {
        [P in F['name']]: F['selectType'];
    } & {
        [P in G['name']]: G['selectType'];
    } & {
        [P in H['name']]: H['selectType'];
    } & {
        [P in I['name']]: I['selectType'];
    } & {
        [P in J['name']]: J['selectType'];
    } & {
        [P in K['name']]: K['selectType'];
    } & {
        [P in L['name']]: K['selectType'];
    })>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H, columnI: I, columnJ: J, columnK: K, columnL: L): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    select<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, I extends ColumnWrapper<any, any, any, any, any>, J extends ColumnWrapper<any, any, any, any, any>, K extends ColumnWrapper<any, any, any, any, any>, L extends ColumnWrapper<any, any, any, any, any>, M extends ColumnWrapper<any, any, any, any, any>, Ret = ({
        [P in A['name']]: A['selectType'];
    } & {
        [P in B['name']]: B['selectType'];
    } & {
        [P in C['name']]: C['selectType'];
    } & {
        [P in D['name']]: D['selectType'];
    } & {
        [P in E['name']]: E['selectType'];
    } & {
        [P in F['name']]: F['selectType'];
    } & {
        [P in G['name']]: G['selectType'];
    } & {
        [P in H['name']]: H['selectType'];
    } & {
        [P in I['name']]: I['selectType'];
    } & {
        [P in J['name']]: J['selectType'];
    } & {
        [P in K['name']]: K['selectType'];
    } & {
        [P in L['name']]: K['selectType'];
    } & {
        [P in M['name']]: K['selectType'];
    })>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H, columnI: I, columnJ: J, columnK: K, columnL: L, columnM: M): {
        from(table: TableWrapper<any, any, any>): SelectQuery<any, {}, {}, {}, Ret[], Ret>;
    };
    insertInto<T extends TableWrapper<any, any, any>>(table: T): InsertQuery<this, T, T['$row'], T['$insertRow'], T['$updateRow'], number, void>;
    deleteFrom<T extends TableWrapper<any, any, any>>(table: T): DeleteQuery<this, T, T['$row'], T['$insertRow'], T['$updateRow'], number, void>;
    update<T extends TableWrapper<any, any, any>, Ret = UpdateQuery<this, T, T['$row'], T['$insertRow'], T['$updateRow'], number, void>>(table: T): {
        set(object: {
            [P in keyof T['$updateRow']]?: T['$updateRow'][P] | PartialQuery;
        }): Ret;
    };
    abstract exec(text: string, parameters: any[]): Promise<pg.QueryResult>;
    abstract destroy(): Promise<void>;
    abstract transaction<Ret, State = {
        [TableName in keyof Tables]: TableWrapper<{
            [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]['selectType'];
        }, {
            [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]['insertType'];
        }, {
            [ColumnName in keyof Tables[TableName]]: Tables[TableName][ColumnName]['updateType'];
        }> & {
            [ColumnName in keyof Tables[TableName]]: ColumnWrapper<ColumnName, Tables[TableName][ColumnName]['type'], Tables[TableName][ColumnName]['selectType'], Tables[TableName][ColumnName]['insertType'], Tables[TableName][ColumnName]['updateType']>;
        };
    }>(callback: (db: Database<Tables> & State) => Promise<Ret>): Promise<Ret | undefined>;
}
