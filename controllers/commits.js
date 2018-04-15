const createError = require('http-errors')

const git = require('../git');

const commonGuard = (req, res, next) => {
  git.getLog(req.branch)
    .then(commits => {
      req.commits = commits;
      next();
    })
    .catch(err => next(createError(500, err)))
};

const renderIndex = (req, res) => {
  const commits = req.commits.map(commit => ({
    hash: commit.hash,
    subject: commit.subject,
    url: req.getChildUrl(commit.hash)
  }));
  const title = req.branch ?
    `Branch '${req.branch}' commits` :
    'commits';
  res.render('commits.hbs', {
    title,
    commits,
    parentUrl: req.getParentUrl()
  });
};

const index = [
  commonGuard,
  renderIndex
];

module.exports = {
  index
};