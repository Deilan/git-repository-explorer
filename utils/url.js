const { resolve } = require('url');
const { removeTrailingSlash } = require('./string');

function getParentUrl(url) {
  url = removeTrailingSlash(url);
  url = resolve(url, '.');
  url = removeTrailingSlash(url);
  return url;
}

module.exports = {
  getParentUrl
};