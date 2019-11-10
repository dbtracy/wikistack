const express = require('express')
const morgan = require('morgan')
const layout = require('../views/layout')
const { db } = require('../models')

db.authenticate()
  .then(() => {
    console.log('connected to the database')
  })

const app = express()

app.use(morgan('combined'))

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

app.listen(3000, () => {
  console.log('listening on port 3000')
})

app.get('/', (req, res) => {
  res.send(layout())
})
