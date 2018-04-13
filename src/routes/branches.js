const {
  Router
} = require('express');

const url = require('url');
const urlUtils = require('../url-utils');
const { removeTrailingSlash } = require('../string-utils');

const git = require('../git');

const router = Router();

function deconstructPath(path) {
  if (!path) {
    throw new Error(`Missing required parameter 'path'`);
  }
  path = removeTrailingSlash(path);
  const [branch, ...pathParts] = path.split('/');
  const objectPath = pathParts.join('/');
  return {
    branch,
    path: objectPath
  };
}

router.get('/', (req, res) => {
  git.getBranchList()
    .then(branchNames => {
      const branches = branchNames.map(branchName => ({
        name: branchName,
        url: urlUtils.join(req.originalUrl, branchName)
      }));
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
        .then(entries => {
          if (entries.length === 0) {
            return res.status(404).render('error.hbs', {
              status: 404,
              message: `Branch '${branch}' with path '${path}' were not found`
            });
          }
          if(entries.length === 1 && entries[0].type === 'blob') {
            res.contentType(entries[0].file);
            return git.getBlobStream(entries[0].object).pipe(res);
          }
          return git.getTreeContents(branch, path && `${path}/`)
            .then((entries) => {
              entries = entries.map(entry => ({
                ...entry,
                url: urlUtils.join(req.originalUrl, entry.file)
              }));
              return res.render('tree-contents.hbs', {
                parentUrl: urlUtils.getParentUrl(req.originalUrl),
                directories: entries.filter(item => item.type === 'tree'),
                files: entries.filter(item => item.type === 'blob')
              });
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