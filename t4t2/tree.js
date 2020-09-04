const fs = require("fs");

const tree = JSON.parse(fs.readFileSync(`${__dirname}/tree.json`));
Object.setPrototypeOf(tree, null);

module.exports = tree;
