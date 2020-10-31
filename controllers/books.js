async function getAll(req, res, next) {
  try {
    const { app: { locals: { books } } } = req;
    const allDocuments = await books.find().toArray();
    // const document = documents[Math.floor(Math.random() * documents.length - 1)];
    const documents = allDocuments.slice(0, 10);
    return documents ? res.render('results', { documents }) : res.sendStatus(500);
  } catch (error) {
    return next(error);
  }
}

async function getOne(req, res, next) {
  try {
    const { app: { locals: { books } } } = req;
    const documents = await books.find().toArray();
    const document = documents[Math.floor(Math.random() * documents.length - 1)];
    return document ? res.render('individualResult', { document }) : res.sendStatus(500);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getAll,
  getOne,
};
