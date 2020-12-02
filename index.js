const express = require('express')
const app = express()

app.post('/users', (request, response) => {
  response.json({user: {id: 1}})
})

app.listen(7001)