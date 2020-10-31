const express = require('express');
const { getOne } = require('../controllers/books');

const router = express.Router();
router.get('/', getOne);

module.exports = router;
