const express = require('express')
const router = express.Router()
const { User, Page } = require('../../models')

const { addPage, wikiPage, main } = require('../../views')

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


router.post('/', async (req, res) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  })

  try {
    await page.save()
    res.redirect(`/wiki/${page.dataValues.slug}`)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({ where: { slug: req.params.slug } })
    res.send(wikiPage(page))
  } catch (error) {
    next(error)
  }
})

module.exports = {
  router
}
