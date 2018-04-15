const { spawn } = require('./common');

const {
  throwIfFalsy
} = require('../utils/guard');

function getBlobStream(hash) {
  throwIfFalsy('hash', hash);
  const process = spawn(['cat-file', 'blob', hash]);
  return process.stdout;
}

module.exports = {
  getBlobStream
};