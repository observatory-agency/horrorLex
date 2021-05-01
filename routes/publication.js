const express = require('express');
const { PublicationController } = require('../controllers');

const router = express.Router();
const controller = new PublicationController();

router.get('/:slug', controller.get);

module.exports = router;
