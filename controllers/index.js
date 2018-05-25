const createError = require('http-errors');

const git = require('../git');

const index = (req, res, next) => {
  git.getRepositoryName()
    .then(repository => {
      res.render('index.hbs', {
        title: `Repository ${repository || ''}`.trimRight(),
        branchesUrl: req.getChildUrl('branches'),
        commitsUrl: req.getChildUrl('commits')
      });
    })
    .catch(err => next(createError(500, err)));
}

module.exports = {
  index,
};
