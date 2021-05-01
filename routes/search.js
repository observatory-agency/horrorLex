const express = require('express');
const { SearchController } = require('../controllers');

const router = express.Router();
const controller = new SearchController();

router.get('/', controller.get);

module.exports = router;
