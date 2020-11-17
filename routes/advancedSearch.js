const express = require('express');
const { advancedSearch } = require('../controllers/books');

const router = express.Router();
router.get('/', (req, res) => res.render('advancedSearch.hbs'));
router.post('/', advancedSearch);

module.exports = router;
