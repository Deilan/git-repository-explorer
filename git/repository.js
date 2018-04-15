const { exec } = require("../utils/child-process");

function getRepositoryName() {
  return exec('git rev-parse --show-toplevel')
    .then(
      stdoutArr => stdoutArr[0],
      stderrArr => Promise.reject(stderrArr[0])
    );
}

module.exports = {
  getRepositoryName
};