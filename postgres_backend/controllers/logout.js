const router = require('express').Router()
const { Session } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.delete('/', tokenExtractor, async (req, res) => {
  console.log('TOKEN', req.decodedToken.id)
  await Session.destroy({ where: { user_id: req.decodedToken.id } })
  res.status(200).end()
})

module.exports = router
