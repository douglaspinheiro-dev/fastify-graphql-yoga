exports.up = function (knex) {
  return knex.schema.createTable('usuarios', table => {
    table.increments('usuario').primary()
    table.string('nome')
    table.string('email').unique()
    table.string('senha')
    table.string('telegram')
    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP'))
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    table.timestamp('deleted_at').nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('usuarios')
}
