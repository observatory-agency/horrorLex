const express = require('express');
const { BlogPostController } = require('../controllers');

const router = express.Router();
const controller = new BlogPostController();

router.get('/', controller.get);

module.exports = router;
