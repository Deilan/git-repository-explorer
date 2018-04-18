module.exports = {
  env: {
    node: true,
    es6: true,
    browser: true,
    mocha: true
  },
  extends: "eslint:recommended",
  parserOptions:{
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  }
};