const {
  Router
} = require('express');

const git = require('../git');

const router = Router();

function deconstructSegments(segmentsString) {
  const [branch, ...pathParts] = segmentsString.split('/');
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

router.get('/:segments(*)', (req, res) => {
  const {
    branch,
    path
  } = deconstructSegments(req.params.segments);
  git.getBranchList()
    .then((branches) => {
      if (!branches.includes(branch)) {
        return res.status(404).render('error.hbs', {
          status: 404,
          message: `Branch '${branch}' was not found`
        });
      }
      return git.getTreeContents(branch, path)
        .then(entries => {
          if(entries.length === 0) {
            return res.status(404).render('error.hbs', {
              status: 404,
              message: `Branch '${branch}' with path '${path}' were not found`
            });
          }
          return res.render('tree-contents.hbs', {
            directories: entries.filter(item => item.type === 'tree'),
            files: entries.filter(item => item.type === 'blob')
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