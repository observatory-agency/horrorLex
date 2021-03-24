const express = require('express');
const { AboutController } = require('../controllers');

const router = express.Router();
const controller = new AboutController();

router.get('/', controller.get);

module.exports = router;
