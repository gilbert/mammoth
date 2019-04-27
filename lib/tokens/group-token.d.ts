import { State } from '../query';
import { Token } from './token';
export declare class GroupToken extends Token {
    tokens: Token[];
    open: string;
    close: string;
    constructor(tokens: Token[], open?: string, close?: string);
    reduce(state: State, numberOfParameters: number): State;
}
