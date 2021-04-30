const BaseModel = require('./Base');
const { publications } = require('../constants/collections');

class PublicationModel extends BaseModel {
  constructor() {
    super(publications.name);
  }
}

module.exports = PublicationModel;
