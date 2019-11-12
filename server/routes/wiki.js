const express = require('express')
const router = express.Router()
const { User, Page } = require('../../models')

const { addPage, wikiPage, main, notFound } = require('../../views')

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll()
    // console.log('PAGES:', pages)
    res.send(main(pages))
  } catch (error) {
    next(error)
  }
})

router.get('/add', (req, res) => {
  res.send(addPage())
})


router.post('/', async (req, res, next) => {

  try {
    const [author, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })

    const page = await Page.create({
      title: req.body.title,
      content: req.body.content
    })

    page.setAuthor(author)

    await page.save()
    res.redirect(`/wiki/${page.dataValues.slug}`)
  } catch (error) {
    next(error)
  }
})

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } })
    if (page) {
      const author = await page.getAuthor()
      res.send(wikiPage(page, author))
    } else {
      res.send(notFound())
    }

  } catch (error) {
    next(error)
  }
})

module.exports = {
  router
}
