const router = require('express').Router()
const { ReadingList } = require('../models')

const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res, next) => {
  try {
    const newReading = await ReadingList.create({
      user_id: req.body.user_id,
      blog_id: req.body.blog_id,
    })
    return res.json(newReading)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const reading = await ReadingList.findOne({
    where: { user_id: req.decodedToken.id, blog_id: req.params.id },
  })
  console.log(reading)
  if (reading) {
    reading.read = req.body.read
    await reading.save()
    res.json(reading)
  } else {
    res.status(404).json({ error: 'Reading not found or update not allowed' })
  }
})

module.exports = router
