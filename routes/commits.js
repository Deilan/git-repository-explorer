const {
  Router
} = require('express');

const commitsController = require('../controllers/commits.js');
const treeController = require('../controllers/tree.js');

const router = Router();

router.get('/', commitsController.index);
router.get(['/:treeIsh', '/:treeIsh/:path(*)'], treeController.index);

module.exports = router;