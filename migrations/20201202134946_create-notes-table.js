
exports.up = function(knex) {
  return knex.schema.createTable('note', table => {
    table.integer('id')
    table.string('name')
    table.string('image')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('note')
};
