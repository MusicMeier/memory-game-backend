
exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('username')
    table.string('firstName')
    table.string('lastName')
    table.string('password_hash')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
