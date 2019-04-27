import { StringToken } from "./tokens";
export declare class Unsafe {
    private sql;
    constructor(sql: string);
    toSql(): string;
    toTokens(): StringToken[];
}
