const express = require('express');
const { ContactController } = require('../controllers');

const router = express.Router();
const controller = new ContactController();

router.get('/', controller.get);

module.exports = router;
