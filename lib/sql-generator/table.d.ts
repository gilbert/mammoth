import { TableWrapper } from '../table';
export declare const generateSql: <T extends TableWrapper<any, any, any>>(table: T) => string[];
export declare const generateTypeSql: <T extends TableWrapper<any, any, any>>(table: T) => string[];
export declare const generateCreateTableSql: <T extends TableWrapper<any, any, any>>(table: T) => string;
