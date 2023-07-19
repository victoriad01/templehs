/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('personnel', function (table) {
    table.increments('personnel_id')
    table.string('personnel_fullname', 255).notNullable()
    table.string('personnel_email', 255).notNullable().unique()
    table.string('personnel_description', 550).notNullable()
    table.string('personnel_jobtype', 255).notNullable()
    table.string('personnel_position', 105).notNullable()
    table.string('personnel_visit_type ', 105).notNullable()
    table.string('personnel_image').notNullable()
    table.timestamps(true, true)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('personnel')
}
