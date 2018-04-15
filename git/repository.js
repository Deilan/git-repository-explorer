const { exec } = require("./common");
const { rejectWithFirstItem } = require('./helpers');

function getRepositoryName() {
  return exec(`rev-parse --show-toplevel`)
    .then(stdoutArr => stdoutArr[0], rejectWithFirstItem);
}

module.exports = {
  getRepositoryName
};