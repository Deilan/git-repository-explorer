const { exec } = require("../utils/child-process");

const { throwIfUndefinedOrNull } = require('../utils/guard');

function getBranches() {
  return exec('git branch --list')
    .then(parseBranchesListOutput);
}

function parseBranchesListOutput(outputLines) {
  throwIfUndefinedOrNull('outputLines', outputLines);
  return outputLines.map(line => {
    // trim leading asterisk and whitespace for current branch
    // or 2 whitespaces for not current branch
    return line.substr(2);
  });
}

module.exports = {
  getBranches
};