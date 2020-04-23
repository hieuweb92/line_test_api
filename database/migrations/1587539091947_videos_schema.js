'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VideosSchema extends Schema {
  up() {
    this.create('videos', (table) => {
      table.increments();
      table.integer('post_id').unsigned().references('id').inTable('posts').unique();
      table.string('thumb').notNullable();
      table.string('original').notNullable();
      table.integer('width');
      table.integer('height');
      table.integer('duration');
      // table.timestamps();
    });
  }

  down() {
    this.drop('videos');
  }
}

module.exports = VideosSchema;
