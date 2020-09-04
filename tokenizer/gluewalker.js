const dictTree = require("../t4t2/tree");

/** @typedef {import("wink-tokenizer").Token} Token */
/** @typedef {import("../t4t2/Node").default} Node */

/**
 * Greedily joins Tokens using the walk-forward-walk-backwards method.
 *
 * @param {Token[]} tokens
 * @returns {Token[]}
 */
function glue(tokens) {
   let i = 0;

   const len = tokens.length;
   /** @type {Token[]} */
   const out = [];

   wholeTokenLoop:
   while (i < len) {
      let e = i;
      /** @type {Node[]} */
      const path = [dictTree];

      // walk forward
      while (e < len) {
         const token = tokens[e];
         const lastInPath = path[path.length - 1];
         if (token.value in lastInPath.next) {
            path.push(lastInPath.next[token.value]);
            e++;
         } else {
            break;
         }
      }

      // walk back
      for (let p = path.length - 1; p > 0; p--) { // we can skip the check of path[0]
         const currentNode = path[p];
         if (currentNode.token !== null) {
            out.push(currentNode.token);
            i += p;
            continue wholeTokenLoop;
         }
      }

      // didn't find anything on the walk back
      out.push(tokens[i]);
      i++;
   }
   return out;
}

module.exports = glue;
