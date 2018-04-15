const { Router } = require('express');

const router = Router();

const git = require('../git');

router.get('/', (req, res) => {
  git.getRepositoryName()
    .then(repository => {
      res.render('index.hbs', {
        title: `Repository ${repository}`,
        branchesUrl: req.getChildUrl('branches'),
        commitsUrl: req.getChildUrl('commits')
      });
    })
    .catch(err => next(createError(500, err)));
});

module.exports = router;