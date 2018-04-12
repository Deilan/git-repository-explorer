const util = require('util');
const childProcess = require('child_process');
const os = require('os');

const ENDING_EOL_REGEX = new RegExp(`${os.EOL}$`);
const execAsync = util.promisify(childProcess.exec);

function convertToArray(output) {
  // remove ending EOL
  output = output.replace(ENDING_EOL_REGEX, '');
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