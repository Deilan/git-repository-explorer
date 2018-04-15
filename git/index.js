const { getBranches } = require('./branch');
const { getTreeContents } = require('./tree');
const { getBlobStream } = require('./blob');
const { getLog } = require('./commits');
const { getObjectType } = require('./object');
const { getRepositoryName } = require('./repository');

module.exports = {
  getBranches,
  getTreeContents,
  getBlobStream,
  getLog,
  getObjectType,
  getRepositoryName
};