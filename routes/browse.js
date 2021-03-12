const express = require('express');
const { BrowseController } = require('../controllers');

const router = express.Router();
const controller = new BrowseController();

router.get('/:char', controller.get);
router.post('/', controller.post);

module.exports = router;
