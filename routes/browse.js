const express = require('express');
const { quickSearch } = require('../controllers/books');

const router = express.Router();
router.get('/', quickSearch);

module.exports = router;
