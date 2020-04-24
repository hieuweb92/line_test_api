'use strict';

const Model = use('Model');

class Video extends Model {

  static get Serializer() {
    return use('App/Models/Serializers/JsonSerializer');
  }

  static get table() {
    return 'videos';
  }

  static get hidden() {
    return ['post_id']
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

module.exports = Video;
