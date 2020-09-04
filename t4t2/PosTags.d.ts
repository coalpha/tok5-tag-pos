import { PosTag } from "wink-pos-tagger";

interface PosTags {
   [token: string]: PosTag[],
}

declare const posTags: PosTags;

export = posTags;
