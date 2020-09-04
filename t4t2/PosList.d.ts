import { PosTag } from "wink-pos-tagger";

interface PosList {
   [token: string]: PosTag[],
}

declare const posList: PosList;

export = posList;
