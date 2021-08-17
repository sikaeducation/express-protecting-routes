exports.up = knex => {
  return knex.schema.createTable("user", table => {
    table.string("username")
    table.string("password_hash")
  })
}

exports.down = knex => {
  return knex.schema.dropTableIfExists("user")
}
