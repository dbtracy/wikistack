const express = require('express')
const morgan = require('morgan')
const layout = require('../views/layout')
const { db, Page, User } = require('../models')
const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')

db.authenticate()
  .then(() => {
    console.log('connected to the database')
  })

const app = express()

app.use(morgan('combined'))

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

app.use('/wiki', wikiRouter.router)
// app.use('/user', userRouter)

app.get('/', (req, res) => {
  res.send(layout())
})

const init = async () => {
  await db.sync({ force: true })

  app.listen(3000, () => {
    console.log('listening on port 3000')
  })
}

init()
