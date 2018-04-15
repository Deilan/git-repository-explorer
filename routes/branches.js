const {
  Router
} = require('express');

const branchController = require('../controllers/branch.js');
const commitsController = require('../controllers/commits.js');
const treeController = require('../controllers/tree.js');

const router = Router();

router.use(branchController.commonGuard);
router.get('/', branchController.index);

router.use('/:branch', branchController.detailsGuard);
router.get('/:branch', branchController.details);

router.get('/:branch/commits', commitsController.index);

router.get([
  '/:branch/tree',
  '/:branch/tree/:path(*)',
  '/:branch/commits/:treeIsh',
  '/:branch/commits/:treeIsh/:path(*)'
], treeController.index);

module.exports = router;