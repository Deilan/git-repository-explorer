const { exec } = require("../utils/child-process");

const { throwIfUndefinedOrNull } = require('../utils/guard');

function getBranches() {
  return exec('git branch --list')
    .then(
      stdoutArr => parseBranchesListOutput(stdoutArr),
      stderrArr => Promise.reject(stderrArr[0])
    );
}

function parseBranchesListOutput(stdoutArr) {
  throwIfUndefinedOrNull('outputLines', stdoutArr);
  return stdoutArr.map(line => {
    // trim leading asterisk and whitespace for current branch
    // or 2 whitespaces for not current branch
    return line.substr(2);
  });
}

module.exports = {
  getBranches
};