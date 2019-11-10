const Sequelize = require('sequelize')
const db = new Sequelize('wikistack', 'danieltracy', 'password', { dialect: 'postgres' })
// const db = new Sequelize('postgres://localhost:5432/wikistack')

module.exports = {
  db
}
