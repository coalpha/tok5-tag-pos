import { TokenType } from "wink-tokenizer";
import { Pos } from "wink-pos-tagger";

export interface Whole {
   string: string,
   pos: Pos,
   token_type: TokenType,
}

export interface Token {
   string: string,
   token_type: TokenType,
};

export interface Pos {
   string: string,
   pos: Pos,
};
