const { exec } = require("./common");
const { rejectWithFirstItem } = require('./helpers');

function getObjectType(object) {
  return exec(`cat-file -t ${object}`)
    .then(stdoutArr => stdoutArr[0], rejectWithFirstItem);
}

module.exports = {
  getObjectType
};