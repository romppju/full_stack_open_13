const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasMany(Session)
Session.belongsTo(User)

Blog.belongsToMany(User, { through: ReadingList, as: 'lists' })
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })

//User.sync({ alter: true })
//Blog.sync({ alter: true })

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
}
