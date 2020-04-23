'use strict';

const Model = use('Model');

class Link extends Model {

  static get Serializer() {
    return use('App/Models/Serializers/JsonSerializer');
  }

  static get table() {
    return 'links';
  }

  static get hidden() {
    return ['post_id']
  }

  post() {
    return this.belongsTo('App/Models/Post');
  }
}

module.exports = Link;
