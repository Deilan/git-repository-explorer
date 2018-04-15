const {
  Router
} = require('express');

const treeController = require('../controllers/tree');

const router = Router();

router.get(['/:treeIsh', '/:treeIsh/:path(*)'], treeController.index);

module.exports = router;