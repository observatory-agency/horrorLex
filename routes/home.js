const express = require('express');
const { HomeController } = require('../controllers');

const router = express.Router();
const controller = new HomeController();

router.get('/', controller.get);

module.exports = router;
