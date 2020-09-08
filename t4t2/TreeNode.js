class TreeNode {
   constructor(name) {
      this.name = name;
      this.token = null;
      this.next = Object.create(null);
   }

   open(child) {
      return this.next[child] || new TreeNode(`${this.name} > ${child}`);
   }
}

module.exports = TreeNode;
