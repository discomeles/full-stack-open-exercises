const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const tokenExtractor = (request, response, next) => {
  const authorization = request.headers.authorization
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token =  authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }

  next()
}

const userExtractor = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, config.jwtsecret)
  if (decodedToken.id) {
    request.user = decodedToken.id
  } else {
    return response.status(401).json({ error: 'token invalid' })
  }

  next()
}

// --- Virheenkäsittelijä ---
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(400).json({error: 'token missing or invalid'})
    }
  
    next(error)
  }
  
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms')

module.exports = {
  tokenExtractor,
  userExtractor,
  errorHandler,
  unknownEndpoint,
  requestLogger
}