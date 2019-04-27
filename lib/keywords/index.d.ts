import { StringToken } from "../tokens";
export declare abstract class Keyword {
    abstract toSql(): string;
    toTokens(): StringToken[];
}
export * from './current-timestamp';
export * from './default';
export * from './now';
export * from './uuid-generate-v4';
