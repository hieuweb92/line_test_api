'use strict';

const Model = use('Model');

class Video extends Model {

  static get Serializer() {
    return use('App/Models/Serializers/JsonSerializer');
  }

  static get table() {
    return 'videos';
  }

  post() {
    return this.belongsTo('App/Models/Post');
  }
}

module.exports = Video;
