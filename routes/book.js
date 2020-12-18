const express = require('express');
const { getOne } = require('../controllers/books');

const router = express.Router();
router.get('/:book', getOne);

module.exports = router;
