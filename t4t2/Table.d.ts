import PosList from "./PosList";
import TreeNode from "./TreeNode";
import { Whole } from "./Entry";

export abstract class Table {
   add(...entries: Whole): void;

   posList: PosList;
   tree: TreeNode;

   jsonPosList: string;
   jsonTree: string;

   /** tfw no RAII */
   close(): void;
}
