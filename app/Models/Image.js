'use strict';

const Model = use('Model');

class Image extends Model {

  static get Serializer() {
    return use('App/Models/Serializers/JsonSerializer');
  }

  static get table() {
    return 'images';
  }

  static get hidden() {
    return ['post_id'];
  }

  static get createdAtColumn() {
    return false;
  }

  static get updatedAtColumn() {
    return false;
  }

  post() {
    return this.belongsTo('App/Models/Post');
  }

}

module.exports = Image;
