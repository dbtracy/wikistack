const express = require('express')
const router = express.Router()
const { User, Page } = require('../../models')
const addPage = require('../../views/addPage')
const wikiPage = require('../../views/wikipage')

router.get('/', async (req, res) => {
  res.redirect('/')
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
    console.log(page)
    res.redirect(`/wiki/${page.dataValues.slug}`)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:slug', async (req, res, next) => {
  const page = await Page.findOne({ where: { slug: req.params.slug } })
  console.log('PAGE:', page)
  res.json(page)
})

module.exports = {
  router
}
