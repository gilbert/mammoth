import { PartialQuery, Tokenable } from './query';
export * from './database';
export * from './database/pool';
export * from './columns';
export * from './transaction';
export * from './unsafe';
export * from './keywords';
export declare const not: (tokenable: Tokenable) => PartialQuery;
export declare const now: () => PartialQuery;
