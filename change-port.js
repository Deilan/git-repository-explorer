const fs = require('fs');

const path = './config.json';

const config = require(path);

if (process.argv[2]) {
  config.PORT = parseInt(process.argv[2], 10);
}

fs.writeFileSync(path, JSON.stringify(config, null, 2));