const express = require('express');
const { BrowseController } = require('../controllers');

const router = express.Router();
const controller = new BrowseController();

router.get('/:view/:char?', controller.get);

module.exports = router;
