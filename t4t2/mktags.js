const fs = require("fs");
const dbdriver = require("better-sqlite3");
const dbfilename = require("./dbfilename");

process.chdir(__dirname);

const db = dbdriver(dbfilename);

const tags = Object.create(null);

const db_every_tag = db.prepare(/* sql */ `
   select string, tag from tags;
`);

db_every_tag.raw(true);

for (const [string, tag] of db_every_tag.all()) {
   if (string in tags) {
      tags[string].push(tag);
   } else {
      tags[string] = [tag];
   }
}

fs.writeFileSync("tags.json", JSON.stringify(tags/*, null, 3*/));
