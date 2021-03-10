const express = require('express');
const { getOne } = require('../controllers/books');

const router = express.Router();
router.get('/:book', async (req, res, next) => {
  try {
    const {
      app: { locals: { books } },
      params: { book },
    } = req;
    const result = getOne(books, { book })
    return result ? res.render('book', { result }) : res.sendStatus(404);
  } catch(error) {
    return next(error);
  } 
});

module.exports = router;
