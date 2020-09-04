import TokenTreeNode from "./TreeNode";
import { Whole } from "./Entry";

export abstract class Table {
   add(...entries: Whole): void;
   
   entries: Whole[];
   duplicates: Whole[];
   tree: TokenTreeNode;
}
