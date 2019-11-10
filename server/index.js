const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan('combined'))

app.use(express.static)

app.use(express.urlencoded)

app.listen(1337 => {
  console.log('listening on port 1337')
})

app.get('/', (req, res) => {
  res.send('Hello World')
})
