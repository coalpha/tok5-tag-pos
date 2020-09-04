import { TokenType } from "wink-tokenizer";
import { Pos } from "wink-pos-tagger";

export interface Whole_o {
   string: string,
   pos: Pos,
   token_type: TokenType,
}

export type Whole_t = [string: string, pos: Pos, token_type: TokenType]; 

export interface Token_o {
   string: string,
   token_type: TokenType,
};

export type Token_t = [string: string, token_type: TokenType];

export interface Pos_o {
   string: string,
   pos: Pos,
};

export type Pos_t = [string: string, pos: Pos];
