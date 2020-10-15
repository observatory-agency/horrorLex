async function getAll(req, res, next) {
  try {
    const { app: { locals: { articles } } } = req;
    const documents = await articles.find().toArray();
    return documents ? res.render('home', {
      data: { articles: documents },
    }) : res.sendStatus(500);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAll,
};
