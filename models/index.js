const Sequelize = require('sequelize')
const db = new Sequelize(
  'wikistack',
  'danieltracy',
  'password',
  {
    dialect: 'postgres',
    logging: false
  }
)
// const db = new Sequelize('postgres://localhost:5432/wikistack')

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
})

Page.beforeValidate((instance) => {

  function generateSlug(title) {
    return title.replace(/\s+/g, '_').replace(/\W/g, '')
  }

  instance.slug = generateSlug(instance.title)
})

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
})

module.exports = {
  db,
  Page,
  User
}
