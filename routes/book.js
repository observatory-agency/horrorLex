const express = require('express');
const { BookController } = require('../controllers');

const router = express.Router();
const controller = new BookController();

router.get('/:slug', controller.get);

module.exports = router;
