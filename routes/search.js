const express = require('express');
const { advancedSearch } = require('../controllers/books');

const router = express.Router();
router.get('/', (req, res) => res.render('search.hbs'));
router.post('/', async (req, res, next) => {
  try {
    const {
      app: { locals: { books } },
      body,
    } = req;
    const results = await advancedSearch(books, { body })
    return res.json(results);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
