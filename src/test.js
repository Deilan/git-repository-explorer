const git = require('./git');

git.getBranches().then((x) => {
  debugger;
  console.log(x);
}).catch(err => {
  debugger;
  console.log(err);
});

