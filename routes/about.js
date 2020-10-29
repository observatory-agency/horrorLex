const express = require('express');

const router = express.Router();
router.get('/', (req, res) => res.render('about.hbs'));

module.exports = router;
