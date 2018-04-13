const util = require('util');
const os = require('os');
const childProcess = require('child_process');

const execAsync = util.promisify(childProcess.exec);

const { removeTrailingEol } = require('./string-utils');

function convertToArray(output) {
  if (!output) {
    throw new Error(`Missing required parameter 'output'`);
  }
  output = removeTrailingEol(output);
  return output !== '' ? output.split(os.EOL) : [];
}

function exec(command) {
  return execAsync(command)
    .then(({
        stdout
      }) => convertToArray(stdout),
      ({
        stderr
      }) => Promise.reject(convertToArray(stderr)));
}

module.exports = {
  exec
};