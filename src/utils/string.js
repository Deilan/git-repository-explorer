const { EOL } = require('os');

const { throwIfUndefinedOrNull } = require('../utils/guard');

const TRAILING_EOL_REGEX = new RegExp(`${EOL}$`);

function removeLeadingSlash(str) {
  throwIfUndefinedOrNull('str', str);
  return str.replace(/^\//, '');
}

function removeTrailingSlash(str) {
  throwIfUndefinedOrNull('str', str);
  return str.replace(/\/$/, '');
}

function removeTrailingEol(str) {
  throwIfUndefinedOrNull('str', str);
  return str.replace(TRAILING_EOL_REGEX, '')
}

module.exports = {
  removeLeadingSlash,
  removeTrailingSlash,
  removeTrailingEol
};