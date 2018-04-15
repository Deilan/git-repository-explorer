const { basename } = require('path');
const createError = require('http-errors')

const git = require('../git');

const commonGuard = (req, res, next) => {
  const treeIsh = req.params.treeIsh || req.params.branch;
  git.getObjectType(treeIsh)
    .then(type => {
      if(type !== 'commit') {
        next(createError(404, `Commit '${treeIsh}' not found`));
      }
      req.treeIsh = treeIsh;
      next();
    })
    .catch(() => next(createError(404, `Commit '${treeIsh}' not found`)));
};

const treeContents = (req, res, next) => {
  req.treePath = req.params.path || '';
  git.getTreeContents(req.treeIsh, req.treePath)
    .then(treeEntries => {
      // if nothing found
      if(treeEntries.length === 0) {
        next(createError(404, `Path '${req.treePath}' not found in commit '${req.treeIsh}'`));
        return;
      }
      // if root contents requested
      if(!req.treePath) {
        req.tree = mapTreeEntries(treeEntries, req);
        next();
        return;
      }
      // if a particular file requested
      if(
        treeEntries.length === 1 &&
        treeEntries[0].type === 'blob' &&
        treeEntries[0].file === basename(req.treePath)
      ) {
        req.blob = treeEntries[0];
        next();
        return;
      }
      // if a particular directory contents requested
      return git.getTreeContents(req.treeIsh, `${req.treePath}/`)
          .then(treeEntries => {
              req.tree = mapTreeEntries(treeEntries, req);
              next();
          });
    })
    .catch(err => next(createError(404, err)));
};

const sendBlobOrTree = (req, res, next) => {
  if(req.blob) {
    res.contentType(req.blob.file);
    git.getBlobStream(req.blob.object).pipe(res);
    return;
  }
  if(req.tree) {
    const title = req.treePath !== '' ?
      `/${req.treePath}/` :
      '/';
    res.render('tree.hbs', {
      title,
      parentUrl: req.getParentUrl(),
      directories: req.tree.filter(item => item.type === 'tree'),
      files: req.tree.filter(item => item.type === 'blob')
    });
    return;
  }
  next(500, 'Unhandled case, please report to the developer');
};

const index = [
  commonGuard,
  treeContents,
  sendBlobOrTree
];

function mapTreeEntries(treeEntries, req) {
  return treeEntries.map(treeEntry => ({
    ...treeEntry,
    url: req.getChildUrl(treeEntry.file)
  }));
}

module.exports = {
  index
};