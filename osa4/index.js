const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

// --- Virheenkäsittelijä ---
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

// --- MongoDB ---
// --- Määritellään blogin skeema ---

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const Blog = mongoose.model('Blog', blogSchema)

// --- MongoDB yhteysasetukset ---
const mongo_url = process.env.MONGODB_URL
const mongo_user = process.env.MONGODB_USER
const mongo_password = process.env.MONGODB_PASSWORD

const url = `mongodb+srv://${mongo_user}:${mongo_password}@${mongo_url}/bloglistdb?retryWrites=true&w=majority`

console.log('connecting to', mongo_url)

// --- Yhdistetään Mongo Atlakseen ---
mongoose.connect(url)
  .then(result => {
    console.log('Connected to Mongo Atlas')
  })
  .catch((error) => {
    console.log('Failed to connect to Mongo Atlas. Reason:',error.message)
  })

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// morgan.token('body', (request) => {
//   return JSON.stringify(request.body, ['name','number'])
// })

// --- Blogi API ---
// --- Hae kaikki ---
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// --- Lisää blogi ---
app.post('/api/blogs', (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: 0
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.port || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})