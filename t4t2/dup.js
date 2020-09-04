const dbdriver = require("better-sqlite3");
const dbfilename = require("./dbfilename");

const db = dbdriver(dbfilename);

// https://stackoverflow.com/questions/41503359/how-to-select-all-rows-with-duplicated-column-value-in-sql
const db_tag_duplicates = db.prepare(/* sql */ `
   SELECT * FROM (
      SELECT *, Count(1) OVER (partition BY string) AS cnt FROM tags
   )
   WHERE cnt > 1
   ORDER BY string;
`);

db_tag_duplicates.raw(true);

console.log(db_tag_duplicates.all());
