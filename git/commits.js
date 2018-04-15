const { exec } = require("./common");
const { throwIfUndefinedOrNull } = require('../utils/guard');
const { rejectWithFirstItem } = require('./helpers');

// using tab as a separator
const SEPARATOR = '\t';

// Output format:
// <hash> TAB <subject>
const FORMAT = `'%H${SEPARATOR}%s'`

function getLog(path = '') {
  throwIfUndefinedOrNull('path', path);
  return exec(`log --pretty=${FORMAT} ${path}`)
    .then(parseLogOutput, rejectWithFirstItem);
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
  getLog
};