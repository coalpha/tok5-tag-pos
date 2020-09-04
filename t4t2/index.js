const dbdriver = require("better-sqlite3");
const dbfilename = require("./dbfilename");

const db = dbdriver(dbfilename);

const db_rand_tokens = db.prepare(/* sql */ `
   select string from tokens
   order by random()
   limit ?
`);

db_rand_tokens.raw(true);

const randDict = count => db_rand_tokens.all(count).map(row => row[0]);

module.exports = {
   randDict,
};
