const BaseModel = require('./Base');
const { categories } = require('../constants/collections');

class FilmModel extends BaseModel {
  constructor() {
    super(categories.name);
  }
}

module.exports = FilmModel;
