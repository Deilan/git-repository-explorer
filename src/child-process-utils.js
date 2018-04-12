const util = require('util');
const childProcess = require('child_process');
const os = require('os');

const EOL_ENDING_REGEXP = new RegExp(`${os.EOL}$`);
const exec = util.promisify(childProcess.exec);

function normalize(output) {
  return output.replace(EOL_ENDING_REGEXP, '')
}
module.exports = {
  exec: function (command) {
    return exec(command)
      .then(({
          stdout
        }) => normalize(stdout),
        ({
          stderr
        }) => Promise.reject(normalize(stderr)));
  }
}