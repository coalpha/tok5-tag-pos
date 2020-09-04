import { TokenType } from "wink-tokenizer";
import { PosTag } from "wink-pos-tagger";

/** Object TokenEntry */
export interface Entry_o {
   string: string,
   pos: PosTag,
   tokenType: TokenType,
}

/** Tuple TokenEntry */
export type Entry_t = [string: string, pos: PosTag, tokenType: TokenType]; 
