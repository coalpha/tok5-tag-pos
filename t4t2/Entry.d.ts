import { TokenType } from "wink-tokenizer";
import { Pos as PosTag } from "wink-pos-tagger";

namespace Entry {
   interface TokenStringBearer {
      string: string;
   }
   
   interface TokenTypeBearer {
      token_type: TokenType;
   }
   
   interface TokenPosBearer {
      pos: PosTag;
   }
   
   declare class Whole implements 
      TokenStringBearer,
      TokenTypeBearer,
      TokenPosBearer {
      constructor(
         public string: string,
         public pos: PosTag,
         public token_type: TokenType = "word"
      );
   }
   
   declare class Token implements
      TokenStringBearer,
      TokenTypeBearer {
      constructor(
         public string: string,
         public token_type: TokenType = "word",
      );
   };
   
   declare class Pos implements
      TokenStringBearer,
      TokenPosBearer {
      constructor(
         public string: string,
         public pos: PosTag,
      );
   };
}

export = Entry;
