import { Pos } from "wink-pos-tagger";

export default interface PosList {
   [token: string]: Pos[],
}
