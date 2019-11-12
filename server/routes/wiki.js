const express = require('express')
const router = express.Router()
const { User, Page } = require('../../models')

const { addPage, wikiPage, main, notFound, editPage } = require('../../views')

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll()
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

    const page = await Page.create(req.body)

    await page.setAuthor(author)

    // await page.save()
    res.redirect(`/wiki/${page.slug}`)
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
      res.status(404).send(notFound())
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:slug/edit', async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } })
    if (page) {
      const author = await page.getAuthor()
      res.send(editPage(page, author))
    } else {
      res.status(404).send(notFound())
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:slug', async (req, res, next) => {
  try {
    const [i, updatedPages] = await Page.update(req.body, {
      where: {
        slug: req.params.slug
      },
      returning: true
    })
    if (updatedPages) {
      console.log('UPDATED PAGES:', updatedPages)
      res.redirect(`/wiki/${updatedPages[0].slug}`)
    } else {
      console.log('uh oh')
    }

  } catch (error) {
    next(error)
  }
})

router.get('/:slug/delete', async (req, res, next) => {
  try {
    const oldPage = await Page.destroy({ where: { slug: req.params.slug } })
    res.redirect(`/wiki`)
  } catch (error) {
    next(error)
  }
})

module.exports = {
  router
}
