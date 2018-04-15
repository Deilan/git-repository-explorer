const { exec } = require("./common");

function getRepositoryName() {
  return exec(`rev-parse --show-toplevel`)
    .then(
      stdoutArr => stdoutArr[0],
      stderrArr => Promise.reject(stderrArr[0])
    );
}

module.exports = {
  getRepositoryName
};