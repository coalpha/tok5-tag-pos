import { Token } from "wink-tokenizer";

export default interface Node {
   token: Token | null,
   next: { [word: string]: Node | null },
}
