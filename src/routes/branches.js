const {
  Router
} = require('express');

const git = require('../git');

const router = Router();

function deconstructPath(rawPath) {
  const [branch, ...pathParts] = rawPath.split('/');
  const path = pathParts.map(part => `${part}/`).join('');
  return { branch, path };
}

router.get('/', (req, res) => {
  git.getBranchList()
    .then(branches => {
      res.render('branches.hbs', {
        branches
      });
    })
    .catch(err => {
      return res.status(500).render('error.hbs', {
        status: 500,
        message: err
      });
    });
});

router.get('/:path(*)', (req, res) => {
  const {
    branch,
    path
  } = deconstructPath(req.params.path);
  git.getBranchList()
    .then((branches) => {
      if (!branches.includes(branch)) {
        return res.status(404).render('error.hbs', {
          status: 404,
          message: `Branch '${branch}' was not found`
        });
      }
      return git.getTreeContents(branch, path)
        .then(list => {
          if(list.length === 0) {
            return res.status(404).render('error.hbs', {
              status: 404,
              message: `Branch '${branch}' with path '${path}' were not found`
            });
          }
          return res.render('tree-contents.hbs', {
            directories: list.filter(item => item.type === 'tree'),
            files: list.filter(item => item.type === 'blob')
          });
        })
    })
    .catch(err => {
      return res.status(500).render('error.hbs', {
        status: 500,
        message: err
      });
    });
})

module.exports = router;