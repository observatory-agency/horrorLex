const express = require('express');
const { StoryBlokController } = require('../controllers');

const router = express.Router();
const controller = new StoryBlokController();

router.post('/', controller.post);

module.exports = router;
