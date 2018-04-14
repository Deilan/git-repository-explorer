const { resolve } = require('url');
const { removeTrailingSlash } = require('./string');

function getParentUrl(url) {
  url = removeTrailingSlash(url);
  url = resolve(url, '.');
  url = removeTrailingSlash(url);
  return url;
}

function joinSegments() {
  return Array.from(arguments)
    .map(arg => removeTrailingSlash(arg))
    .join('/');
}

module.exports = {
  getParentUrl,
  joinSegments
};