const posTagger = require("wink-pos-tagger");

const tagger = posTagger();

function tagOneToken(token) {
   const tag = tagger.tagRawTokens([token])[0].pos;
   console.log(`t1tk ${token} as ${tag}`);
   return tag;
}

module.exports = tagOneToken;
