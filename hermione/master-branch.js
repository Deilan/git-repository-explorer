const { expect } = require('chai');

describe('У ветки master', function () {
  it('в дереве отображаются правильные файлы и папки', async function() {
    await this.browser.url('/');
    await this.browser.click('a[href="/branches"]');
    await this.browser.click('a[href="/branches/master"]');
    await this.browser.click('a[href="/branches/master/tree"]');

    const [dockerfileIsExisting, hermioneDirIsExisting] =
      await Promise.all([
        this.browser.isExisting('a[href="/branches/master/tree/Dockerfile"]'),
        this.browser.isExisting('a[href="/branches/master/tree/hermione"]')
      ]);

    expect(dockerfileIsExisting).to.equals(true);
    expect(hermioneDirIsExisting).to.equals(true);
  });
  it('в истории отображаются правильные коммиты', async function() {
    await this.browser.url('/');
    await this.browser.click('a[href="/branches"]');
    await this.browser.click('a[href="/branches/master"]');
    await this.browser.click('a[href="/branches/master/commits"]');

    const [latestCommitIsExisting, firstCommitIsExisting] =
      await Promise.all([
        this.browser.isExisting('a[href="/branches/master/commits/e41b3f3c10a73dbac84a5623e40922a43d850ffe"]'),
        this.browser.isExisting('a[href="/branches/master/commits/a0cb41669721feab33b47bd3cb8c04714f4666e6"]')
      ]);

    expect(latestCommitIsExisting).to.equals(true);
    expect(firstCommitIsExisting).to.equals(true);
  });
});