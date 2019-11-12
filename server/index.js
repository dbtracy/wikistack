const express = require('express')
const app = express()
const morgan = require('morgan')
const layout = require('../views/layout')
const { main } = require('../views')

const { db, Page, User } = require('../models')
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')

db.authenticate()
  .then(() => {
    console.log('connected to the database')
  })


app.use(morgan('dev'))

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

app.use('/wiki', wikiRouter.router)
app.use('/users', userRouter.router)

app.get('/', (req, res, next) => {
  res.redirect('/wiki')
})

const init = async () => {
  await db.sync()

  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
}

init()
