import { Database } from "../../database";
export declare const rollback: (db: Database<any>, migrationsDir: string) => Promise<void>;
export declare const rollbackAll: (db: Database<any>, migrationsDir: string) => Promise<void>;
