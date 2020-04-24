'use strict';

const Model = use('Model');

class Post extends Model {

  static get Serializer() {
    return use('App/Models/Serializers/JsonSerializer');
  }

  static get table() {
    return 'posts';
  }

  static get createdAtColumn() {
    return null;
  }

  static get updatedAtColumn() {
    return null;
  }

  images() {
    return this.hasMany('App/Models/Image');
  }

  video() {
    return this.hasOne('App/Models/Video');
  }

  link() {
    return this.hasOne('App/Models/Link');
  }

  survey() {
    return this.hasOne('App/Models/Survey');
  }
}

module.exports = Post;
