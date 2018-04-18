const { expect } = require('chai');

describe('На странице веток', function () {
  it('отображаются ветки master и dev', async function () {
    await this.browser.url('/branches');
    const [masterBranchLinkIsExisting, devBranchLinkIsExisting] =
      await Promise.all([
        this.browser.isExisting('a[href="/branches/master"]'),
        this.browser.isExisting('a[href="/branches/dev"]')
      ]);
    expect(masterBranchLinkIsExisting).to.equals(true);
    expect(devBranchLinkIsExisting).to.equals(true);
  });
});