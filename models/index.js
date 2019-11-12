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
    allowNull: false,
    unique: true
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
})

Page.beforeValidate(page => {
  console.log('PAGE:', page)
  if (!page.slug) {
    page.slug = page.title
      .replace(/\s/g, '_')
      .replace(/\W/g, '')
      .toLowerCase()
  }
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

Page.belongsTo(User, { as: 'author' })
User.hasMany(Page, { foreignKey: 'authorId' })

module.exports = {
  db,
  Page,
  User
}
