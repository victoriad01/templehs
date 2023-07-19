/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('appointment', function (table) {
    table.increments('appointment_id')
    table.integer('availability_id').notNullable()
    table.integer('patient_id').notNullable()
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
  return knex.schema.dropTable('appointment')
}
