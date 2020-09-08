const dbdriver = require("better-sqlite3");
const TreeNode = require("./TreeNode");
const Entry = require("./Entry");
const tokenizerSingleton = require("../tokenizerSingleton");
/** @typedef {import("wink-tokenizer").Token} WinkToken */

class TableSqlite3 {
   /** @param {string} filename */
   constructor(filename) {
      const db = this.db = new dbdriver(filename);

      this.db.exec(/* sql */ `
         create table tokens (
            string text primary key,
            token_type text not null
         ) without rowid;

         create table poss (
            string text not null,
            pos text not null,

            primary key (string, pos),
            foreign key (string) references tokens(string)
         ) without rowid;
      `);

      this.db_token = db.prepare(/* sql */ `
         insert or ignore into tokens (string, token_type)
         values (:string, :token_type);
      `);

      this.db_pos = db.prepare(/* sql */ `
         insert or ignore into poss (string, pos)
         values (:string, :pos);
      `);

      this.db_begin = db.prepare("begin transaction");
      this.db_rollback = db.prepare("rollback transaction");
      this.db_commit = db.prepare("commit transaction");

      // https://stackoverflow.com/questions/41503359/how-to-select-all-rows-with-duplicated-column-value-in-sql
      this.db_pos_duplicates = db.prepare(/* sql */ `
         select * from (
            select *, count(1) over (partition by string) as occ from poss
         ) where occ > 1
         order by string;
      `);

      /** @type {{ all(): Entry.Pos[] }} */
      this.db_all_poss = db.prepare(/* sql */ `
         select string, pos from poss;
      `);

      /** @type {{ all(): Entry.Token[] }} */
      this.db_all_tokens = db.prepare(/* sql */ `
         select string, token_type from tokens;
      `);

      ///** Used for duplicate detection */
      //this.multiplexedEntryTracker = Object.create(null);
   }

   /** @param {import("./Entry").Whole[]} entries */
   add(...entries) {
      this.db_begin.run();
      for (const entry of entries) {
         this.db_token.run(entry);
         this.db_pos.run(entry);
      }
      this.db_commit.run();
   }

   /** @returns {string[]} */
   get duplicates() {
      return this.db_pos_duplicates.all();
   }

   get posList() {
      const list = Object.create(null);
      for (const { string, pos } of this.db_all_poss.all()) {
         if (string in list) {
            list[string].push(pos);
         } else {
            list[string] = [pos];
         }
      }
      return list;
   }

   get tree() {
      // the root is a node that is not a token type but holds children.
      const root = new TreeNode(":root");

      for (const { string, token_type } of this.db_all_tokens.all()) {
         console.log(`crtk ${string}`);

         const words = tokenizerSingleton.val(string);

         let cursor = root;
         for (const word of words) {
            console.log(`   word ${word}`);
            cursor = cursor.open(word);
         }

         /** @type {WinkToken} */
         const currentToken = {
            value: string,
            tag: token_type,
         };
         // each string is mapped to one and only one token_type
         // the db will enforce this too but if it somehow doesn't,
         // the last token takes priority.
         cursor.token = currentToken;
         console.log(`   setT ${JSON.stringify(currentToken)}`);
      }

      return root;
   }

   close() {
      this.db.close();
   }
}

module.exports = TableSqlite3;
