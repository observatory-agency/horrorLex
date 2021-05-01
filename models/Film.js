const BaseModel = require('./Base');
const { films } = require('../constants/collections');

class FilmModel extends BaseModel {
  constructor() {
    super(films.name);
  }
}

module.exports = FilmModel;
