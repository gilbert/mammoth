import { QueryResult } from 'pg';
import { ColumnWrapper } from '.';
import { Database } from './database';
import { TableWrapper } from './table';
import { Token } from './tokens';
export interface Tokenable {
    toTokens(): Token[];
}
export interface State {
    text: string[];
    parameters: any[];
}
export interface QueryState {
    text: string;
    parameters: any[];
}
export declare const createState: (tokens: Token[], numberOfParameters: number) => State;
export declare type QueryType = 'COUNT' | 'ROWS';
export interface ColumnMap {
    [snakeCaseName: string]: string;
}
export declare class Query<Db extends Database<any>, Ret, SingleRet, Tables = undefined> {
    protected tokens: Token[];
    protected db: Db;
    protected type: QueryType;
    protected columnsMap: ColumnMap;
    constructor(db: Db, columnsMap?: ColumnMap, ...tokens: Token[]);
    first(): Promise<SingleRet | undefined>;
    map<T>(callback: (obj: SingleRet) => T): Promise<T[]>;
    filter(callback: (obj: SingleRet) => boolean): Promise<SingleRet[]>;
    protected getRow: (row: {
        [key: string]: any;
    } | undefined) => {} | undefined;
    protected getRet(result: QueryResult): Ret;
    then(onFulfilled?: ((value: Ret) => Ret | PromiseLike<Ret>) | undefined | null, onRejected?: ((reason: any) => void | PromiseLike<void>) | undefined | null): Promise<void | Ret>;
    append(strings?: TemplateStringsArray, parameters?: any[]): void;
    protected internalFrom<T extends TableWrapper<any, any, any>>(table: T): this;
    protected internalJoin<JoinTable extends TableWrapper<any>, Ret>(type: 'JOIN' | 'INNER JOIN' | 'CROSS JOIN' | 'FULL JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'LEFT OUTER JOIN' | 'RIGHT OUTER JOIN' | 'FULL OUTER JOIN', table: JoinTable): {
        on: (tokenable: Tokenable) => Ret;
        using: <T1 extends keyof Tables, T2 extends keyof JoinTable["$row"], C extends T1 & T2>(...columnNames: C[]) => Ret;
    };
    protected internalWhere(tokenable: Tokenable): this;
    protected internalReturning(...columns: (ColumnWrapper<any, any, any, any, any> | undefined)[]): any;
}
export declare class PartialQuery implements Tokenable {
    tokens: Token[];
    constructor(...tokens: Token[]);
    toTokens(): Token[];
    private add;
    or(partialQuery: PartialQuery): this;
    and(partialQuery?: PartialQuery): this;
    andNotExists(partialQuery: PartialQuery | Query<any, any, any>): this;
    andExists(partialQuery: PartialQuery | Query<any, any, any>): this;
    minus(string: string): this;
    plus(string: string): this;
    gt(partialQuery: PartialQuery): this;
    lt(partialQuery: PartialQuery): this;
    gte(partialQuery: PartialQuery): this;
    lte(partialQuery: PartialQuery): this;
    not(partialQuery?: PartialQuery): this;
    in(object: any[] | PartialQuery | Query<any, any, any>): this;
    nullsFirst(): this;
    nullsLast(): this;
}
export declare class InsertQuery<Db extends Database<any>, T extends TableWrapper<Row, InsertRow, UpdateRow>, Row, InsertRow, UpdateRow, Ret, SingleRet> extends Query<Db, Ret, SingleRet> {
    private table;
    constructor(db: Db, table: T, ...tokens: Token[]);
    protected getRet(result: QueryResult): Ret;
    private getColumn;
    defaultValues(): InsertQuery<Db, T, Row, InsertRow, UpdateRow, number, {}>;
    values(object: InsertRow | InsertRow[]): InsertQuery<Db, T, Row, InsertRow, UpdateRow, number, {}>;
    onConflict(...columnNames: (keyof Row)[]): {
        doNothing: () => InsertQuery<Db, T, Row, InsertRow, UpdateRow, Ret | undefined, SingleRet>;
        doUpdateSet: (object: Partial<{ [K in keyof UpdateRow]: UpdateRow[K] | Query<any, any, {
            [string: string]: UpdateRow[K];
        }, undefined>; }>) => UpsertQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet>;
    };
    returning<A extends keyof Row, R = {
        [PA in A]: Row[PA];
    }>(columnNameA: A): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends keyof Row, B extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    }>(columnNameA: A, columnNameB: B): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    }>(columnNameA: A, columnNameB: B, columnNameC: C): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, G extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    } & {
        [PG in G]: Row[PG];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F, columnNameG: G): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, G extends keyof Row, H extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    } & {
        [PG in G]: Row[PG];
    } & {
        [PH in H]: Row[PH];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F, columnNameG: G, columnNameH: H): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, G extends keyof Row, H extends keyof Row, I extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    } & {
        [PG in G]: Row[PG];
    } & {
        [PH in H]: Row[PH];
    } & {
        [PI in I]: Row[PI];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F, columnNameG: G, columnNameH: H, columnNameI: I): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, G extends keyof Row, H extends keyof Row, I extends keyof Row, J extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    } & {
        [PG in G]: Row[PG];
    } & {
        [PH in H]: Row[PH];
    } & {
        [PI in I]: Row[PI];
    } & {
        [PJ in J]: Row[PJ];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F, columnNameG: G, columnNameH: H, columnNameI: I, columnNameJ: J): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    }>(columnA: A): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    }>(columnA: A, columnB: B): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    }>(columnA: A, columnB: B, columnC: C): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    } & {
        [PA in F['name']]: F['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, R = {
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
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    } & {
        [PA in F['name']]: F['selectType'];
    } & {
        [PA in G['name']]: G['selectType'];
    } & {
        [PA in H['name']]: H['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, I extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    } & {
        [PA in F['name']]: F['selectType'];
    } & {
        [PA in G['name']]: G['selectType'];
    } & {
        [PA in H['name']]: H['selectType'];
    } & {
        [PA in I['name']]: I['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H, columnI: I): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, I extends ColumnWrapper<any, any, any, any, any>, J extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    } & {
        [PA in F['name']]: F['selectType'];
    } & {
        [PA in G['name']]: G['selectType'];
    } & {
        [PA in H['name']]: H['selectType'];
    } & {
        [PA in I['name']]: I['selectType'];
    } & {
        [PA in J['name']]: J['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H, columnI: I, columnJ: J): InsertQuery<Db, T, Row, InsertRow, UpdateRow, R, R>;
}
export declare class UpsertQuery<Db extends Database<any>, T extends TableWrapper<Row, InsertRow, UpdateRow>, Row, InsertRow, UpdateRow, Ret, SingleRet> extends InsertQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet> {
    where(tokenable: Tokenable): this;
}
export declare class SelectQuery<Db extends Database<any>, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables = undefined> extends Query<Db, Ret, SingleRet, Tables> {
    protected type: QueryType;
    join<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
    };
    crossJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
    };
    innerJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
    };
    leftJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => SelectQuery<Db, Row, InsertRow, UpdateRow, (Pick<Ret[number], Exclude<keyof Ret[number], keyof T["$row"]>> & Pick<{ [P in keyof T["$row"]]?: T["$row"][P] | undefined; }, Extract<keyof Ret[number], keyof T["$row"]>>)[], Pick<SingleRet, Exclude<keyof SingleRet, keyof T["$row"]>> & Pick<{ [P in keyof T["$row"]]?: T["$row"][P] | undefined; }, Extract<keyof SingleRet, keyof T["$row"]>>, Tables>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => SelectQuery<Db, Row, InsertRow, UpdateRow, (Pick<Ret[number], Exclude<keyof Ret[number], keyof T["$row"]>> & Pick<{ [P in keyof T["$row"]]?: T["$row"][P] | undefined; }, Extract<keyof Ret[number], keyof T["$row"]>>)[], Pick<SingleRet, Exclude<keyof SingleRet, keyof T["$row"]>> & Pick<{ [P in keyof T["$row"]]?: T["$row"][P] | undefined; }, Extract<keyof SingleRet, keyof T["$row"]>>, Tables>;
    };
    rightJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
    };
    leftOuterJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
    };
    rightOuterJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
    };
    fulllOuterJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
    };
    fullJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => SelectQuery<Db, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables>;
    };
    where(tokenable: Tokenable): this;
    limit(limit: number | 'ALL'): this;
    offset(offset: number): this;
    having(tokenable: Tokenable): this;
    orderBy(...tokenables: Tokenable[]): this;
    forUpdate(): this;
    skipLocked(): this;
    groupBy(...columns: ColumnWrapper<any, any, any, any, any>[]): this;
}
export declare class UpdateQuery<Db extends Database<any>, T extends TableWrapper<Row, InsertRow, UpdateRow>, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables = undefined> extends Query<Db, Ret, SingleRet, Tables> {
    private table;
    constructor(db: Db, table: T, ...tokens: Token[]);
    private getColumn;
    from<Table extends TableWrapper<any, any, any>>(table: Table): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, Tables & Table['$row']>;
    join<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
    };
    crossJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
    };
    innerJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
    };
    leftJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
    };
    rightJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
    };
    leftOuterJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
    };
    rightOuterJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
    };
    fulllOuterJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
    };
    fullJoin<T extends TableWrapper<any>>(table: T): {
        on: (tokenable: Tokenable) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
        using: <T1 extends keyof Tables, T2 extends keyof T["$row"], C extends T1 & T2>(...columnNames: C[]) => UpdateQuery<Db, T, Row, InsertRow, UpdateRow, Ret, SingleRet, undefined>;
    };
    where(tokenable: Tokenable): this;
    returning<A extends keyof Row, R = {
        [PA in A]: Row[PA];
    }>(columnNameA: A): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    }>(columnNameA: A, columnNameB: B): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    }>(columnNameA: A, columnNameB: B, columnNameC: C): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, G extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    } & {
        [PG in G]: Row[PG];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F, columnNameG: G): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, G extends keyof Row, H extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    } & {
        [PG in G]: Row[PG];
    } & {
        [PH in H]: Row[PH];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F, columnNameG: G, columnNameH: H): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, G extends keyof Row, H extends keyof Row, I extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    } & {
        [PG in G]: Row[PG];
    } & {
        [PH in H]: Row[PH];
    } & {
        [PI in I]: Row[PI];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F, columnNameG: G, columnNameH: H, columnNameI: I): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, G extends keyof Row, H extends keyof Row, I extends keyof Row, J extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    } & {
        [PG in G]: Row[PG];
    } & {
        [PH in H]: Row[PH];
    } & {
        [PI in I]: Row[PI];
    } & {
        [PJ in J]: Row[PJ];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F, columnNameG: G, columnNameH: H, columnNameI: I, columnNameJ: J): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    }>(columnA: A): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    }>(columnA: A, columnB: B): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    }>(columnA: A, columnB: B, columnC: C): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    } & {
        [PA in F['name']]: F['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, R = {
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
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    } & {
        [PA in F['name']]: F['selectType'];
    } & {
        [PA in G['name']]: G['selectType'];
    } & {
        [PA in H['name']]: H['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, I extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    } & {
        [PA in F['name']]: F['selectType'];
    } & {
        [PA in G['name']]: G['selectType'];
    } & {
        [PA in H['name']]: H['selectType'];
    } & {
        [PA in I['name']]: I['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H, columnI: I): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, I extends ColumnWrapper<any, any, any, any, any>, J extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    } & {
        [PA in F['name']]: F['selectType'];
    } & {
        [PA in G['name']]: G['selectType'];
    } & {
        [PA in H['name']]: H['selectType'];
    } & {
        [PA in I['name']]: I['selectType'];
    } & {
        [PA in J['name']]: J['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H, columnI: I, columnJ: J): UpdateQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
}
export declare class DeleteQuery<Db extends Database<any>, T extends TableWrapper<Row, InsertRow, UpdateRow>, Row, InsertRow, UpdateRow, Ret, SingleRet> extends Query<Db, Ret, SingleRet> {
    private table;
    constructor(db: Db, table: T, ...tokens: Token[]);
    private getColumn;
    where(tokenable: Tokenable): this;
    returning<A extends keyof Row, R = {
        [PA in A]: Row[PA];
    }>(columnNameA: A): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    }>(columnNameA: A, columnNameB: B): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    }>(columnNameA: A, columnNameB: B, columnNameC: C): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, G extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    } & {
        [PG in G]: Row[PG];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F, columnNameG: G): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, G extends keyof Row, H extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    } & {
        [PG in G]: Row[PG];
    } & {
        [PH in H]: Row[PH];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F, columnNameG: G, columnNameH: H): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, G extends keyof Row, H extends keyof Row, I extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    } & {
        [PG in G]: Row[PG];
    } & {
        [PH in H]: Row[PH];
    } & {
        [PI in I]: Row[PI];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F, columnNameG: G, columnNameH: H, columnNameI: I): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends keyof Row, B extends keyof Row, C extends keyof Row, D extends keyof Row, E extends keyof Row, F extends keyof Row, G extends keyof Row, H extends keyof Row, I extends keyof Row, J extends keyof Row, R = {
        [PA in A]: Row[PA];
    } & {
        [PB in B]: Row[PB];
    } & {
        [PC in C]: Row[PC];
    } & {
        [PD in D]: Row[PD];
    } & {
        [PE in E]: Row[PE];
    } & {
        [PF in F]: Row[PF];
    } & {
        [PG in G]: Row[PG];
    } & {
        [PH in H]: Row[PH];
    } & {
        [PI in I]: Row[PI];
    } & {
        [PJ in J]: Row[PJ];
    }>(columnNameA: A, columnNameB: B, columnNameC: C, columnNameD: D, columnNameE: E, columnNameF: F, columnNameG: G, columnNameH: H, columnNameI: I, columnNameJ: J): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    }>(columnA: A): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    }>(columnA: A, columnB: B): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    }>(columnA: A, columnB: B, columnC: C): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    } & {
        [PA in F['name']]: F['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, R = {
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
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    } & {
        [PA in F['name']]: F['selectType'];
    } & {
        [PA in G['name']]: G['selectType'];
    } & {
        [PA in H['name']]: H['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, I extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    } & {
        [PA in F['name']]: F['selectType'];
    } & {
        [PA in G['name']]: G['selectType'];
    } & {
        [PA in H['name']]: H['selectType'];
    } & {
        [PA in I['name']]: I['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H, columnI: I): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
    returning<A extends ColumnWrapper<any, any, any, any, any>, B extends ColumnWrapper<any, any, any, any, any>, C extends ColumnWrapper<any, any, any, any, any>, D extends ColumnWrapper<any, any, any, any, any>, E extends ColumnWrapper<any, any, any, any, any>, F extends ColumnWrapper<any, any, any, any, any>, G extends ColumnWrapper<any, any, any, any, any>, H extends ColumnWrapper<any, any, any, any, any>, I extends ColumnWrapper<any, any, any, any, any>, J extends ColumnWrapper<any, any, any, any, any>, R = {
        [PA in A['name']]: A['selectType'];
    } & {
        [PA in B['name']]: B['selectType'];
    } & {
        [PA in C['name']]: C['selectType'];
    } & {
        [PA in D['name']]: D['selectType'];
    } & {
        [PA in E['name']]: E['selectType'];
    } & {
        [PA in F['name']]: F['selectType'];
    } & {
        [PA in G['name']]: G['selectType'];
    } & {
        [PA in H['name']]: H['selectType'];
    } & {
        [PA in I['name']]: I['selectType'];
    } & {
        [PA in J['name']]: J['selectType'];
    }>(columnA: A, columnB: B, columnC: C, columnD: D, columnE: E, columnF: F, columnG: G, columnH: H, columnI: I, columnJ: J): DeleteQuery<Db, T, Row, InsertRow, UpdateRow, R[], R>;
}
