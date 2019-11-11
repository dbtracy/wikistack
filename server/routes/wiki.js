const express = require('express')
const router = express.Router()
const { User, Page } = require('../../models')
const addPage = require('../../views/addPage')

router.get('/', async (req, res) => {
  res.redirect('/')
})

router.get('/add', (req, res) => {

  // function generateSlug(title) {
  //   return title.replace(/\s+/g, '_').replace(/\W/g, '')
  // }

  // const slug = generateSlug(title)

  // const page = new Page({
  //   title: req.body.title,
  //   content: req.body.content,
  //   // slug: slug
  // })

  // try {
  //   await page.save()
  //   res.redirect('/')
  // } catch (error) {
  //   console.log(error)
  // }
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
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }
})

router.get('/add', (req, res) => {
  addPage()
})

module.exports = {
  router
}
