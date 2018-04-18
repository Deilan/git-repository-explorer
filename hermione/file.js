const { expect } = require('chai');

const fs = require('fs');
const path = require('path');
const util = require('util');

const existsAsync = util.promisify(fs.exists);

describe('Работа с файлами', function () {
  it('возможен просмотр package.json', async function() {
    await this.browser.url('/branches/master/tree');
    await this.browser.click('a[href="/branches/master/tree/package.json"]');

    const packageJson = JSON.parse(await this.browser.getText('pre'));

    expect(packageJson.name).to.equal('04-nodejs');
  });
  it('возможно скачивание Dockerfile', async function() {
    await this.browser.url('/branches/master/tree');
    await this.browser.click('a[href="/branches/master/tree/Dockerfile"]');
    
    const filePath = path.join(process.env.HOME, 'downloads', 'Dockerfile');
    const fileExists = await existsAsync(filePath);
    
    expect(fileExists).to.equal(true);
  });
});