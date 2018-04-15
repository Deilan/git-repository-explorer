const { exec } = require("../utils/child-process");

function getObjectType(object) {
  return exec(`git cat-file -t ${object}`)
    .then(
      stdoutArr => stdoutArr[0],
      stderrArr => Promise.reject(stderrArr[0])
    );
}

module.exports = {
  getObjectType
};