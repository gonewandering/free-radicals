import path from 'path'

module.exports = {
  root: path.normalize(__dirname + '/..'),
  app: {
    name: 'free-radicals'
  },
  port: process.env.PORT || 3000,
  db: process.env.NODE_APPLICATION_DB
}
