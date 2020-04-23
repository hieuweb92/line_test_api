'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PostsSchema extends Schema {
  up() {
    this.create('posts', (table) => {
      table.increments();
      table.string('type', 100).notNullable();
      table.string('status', 100).notNullable();
      table.bigInteger('scheduled_time');
      table.bigInteger('created_at');
      table.bigInteger('updated_at');
      // table.timestamps();
    });
  }

  down() {
    this.drop('posts');
  }
}

module.exports = PostsSchema;
