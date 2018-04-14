const { getBranches } = require('./branch');
const { getTreeContents } = require('./tree');
const { getBlobStream } = require('./blob');
const { getCommits } = require('./commits');

module.exports = {
  getBranches,
  getTreeContents,
  getBlobStream,
  getCommits
};