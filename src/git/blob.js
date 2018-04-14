const {
  spawn
} = require("child_process");

const {
  throwIfUndefinedOrNull,
  throwIfFalsy
} = require('../utils/guard');

function getBlobStream(hash) {
  throwIfFalsy('hash', hash);
  const process = spawn('git', ['cat-file', 'blob', hash]);
  return process.stdout;
}

module.exports = {
  getBlobStream
};