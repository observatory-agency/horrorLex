const express = require('express');
const { ResultsController } = require('../controllers');

const router = express.Router();
const controller = new ResultsController();

router.get('/', controller.get);

module.exports = router;
