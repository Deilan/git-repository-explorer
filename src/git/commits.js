const { exec } = require("../utils/child-process");
const { throwIfUndefinedOrNull } = require('../utils/guard');

// using tab as a separator
const SEPARATOR = '\t';

// Output format:
// <hash> TAB <subject>
const FORMAT = `'%H${SEPARATOR}%s'`

function getCommits(branch = '') {
  throwIfUndefinedOrNull('branch', branch);
  return exec(`git log --pretty=${FORMAT} ${branch}`)
    .then(parseLogOutput);
}

function parseLogOutput(outputLines) {
  throwIfUndefinedOrNull('outputLines', outputLines);
  return outputLines.map(line => {
    const strings = line.split(SEPARATOR);
    return {
      hash: strings[0],
      subject: strings[1]
    };
  })
}

module.exports = {
  getCommits
};