const TokenizerFactory = require("wink-tokenizer");

const tokenizer = new TokenizerFactory();

//tokenizer.defineConfig({});

function tokenize_val(s) {
   return tokenizer.tokenize(s).map(tok => tok.value);
}

function tokenize_obj(s) {
   return tokenizer.tokenize(s);
}

module.exports = {
   val: tokenize_val,
   obj: tokenize_obj,
};
