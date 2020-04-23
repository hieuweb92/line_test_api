'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SurveysSchema extends Schema {
  up() {
    this.create('surveys', (table) => {
      table.increments();
      table.integer('post_id').unsigned().references('id').inTable('posts').unique();
      table.bigInteger('start_date');
      table.bigInteger('end_date');
      table.string('status', 100);
      table.string('title').collate('utf8mb4_unicode_ci');
      table.string('thumbnail');
      // table.timestamps()
    });
  }

  down() {
    this.drop('surveys');
  }
}

module.exports = SurveysSchema;
