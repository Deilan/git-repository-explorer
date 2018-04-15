const util = require('util');
const { EOL } = require('os');
const childProcess = require('child_process');

const execAsync = util.promisify(childProcess.exec);

const { removeTrailingEol } = require('./string');

const { throwIfUndefinedOrNull } = require('./guard');

function exec(command) {
  throwIfUndefinedOrNull('command', command);
  return execAsync(command)
    .then(({
        stdout
      }) => convertOutputToArray(stdout),
      ({
        stderr
      }) => Promise.reject(convertOutputToArray(stderr)));
}

function convertOutputToArray(output) {
  throwIfUndefinedOrNull('output', output);
  output = removeTrailingEol(output);
  return output !== '' ? output.split(EOL) : [];
}

module.exports = {
  exec
};