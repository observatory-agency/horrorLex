const express = require('express');
const { BlogController } = require('../controllers');

const router = express.Router();
const controller = new BlogController();

router.get('/', controller.get);

module.exports = router;
