import TokenTreeNode from "./TreeNode";
import { Entry_t } from "./Entry";

export abstract class Table {
   tree: TokenTreeNode;
   get entries_t(): Entry_t[];
   get duplicates_t(): Entry_t[];
}
