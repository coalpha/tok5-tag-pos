const fs = require("fs");
const dbdriver = require("better-sqlite3");
const dbfilename = require("./dbfilename");
const { stokenize } = require("../tokenizer");
/** @typedef {import("./Node").default} Node */

process.chdir(__dirname);

const db = dbdriver(dbfilename);

const db_all = db.prepare(/* sql */ `
   select * from tokens;
`);

db_all.raw(true);

/** @type {Node} */
const tree = {
   token: null,
   next: {},
};

Object.setPrototypeOf(tree, null);

const allTokens = db_all.all();

class NodeClass {
   /** @param {import("wink-tokenizer").Token} token */
   constructor(node, token = null) {
      if (node) {
         return node;
      }
      this.token = token;
      this.next = {};
   }
}

for (const [string, token_type] of allTokens) {
   console.log(`crtk ${string}`);
   let cursor = tree.next;
   const words = stokenize(string);
   for (const word of words.slice(0, -1)) {
      console.log(`   word ${word}`);
      cursor[word] = new NodeClass(cursor[word]);
      cursor = cursor[word].next;
   }
   const lastword = words[words.length - 1];
   console.log(`   lstw ${lastword}`);
   cursor[lastword] = new NodeClass(null, {
      value: string,
      tag: token_type,
   });
}

fs.writeFileSync("tree.json", JSON.stringify(tree/*, null, 3*/));
