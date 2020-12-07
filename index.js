const express = require('express')
const app = express()

const knex = require('knex')
const config = require('./knexfile').development
const database = knex(config)
const cors = require('cors')

const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(bodyParser.json())
app.use(cors())

const { Model } = require('objection')
Model.knex(database)

class Note extends Model {
    static tableName = 'note'
}

app.get('/notes', (request, response) => {
  Note.query()
    .then(notes => {
      response.json(notes)
    })
})

app.post('/users', (request, response) => {
  const { user } = request.body
  bcrypt.hash(user.password, 12)
    .then(hashedPassword => {
      return database('user')
        .insert({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          password_hash: hashedPassword
        }).returning('*')
    }).then(users => {
      const user = users[0]

      response.json({user})
    }).catch(error => {
      response.json({ error: error.message})
    })
})

app.post('/login', (request, response) => {
  const { user } = request.body

  database('user')
    .select()
    .where({ 
      username: user.username 
    })
    .first()
    .then(retrievedUser => {
      if (!retrievedUser.id) throw new Error('user does not exist')

      return Promise.all([
        bcrypt.compare(user.password, retrievedUser.password_hash),
        Promise.resolve(retrievedUser)
      ])
    }).then(results => {
        const arePasswordsTheSame = results[0]
        const user = results[1]

      if (!arePasswordsTheSame) throw new Error('password incorrect')

      const payload = {username: user.username}
      const secret = "QUIET!"

      jwt.sign(payload, secret, (error, token) => {
        if (error) throw new Error("Signing in didn't work")

        response.json({ token })
      })

      response.json({user})
    }).catch(error => {
      response.json({ error: error.message})
    })
})

app.get("/secret-route", authenticate, (request, response) => {
  response.json({ message: `${request.user.username} found me lucky charms!`})
})

function authenticate(request, response, next){ 
  const authHeader = request.get("Authorization")
  const token = authHeader.split(' ')[1]

  const secret = "QUIET!"
  jwt.compare(token, secret, (error, payload) => {
      if (error) response.json({error: error.message})
    database(user)
      .select()
      .where({usename: user.username})
      .first()
      .then(user => {
        request.user = user
        next()
      }).catch(error => {
        response.json({error: error.message})
      })
  })
}

app.listen(7001)