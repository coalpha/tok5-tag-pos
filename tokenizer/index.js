// this file might seem pointless at this stage but it's so
// anything that wants to tokenize uses the same Config

const TokenizerFactory = require("wink-tokenizer");
const gluewalker = require("./gluewalker");

const tokenizer = new TokenizerFactory();

module.exports = {
   stokenize(s) { return tokenizer.tokenize(s).map(token => token.value) },
   gtokenize(s) { return gluewalker(tokenizer.tokenize(s)) },
   gstokenize(s) { return gluewalker(tokenizer.tokenize(s)).map(token => token.value) },
};
