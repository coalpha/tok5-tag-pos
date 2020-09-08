import { Token } from "wink-tokenizer";

declare class TreeNode {
   constructor(name: string);

   token: Token;
   next: { [word: string]: TreeNode | null };

   open(child: string): TreeNode;
}

export = TreeNode;
