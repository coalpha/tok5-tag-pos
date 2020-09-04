const dbdriver = require("better-sqlite3");
const implicitEntry = require("./implicitEntry");

/** @extends {import("./Table").Table} */
class TableSqlite3 {
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

      /**
       * Database prepared statements
       *
       * @type {{[name: string]: dbdriver.Statement}}
       */

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

      ///** Used for duplicate detection */
      //this.multiplexedEntryTracker = Object.create(null);
   }

   /**
    * @param {import("./Entry").Whole[]} entries
    */
   add(...entries) {
      this.db_begin.run();
      for (const entry of entries) {
         const { tokens, poss } = implicitEntry.toTable(entry);

         for (const token of tokens) {
            this.db_token.run(token);
         }

         for (const pos of poss) {
            this.db_pos.run(pos);
         }
      }
   }
}
