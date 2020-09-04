/** @type {import("wink-pos-tagger")} */
const posTagger = require("wink-pos-tagger");
const { gtokenize } = require("../tokenizer");
const tags = require("../dict/tags");

const tagger = posTagger();
tagger.updateLexicon(tags);

function tag(s) {
   return tagger.tag(gtokenize(s));
}

module.exports = tag;
