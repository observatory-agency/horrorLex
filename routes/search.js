const express = require('express');
const { advancedSearch } = require('../controllers/books');

const router = express.Router();
router.get('/', (req, res) => res.render('search.hbs'));
router.post('/', advancedSearch);

module.exports = router;
