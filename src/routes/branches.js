const {
  Router
} = require('express');

const url = require('url');
const urlUtils = require('../url-utils');
const {
  removeLeadingSlash,
  removeTrailingSlash
} = require('../utils/string');

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
  git.getBranches()
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

router.get('/:branchName', (req, res) => {
  const branchName = req.params.branchName;
  git.getBranches()
    .then((branches) => {
      if (!branches.includes(branchName)) {
        return res.status(404).render('error.hbs', {
          status: 404,
          message: `Branch '${branchName}' was not found`
        });
      }
      return res.render('branch.hbs', {
        branchName,
        parentUrl: urlUtils.getParentUrl(req.originalUrl),
        treeUrl: urlUtils.join(req.originalUrl, 'tree'),
        commitsUrl: urlUtils.join(req.originalUrl, 'commits')
      });
    })
    .catch(err => {
      return res.status(500).render('error.hbs', {
        status: 500,
        message: err
      });
    });
});

router.get('/:branchName/commits', (req, res) => {
  const branchName = req.params.branchName;
  git.getCommits(branchName)
    .then(commits => {
      commits = commits.map(commit => ({
        ...commit,
        url: urlUtils.join(req.originalUrl, commit.hash)
      }));
      return res.render('commits.hbs', {
        commits,
        parentUrl: urlUtils.getParentUrl(req.originalUrl)
      });
    })
});

router.get('/:branchName/commits/:commitHash', (req, res) => {
  const {
    branchName,
    commitHash
  } = req.params;
  const path = ''; //removeLeadingSlash(req.params.path);
  return git.getTreeContents()
    .then(entries => {
      entries = entries.map(entry => ({
        ...entry,
        url: urlUtils.join(req.originalUrl, entry.file)
      }));
      return res.render('tree-contents.hbs', {
        path: `/${path}`,
        parentUrl: urlUtils.getParentUrl(req.originalUrl),
        directories: entries.filter(item => item.type === 'tree'),
        files: entries.filter(item => item.type === 'blob')
      });
    });
});

router.get('/:branchName/commits/:commitHash/:path(*)', (req, res) => {
  const {
    branchName,
    commitHash
  } = req.params;
  const path = removeLeadingSlash(req.params.path);
  return git.getTreeContents(commitHash, path)
    .then(entries => {
      if (entries.length === 1 && entries[0].type === 'blob') {
        res.contentType(entries[0].file);
        return git.getBlobStream(entries[0].object).pipe(res);
      }
      return git.getTreeContents(branchName, path && `${path}/`)
        .then((entries) => {
          entries = entries.map(entry => ({
            ...entry,
            url: urlUtils.join(req.originalUrl, entry.file)
          }));
          return res.render('tree-contents.hbs', {
            path: `/${path}`,
            parentUrl: urlUtils.getParentUrl(req.originalUrl),
            directories: entries.filter(item => item.type === 'tree'),
            files: entries.filter(item => item.type === 'blob')
          });
        });
    });
});

router.get('/:branchName/tree:path(*)', (req, res) => {
  const branchName = req.params.branchName;
  const path = removeLeadingSlash(req.params.path);
  return git.getTreeContents(branchName, path)
    .then(entries => {
      if (entries.length === 0) {
        return res.status(404).render('error.hbs', {
          status: 404,
          message: `Branch '${branchName}' with path '${path}' were not found`
        });
      }
      if (entries.length === 1 && entries[0].type === 'blob') {
        res.contentType(entries[0].file);
        return git.getBlobStream(entries[0].object).pipe(res);
      }
      return git.getTreeContents(branchName, path && `${path}/`)
        .then((entries) => {
          entries = entries.map(entry => ({
            ...entry,
            url: urlUtils.join(req.originalUrl, entry.file)
          }));
          return res.render('tree-contents.hbs', {
            path: `/${path}`,
            parentUrl: urlUtils.getParentUrl(req.originalUrl),
            directories: entries.filter(item => item.type === 'tree'),
            files: entries.filter(item => item.type === 'blob')
          });
        });
    });
});

// router.get('/:branchName/:path(*)', (req, res) => {
//   const branchName = req.params.branchName;
//   const path = req.params.path;
//   git.getBranches()
//     .then((branches) => {
//       if (!branches.includes(branchName)) {
//         return res.status(404).render('error.hbs', {
//           status: 404,
//           message: `Branch '${branchName}' was not found`
//         });
//       }
//       return git.getTreeContents(branchName, path)
//         .then(entries => {
//           if (entries.length === 0) {
//             return res.status(404).render('error.hbs', {
//               status: 404,
//               message: `Branch '${branchName}' with path '${path}' were not found`
//             });
//           }
//           if(entries.length === 1 && entries[0].type === 'blob') {
//             res.contentType(entries[0].file);
//             return git.getBlobStream(entries[0].object).pipe(res);
//           }
//           return git.getTreeContents(branchName, path && `${path}/`)
//             .then((entries) => {
//               entries = entries.map(entry => ({
//                 ...entry,
//                 url: urlUtils.join(req.originalUrl, entry.file)
//               }));
//               return res.render('tree-contents.hbs', {
//                 parentUrl: urlUtils.getParentUrl(req.originalUrl),
//                 directories: entries.filter(item => item.type === 'tree'),
//                 files: entries.filter(item => item.type === 'blob')
//               });
//             });
//         })
//     })
//     .catch(err => {
//       return res.status(500).render('error.hbs', {
//         status: 500,
//         message: err
//       });
//     });
// })

module.exports = router;