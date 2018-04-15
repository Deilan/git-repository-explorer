module.exports = {
  env: {
    node: true,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions:{
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  }
};