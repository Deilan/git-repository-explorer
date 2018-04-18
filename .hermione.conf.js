module.exports = {
  gridUrl: 'http://0.0.0.0:4444/wd/hub',
  baseUrl: 'http://localhost:3000',
  sets: {
    desktop: {
      files: 'hermione'
    }
  },

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  }
};