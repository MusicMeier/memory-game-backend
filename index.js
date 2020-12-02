const express = require('express')
const app = express()

const knex = require('knex')
const config = require('./knexfile').development
const database = knex(config)

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.post('/users', (request, response) => {

  const { user } = request.body

  database('user')
    .insert({
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      password_hash: user.password
    })
    .returning('*')
    .then( users => {
      const user = user[0]

      response.json({user: {id: 1}})
    }).catch(error => {
      response.json({ error: error.message})
    })
})

app.listen(7001)