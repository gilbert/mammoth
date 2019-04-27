import { Database } from '../../database';
export interface Transaction {
    sql(strings: TemplateStringsArray, ...parameters: any[]): void;
}
export interface Migration {
    name: string;
    up(transaction: Transaction): Promise<any> | void;
    down(transaction: Transaction): Promise<any> | void;
}
export declare const getMigrations: (migrationsDir: string) => Migration[];
export declare const createMigrationTable: (db: Database<any>) => Promise<void>;
export declare const getAppliedMigrations: (db: Database<any>) => Promise<Set<string>>;
export declare const getLatestAppliedMigrationName: (db: Database<any>) => Promise<string | undefined>;
export declare const getLatestAppliedMigration: (db: Database<any>, migrationsDir: string) => Promise<Migration | undefined>;
export declare const getAllAppliedMigrations: (db: Database<any>, migrationsDir: string) => Promise<Migration[]>;
