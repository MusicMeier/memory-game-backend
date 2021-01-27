exports.seed = async knex => {
  await knex('users').del()
  await knex('users').insert([{
    username: 'musicmeier',
    firstName: "Music",
    lastName: "Meier",
    password_hash: ""
  }])
};