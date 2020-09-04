class WholeEntry {
   constructor(string, pos, token_type) {
      this.string = string;
      this.pos = pos;
      this.token_type = token_type;
   }
}

class TokenEntry {
   constructor(string, token_type) {
      this.string = string;
      this.token_type = token_type;
   }
}

class PosEntry {
   constructor(string, pos) {
      this.string = string;
      this.pos = pos;
   }
}

module.exports = {
   Whole: WholeEntry,
   Token: TokenEntry,
   Pos: PosEntry,
};
