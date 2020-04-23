'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LinksSchema extends Schema {
  up() {
    this.create('links', (table) => {
      table.increments();
      table.integer('post_id').unsigned().references('id').inTable('posts').unique();
      table.string('url');
      table.string('title').collate('utf8mb4_unicode_ci');
      table.text('desc').collate('utf8mb4_unicode_ci');
      table.string('thumbnail').collate('utf8mb4_unicode_ci');
      // table.timestamps();
    });
  }

  down() {
    this.drop('links');
  }
}

module.exports = LinksSchema;
