const git = require('./git');

git.getBranchList().then((x) => {
  debugger;
  console.log(x);
}).catch(err => {
  debugger;
  console.log(err);
});

