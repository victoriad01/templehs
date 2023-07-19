/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('availability', function (table) {
    table.increments('availability_id')
    table.jsonb('ava_time').notNullable()
    table.timestamps(true, true)
    table
      .integer('personnel_id')
      .references('personnel_id')
      .inTable('personnel')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('availability')
}
