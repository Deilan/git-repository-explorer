const util = require('util');
const { EOL } = require('os');
const childProcess = require('child_process');

const execAsync = util.promisify(childProcess.exec);

const { removeTrailingEol } = require('./string');

function convertOutputToArray(output) {
  if (!output) {
    throw new Error(`Missing required parameter 'output'`);
  }
  output = removeTrailingEol(output);
  return output !== '' ? output.split(EOL) : [];
}

function exec(command) {
  return execAsync(command)
    .then(({
        stdout
      }) => convertOutputToArray(stdout),
      ({
        stderr
      }) => Promise.reject(convertOutputToArray(stderr)));
}

module.exports = {
  exec
};