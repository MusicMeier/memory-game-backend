const express = require('express')
const app = express()

const knex = require('knex')
const config = ('./knexfile').development
const database = knex(config)

app.post('/users', (request, response) => {
  response.json({user: {id: 1}})
})

app.listen(7001)