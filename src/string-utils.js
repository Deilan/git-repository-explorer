const { EOL } = require('os');

const TRAILING_EOL_REGEX = new RegExp(`${EOL}$`);

function removeLeadingSlash(str) {
  return str.replace(/^\//, '');
}

function removeTrailingSlash(str) {
  return str.replace(/\/$/, '');
}

function removeTrailingEol(str) {
  return str.replace(TRAILING_EOL_REGEX, '')
}

module.exports = {
  removeLeadingSlash,
  removeTrailingSlash,
  removeTrailingEol
};