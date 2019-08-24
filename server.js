require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const mongoose = require('mongoose')
const { wrap } = require('./src/util/wrap')
const { errorHandler } = require('./src/util/errorHandler')
const { verifyToken } = require('./src/util/token')
const app = express()
const DBOPTIONS = { keepAlive: 1, connectTimeoutMS: 30000, useNewUrlParser: true }
const PORT = process.env.PORT || 3000
const db = "mongodburl"
const cors = require('cors')
const api = require('./src/routes/api')
const protected_test = require('./src/routes/protected')
const accountSid = 'AC93057b79ef55c544691da5ba303bce0f';
const authToken = '2ba870b6a5aaa9832c13af258f546bda';
const client = require('twilio')(accountSid, authToken);
const sms = require('./src/routes/sms')

async function run () {
  // Middlewares
  app.use(bodyParser.text())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(compression())
  app.use(cors())
  // Allowed Headers
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization')
    next()
  })
  // routes
  app.use('/api',api)
  app.use('/protected', verifyToken, protected_test)
  app.use('/sms', sms)
  app.use(errorHandler)
  // Mongoose bootstrapping
  mongoose.Promise = global.Promise
  //mongoose.connect(db, DBOPTIONS)
  //const database = mongoose.connection
  //database.on('error', wrap(console.error.bind(console, 'DB connection error: ')))
  //database.once('open', () => {
  //    console.log('Connection with mongoose created')
  //})

  app.listen(PORT)
  console.log(`Listening on port: ${PORT}`)
  
}
run().catch(error => console.error(error.stack))

module.exports = app
