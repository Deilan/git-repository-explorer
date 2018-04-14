const { EOL } = require("os");
const { basename } = require("path");

const { throwIfUndefinedOrNull } = require('../utils/guard');
const { exec } = require("../utils/child-process");

function getTreeContents(treeIsh, path = '') {
  throwIfUndefinedOrNull('treeIsh', treeIsh);
  throwIfUndefinedOrNull('path', path);
  return exec(`git ls-tree -l '${treeIsh}' '${path}'`)
    .then(outputLines => {
      return outputLines.map(line => parseTreeContentsLine(line, path))
    });
}

function parseTreeContentsLine(line, path) {
  throwIfUndefinedOrNull('line', line);
  throwIfUndefinedOrNull('path', path);
  // split by tab or whitespace
  const strings = line.split(/\s+/);
  // Output format:
  // <mode> SP <type> SP <object> SP <object size> TAB <file>
  return {
    mode: strings[0],
    type: strings[1],
    object: strings[2],
    // conditionally define objectSize prop for blobs but not trees
    ...(strings[3] !== '-' && {
      objectSize: parseInt(strings[3], 10)
    }),
    file: basename(strings[4])
  };
}

module.exports = {
  getTreeContents
};