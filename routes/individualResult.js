const express = require('express');
const { getAll } = require('../controllers/books');

const router = express.Router();
router.get('/', getAll);

module.exports = router;
