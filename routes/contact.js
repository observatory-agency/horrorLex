const express = require('express');
const { getAll } = require('../controllers/books');

const router = express.Router();

router.get('/', (req, res) => res.render('contact.hbs'));

module.exports = router;
