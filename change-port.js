const fs = require('fs');

const path = './config.json';

const config = require(path);

if (process.env.PORT) {
  config.PORT = parseInt(process.env.PORT, 10);
}

fs.writeFileSync(path, JSON.stringify(config, null, 2));