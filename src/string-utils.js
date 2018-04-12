function splitOrEmptyArray(str, separator) {
  return str !== '' ? str.split(separator) : [];
}

module.exports = {
  splitOrEmptyArray
};