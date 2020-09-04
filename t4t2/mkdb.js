const fs = require("fs");
const dbdriver = require("better-sqlite3");
const parse = require("csv-parse/lib/sync");
const capitalize = require("capitalize");
const dbfilename = require("./dbfilename");
const tagOneToken = require("../tagger/oneToken");
const { cachedDataVersionTag } = require("v8");

process.chdir(__dirname);

const sourceFiles = "source";
const inFiles = fs.readdirSync(sourceFiles);

if (fs.existsSync(dbfilename)) {
   fs.unlinkSync(dbfilename);
}

const db = dbdriver(dbfilename);

db.exec(/* sql */ `
   create table tokens (
      string text primary key,
      token_type text not null
   ) without rowid;

   create table tags (
      string text not null,
      tag text not null,

      primary key (string, tag),
      foreign key (string) references tokens(string)
   ) without rowid;

   create table arrows (
      string text not null,
      tag_in text not null,
      tag_out text not null,

      primary key (string, tag_in, tag_out)
   ) without rowid;
`);

const db_token = db.prepare(/* sql */ `
   insert or ignore into tokens (string, token_type)
   values (?, ?);
`);

const db_tag = db.prepare(/* sql */ `
   insert or ignore into tags (string, tag)
   values (?, ?);
`);

const db_arrow = db.prepare(/* sql */ `
   insert into arrows (string, tag_in, tag_out)
   values (:string, :tag_in, :tag_out);
`);

const db_begin = db.prepare("begin transaction");
const db_rollback = db.prepare("rollback transaction");
const db_commit = db.prepare("commit transaction");

const dups = Object.create(null);

function addToken(string, token_type, tag) {
   token_type = token_type.toLowerCase();
   const lcstring = string.toLowerCase();
   const nhstring = string.replace(/-/g, " ");
   const lcnhstring = lcstring.replace(/-/g, " ");

   db_token.run(string, token_type);
   db_token.run(lcstring, token_type);
   db_token.run(nhstring, token_type);
   db_token.run(lcnhstring, token_type);

   db_tag.run(string, tag);
   db_tag.run(lcstring, tag);
   db_tag.run(nhstring, tag);
   db_tag.run(lcnhstring, tag);

   if (tag === "NNP") {
      const cpstring = capitalize.words(lcstring);
      db_token.run(cpstring, tag);
      db_tag.run(cpstring, tag);
   }
}

for (const inFilename of inFiles) {
   let mode;

   if (inFilename.endsWith(".tokens.csv")) {
      console.log(`rdtk ${inFilename}`);
      mode = "tokens";
   } else if (inFilename.endsWith(".arrows.csv")) {
      console.log(`rdar ${inFilename}`);
      mode = "arrows";
   } else {
      console.log(`skip ${inFilename}`);
      continue;
   }

   const relativePath = `${sourceFiles}/${inFilename}`;
   const rawcsv = fs.readFileSync(relativePath, "utf8");
   const records = parse(rawcsv, {
      columns: true,
      skip_empty_lines: true,
      relax_column_count: true,
   });

   db_begin.run();
   if (mode === "tokens") {
      for (const record of records) {
         const tag = record.tag.toUpperCase() || tagOneToken(record.string);
         const token_type = record.token_type || "word";
         const multiplexed = `${record.string},${tag},${token_type}`;

         // duplicate detection
         if (multiplexed in dups) {
            console.log(`dplt ${multiplexed} ${dups[multiplexed]} & ${inFilename}`);
         } else {
            dups[multiplexed] = inFilename;
         }

         addToken(record.string, token_type, tag);
      }
   } else {
      for (const record of records) {
         db_arrow.run(record);
      }
   }
   db_commit.run();
}

db.close();
