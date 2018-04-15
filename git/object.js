const { exec } = require("./common");

function getObjectType(object) {
  return exec(`cat-file -t ${object}`)
    .then(
      stdoutArr => stdoutArr[0],
      stderrArr => Promise.reject(stderrArr[0])
    );
}

module.exports = {
  getObjectType
};