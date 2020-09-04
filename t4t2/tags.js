const fs = require("fs");

const tags = JSON.parse(fs.readFileSync(`${__dirname}/tags.json`));
Object.setPrototypeOf(tags, null);

module.exports = tags;
