const express = require('express');
const { quickSearch } = require('../controllers/books');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { app: { locals: { books } }, query } = req;
    const results = await quickSearch(books, { query });
    return results ? res.render('results', results) : res.sendStatus(400);
  } catch(error) {
    return next(error);
  }
});

module.exports = router;
