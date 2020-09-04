import PosList from "./PosList";
import TreeNode from "./TreeNode";
import { Whole } from "./Entry";

export abstract class Table {
   add(...entries: Whole): void;

   posList: PosList;
   tree: TreeNode;

   /** tfw no RAII */
   close(): void;
}
