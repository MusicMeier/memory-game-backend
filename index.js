const express = require('express')
const app = express()

const knex = require('knex')
const config = require('./knexfile').development
const database = knex(config)
const cors = require('cors')

const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv').config()
app.use(bodyParser.json())
app.use(cors())


const { Model } = require('objection')
Model.knex(database)

class User extends Model {
    static tableName = 'users'
}

class Note extends Model {
    static tableName = 'note'
}

app.get('/notes', (request, response) => {
  Note.query()
    .then(notes => {
      response.json(notes)
    })
})

app.get('/users', (request, response) => {
  User.query()
    .then(users => {
      response.json(users)
    })
    .catch( error => {
      console.log(error.message)
    })
})

app.post('/users', (request, response) => {
  const users  = request.body
  console.log(users)
  bcrypt.hash(users.password, 12)
    .then(hashedPassword => {
      return database('users')
        .insert({
          id: users.id,
          username: users.username,
          firstName: users.firstName,
          lastName: users.lastName,
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
  const users  = request.body
  console.log(users)

  database('users')
    .select()
    .where({ 
      username: users.username 
    })
    .first()
    .then(retrievedUser => {
      console.log(retrievedUser)
      if (!retrievedUser.id) throw new Error('user does not exist')

      return Promise.all([
        bcrypt.compare(users.password, retrievedUser.password_hash),
        Promise.resolve(retrievedUser)
      ])
    }).then(results => {
        const arePasswordsTheSame = results[0]
        const user = results[1]

      if (!arePasswordsTheSame) throw new Error('password incorrect')

      const payload = {username: users.username}
      const secret = process.env.SECRET

      let token = jwt.sign(payload, secret)
      console.log(token)

      response.json({users, token})
    }).catch(error => {
      response.json({ error: error.message})
    })
})

app.get("/secret-route", authenticate, (request, response) => {
  response.json({ message: `${request.users.username} found me lucky charms!`})
})

function authenticate(request, response, next){ 
  const authHeader = request.get("Authorization")
  const token = authHeader.split(' ')[1]

  const secret = "QUIET!"
  jwt.compare(token, secret, (error, payload) => {
      if (error) response.json({error: error.message})
    database(users)
      .select()
      .where({username: users.username})
      .first()
      .then(users => {
        request.users = users
        next()
      }).catch(error => {
        response.json({error: error.message})
      })
  })
}

app.listen(7001)