const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const { 
  tokenExtractor,
  unknownEndpoint, 
  errorHandler, 
  requestLogger 
} = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')

// --- Yhdistetään Mongo Atlakseen ---
logger.info('connecting to', config.mongo_base_url)

mongoose.connect(config.mongo_url)
  .then( () => {
    logger.info('Connected to Mongo Atlas')
  })
  .catch((error) => {
    logger.error('Failed to connect to Mongo Atlas. Reason:',error.message)
  })

app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use(tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app