const router = require('express').Router()

const { Op } = require('sequelize')

const { Blog, User } = require('../models')
const { tokenExtractor, checkUser } = require('../util/middleware')

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        { author: { [Op.iLike]: `%${req.query.search}%` } },
        { title: { [Op.iLike]: `%${req.query.search}%` } },
      ],
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['id', 'username', 'name'],
    },
    where,
    order: [['likes', 'DESC']],
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  if (req.body.likes) {
    try {
      req.blog.likes = req.body.likes
      await req.blog.save()
      res.json(req.blog)
    } catch (error) {
      next(error)
    }
  } else {
    res.status(404).json({ error: 'missing likes' })
  }
})

router.delete(
  '/:id',
  blogFinder,
  tokenExtractor,
  checkUser,
  async (req, res) => {
    if (req.blog && req.decodedToken.id === req.blog.userId) {
      await req.blog.destroy()
      res.status(200).end()
    } else {
      res.status(204).end()
    }
  }
)

module.exports = router
