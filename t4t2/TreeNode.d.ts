import { Token } from "wink-tokenizer";

declare class TreeNode {
   constructor();
   constructor(node: TreeNode);
   constructor(node?: TreeNode, token: Token | null);
   token: Token | null;
   next: { [word: string]: TreeNode | null };
}

export = TreeNode;
