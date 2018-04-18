const { expect } = require('chai');

describe('На главной странице', function () {
  it('Отображается заголовок и ссылки на коммиты и ветки', async function () {
    await this.browser.url('/');
    const [{ value: title }, branchesLinkIsExisting, commitsLinkIsExisting] =
      await Promise.all([
        this.browser.title(),
        this.browser.isExisting('a[href="/branches"]'),
        this.browser.isExisting('a[href="/commits"]')
      ]);

    expect(title).to.contains('Repository');
    expect(branchesLinkIsExisting).to.equals(true);
    expect(commitsLinkIsExisting).to.equals(true);
  });
});