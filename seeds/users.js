exports.seed = async knex => {
  await knex('user').del()
  await knex('user').insert([{
    id: 1,
    username: 'musicmeier',
    firstName: "Music",
    lastName: "Meier",
    password_hash: ""
  }])
};