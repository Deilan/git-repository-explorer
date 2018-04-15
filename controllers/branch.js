const createError = require('http-errors');

const git = require('../git');

const commonGuard = (req, res, next) => {
  git.getBranches()
    .then(branches => {
      req.branches = branches;
      next();
    })
    .catch(err => next(createError(500, err)));
};

const index = (req, res) => {
  const branches = req.branches.map(branch => ({
    name: branch,
    url: req.getChildUrl(branch)
  }));
  res.render('branch-list.hbs', {
    title: 'Branches list',
    parentUrl: req.getParentUrl(),
    branches
  });
};

const detailsGuard = (req, res, next) => {
  const { branch } = req.params;
  if (!req.branches.includes(branch)) {
    next(createError(404, `Branch '${branch}' not found`));
    return;
  }
  req.branch = branch;
  next();
};

const details = (req, res) => {
    res.render('branch-details.hbs', {
      title: `Branch '${req.branch}'`,
      parentUrl: req.getParentUrl(),
      treeUrl: req.getChildUrl('tree'),
      commitsUrl: req.getChildUrl('commits'),
    });
  };

module.exports = {
  commonGuard,
  index,
  detailsGuard,
  details
};