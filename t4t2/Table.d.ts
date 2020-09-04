import TokenTreeNode from "./TreeNode";
import { Whole_o } from "./Entry";

export abstract class Table {
   tree: TokenTreeNode;

   add_o(...entries: Whole_o): void;

   get entries_o(): Whole_o[];
   get duplicates_o(): Whole_o[];
}
