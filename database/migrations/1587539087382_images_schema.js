'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ImagesSchema extends Schema {
  up() {
    this.create('images', (table) => {
      table.increments();
      table.integer('post_id').unsigned().references('id').inTable('posts');
      table.string('thumb').notNullable();
      table.string('original').notNullable();
      table.integer('width');
      table.integer('height');
      // table.timestamps();
    });
  }

  down() {
    this.drop('images');
  }
}

module.exports = ImagesSchema;
