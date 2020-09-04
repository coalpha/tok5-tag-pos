const dbdriver = require("better-sqlite3");

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
      const dbs = this.dbs = Object.create(null);

      dbs.token = db.prepare(/* sql */ `
         insert or ignore into tokens (string, token_type)
         values (:string, :token_type);
      `);

      dbs.pos = db.prepare(/* sql */ `
         insert or ignore into poss (string, pos)
         values (:string, :pos);
      `);

      dbs.begin = db.prepare("begin transaction");
      dbs.rollback = db.prepare("rollback transaction");
      dbs.commit = db.prepare("commit transaction");

      /** Used for duplicate detection */
      this.multiplexedEntryTracker = Object.create(null);
   }
}
