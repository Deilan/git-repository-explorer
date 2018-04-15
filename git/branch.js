const { exec } = require("./common");
const { throwIfUndefinedOrNull } = require('../utils/guard');
const { rejectWithFirstItem } = require('./helpers');

// function getCurrentBranch() {
//   return exec(`rev-parse --abbrev-ref HEAD`)
//     .then(
//       stdoutArr => stdoutArr[0],
//       rejectWithFirstItem
//     );
// }

function getBranches() {
  return exec(`branch --list`)
    .then(
      stdoutArr => parseBranchesListOutput(stdoutArr),
      rejectWithFirstItem
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