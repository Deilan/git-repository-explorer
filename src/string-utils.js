const os = require('os');

const TRAILING_EOL_REGEX = new RegExp(`${os.EOL}$`);

function removeTrailingSlash(str) {
  return str.replace(/\/$/, '');
}

function removeTrailingEol(str) {
  return str.replace(TRAILING_EOL_REGEX, '')
}

module.exports = {
  removeTrailingSlash,
  removeTrailingEol
};