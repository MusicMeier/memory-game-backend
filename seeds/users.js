exports.seed = async knex => {
  await knex('user').del()
  await knex('user').insert([{
    username: 'musicmeier',
    firstName: "Music",
    lastName: "Meier",
    password_hash: ""
  }])
};