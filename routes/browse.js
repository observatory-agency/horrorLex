const express = require('express');
const { browse, getMany } = require('../controllers/books');

const router = express.Router();
router.get('/:letter', browse);
router.post('/', getMany);

module.exports = router;
