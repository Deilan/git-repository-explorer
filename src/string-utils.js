const { EOL } = require('os');

const TRAILING_EOL_REGEX = new RegExp(`${EOL}$`);

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