const {
  getParentUrl
} = require('./url');

const chai = require('chai');

describe('getParentUrl', function () {
  it('для /foo/bar возвращает /foo', function () {
    const result = getParentUrl('/foo/bar');
    chai.expect(result).to.equal('/foo');
  });
  it('для /foo/bar/ возвращает /foo', function () {
    const result = getParentUrl('/foo/bar/');
    chai.expect(result).to.equal('/foo');
  });
  it('для /foo возвращает \'\'', function () {
    const result = getParentUrl('/foo');
    chai.expect(result).to.equal('');
  });
  it('для /foo/ возвращает \'\'', function () {
    const result = getParentUrl('/foo/');
    chai.expect(result).to.equal('');
  });
});