class TreeNode {
   constructor(name) {
      this.name = name;
      this.token = [];
      this.next = Object.create(null);
   }

   addToken(token) {
      this.token.push(token);
   }

   open(child) {
      return this.next[child] || new TreeNode(`${this.name} > ${child}`);
   }
}

module.exports = TreeNode;
