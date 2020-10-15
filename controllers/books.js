async function getAll(req, res, next) {
  try {
    const { app: { locals: { books } } } = req;
    const documents = await books.find().toArray();
    return documents ? res.render('home', {
      data: { books: documents },
    }) : res.sendStatus(500);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAll,
};
