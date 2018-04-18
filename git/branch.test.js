const {
  getBranches
} = require('./branch');

const chai = require('chai');
const expect = chai.expect;

describe('getBranches', function () {
  it('содержит [\'master\', \'dev\']', async function () {
    const branches = await getBranches();
    expect(branches).to.include('master');
    expect(branches).to.include('dev');
  });
});