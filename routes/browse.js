const express = require('express');
const { browse, getMany } = require('../controllers/books');

const router = express.Router();

router.get('/:letter', async (req, res, next) => {
  try {
    const {
      app: { locals: { books } },
      params: { letter },
    } = req;
    if (!(/[a-zA-Z]/).test(letter) && !letter.length === 1) {
      return res.sendStatus(400);
    }
    results = await browse(books, { letter })
    res.render('browse.hbs', results);
  } catch (error) {
    return next(error);
  }
});

router.post('/', async(req, res, next) => {
  try {
    const {
      app: { locals: { books } },
      body: { documents },
    } = req;
    const results = await getMany(books, { documents })
    res.json({ books: results });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
