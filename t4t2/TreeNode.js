class TreeNode {
   constructor(node, token = null) {
      if (node) {
         return node;
      }
      this.token = token;
      this.next = Object.create(null);
   }
}

module.exports = TreeNode;
